// Simple AES-GCM encryption using Web Crypto API
// Note: For a real "user-controlled key", we'd need to derive a key from a password or generate one and show it to the user.
// For this MVP, we'll generate a random key and store it in localStorage (which is "local-first" but not fully "user-controlled" if they clear it).
// Ideally, we'd ask the user for a password to encrypt the key, or just use a generated key.
// Let's implement a simple key generation and storage for now.

const ALGORITHM = 'AES-GCM';
const KEY_STORAGE_KEY = 'clinical-app-key';

async function getOrCreateKey(): Promise<CryptoKey> {
    const storedKey = localStorage.getItem(KEY_STORAGE_KEY);
    if (storedKey) {
        const rawKey = Uint8Array.from(atob(storedKey), (c) => c.charCodeAt(0));
        return window.crypto.subtle.importKey(
            'raw',
            rawKey,
            ALGORITHM,
            true,
            ['encrypt', 'decrypt']
        );
    }

    const key = await window.crypto.subtle.generateKey(
        { name: ALGORITHM, length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const exported = await window.crypto.subtle.exportKey('raw', key);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(exported as ArrayBuffer)));
    localStorage.setItem(KEY_STORAGE_KEY, b64);

    return key;
}

export async function encryptData(data: string): Promise<string> {
    const key = await getOrCreateKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(data);

    const encrypted = await window.crypto.subtle.encrypt(
        { name: ALGORITHM, iv },
        key,
        encoded
    );

    // Combine IV and data
    const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
}

export async function decryptData(data: string): Promise<string | null> {
    try {
        const key = await getOrCreateKey();
        const combined = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
        const iv = combined.slice(0, 12);
        const encrypted = combined.slice(12);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: ALGORITHM, iv },
            key,
            encrypted
        );

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error('Decryption failed:', e);
        return null;
    }
}

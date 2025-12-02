# Depth Lens

> A psychodynamic, PDM-2–inspired self-assessment tool.

![Depth Lens Banner](https://placehold.co/1200x400/F5F5F0/2C2C2C?text=Depth+Lens&font=playfair-display)

**Depth Lens** is a reflective wellness application designed to help you explore your internal world. Unlike standard diagnostic tools that focus solely on symptoms, Depth Lens invites you to consider your personality patterns, mental functioning capacities, and emotional experiences through a holistic, psychodynamic framework.

---

## 🌿 Philosophy

This project is built on the belief that mental health is more than the absence of illness—it is the presence of complex, adaptive capacities.

Inspired by the **Psychodynamic Diagnostic Manual (PDM-2)**, Depth Lens assesses three key dimensions of the self:

1.  **Axis P (Personality)**: Your enduring patterns of thinking, feeling, and relating to others.
2.  **Axis M (Mental Functioning)**: Your fundamental psychological capacities, such as emotional regulation, empathy, and self-reflection.
3.  **Axis S (Symptom Distress)**: The subjective experience of emotional pain or difficulty.

> **Disclaimer**: This is a wellness tool for self-reflection, not a diagnostic instrument. It does not replace professional therapy or medical care.

---

## ✨ Features

-   **33-Item Reflection**: A carefully curated set of questions designed to probe deeper than surface-level symptoms.
-   **Holistic Scoring**: View your results across three distinct axes, with detailed interpretations of your strengths and vulnerabilities.
-   **Privacy First**: Your data belongs to you. All results are encrypted using AES-256 and stored locally in your browser. No data is ever sent to a cloud server.
-   **Crisis Safety**: Built-in safeguards immediately direct users to support resources if high levels of distress or risk are detected.
-   **Calm Aesthetic**: A "Clinical / Old Money" design language (Warm Sand, Sage Green, Lavender) creates a soothing, distraction-free environment for reflection.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ThryLox/depth-lens.git
    cd depth-lens
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Technology Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: TailwindCSS, ShadCN UI
-   **State Management**: Zustand (with encrypted persistence)
-   **Security**: Web Crypto API (AES-GCM)
-   **Animations**: Framer Motion

---

## 🔒 Privacy & Security

We take your privacy seriously.

-   **Local-First**: Data is stored in `localStorage`.
-   **Encryption**: All sensitive data is encrypted with a client-side key before storage.
-   **No Tracking**: We do not use analytics or tracking cookies.

---

## 🤝 Contributing

We welcome contributions that align with our mission of providing safe, deep, and accessible tools for self-reflection. Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><em>"The unexamined life is not worth living." — Socrates</em></p>
</div>

import { Axis, Question } from '@/types';

export function parseQuestions(markdown: string): Question[] {
    const questions: Question[] = [];
    const lines = markdown.split('\n');
    let currentAxis: Axis | null = null;

    for (const line of lines) {
        const trimmed = line.trim();

        // Check for Axis header
        // Format: "## Axis P: Personality & Relational Patterns"
        const axisMatch = trimmed.match(/^## Axis ([PMS]):/);
        if (axisMatch) {
            currentAxis = axisMatch[1] as Axis;
            continue;
        }

        // Check for Question
        // Format: "1. Question text"
        const questionMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (questionMatch && currentAxis) {
            const id = `${currentAxis}${questionMatch[1]}`; // e.g., P1, M2
            questions.push({
                id,
                text: questionMatch[2],
                axis: currentAxis,
            });
        }
    }

    return questions;
}

// Helper to fetch and parse (client-side or server-side)
export async function loadQuestions(): Promise<Question[]> {
    // In a real app, we might import the file content via fs (server) or fetch (client)
    // Since we are using Next.js App Router, we can read this on the server.
    // But for client components, we might need an API route or pass it as props.
    // For now, let's assume we pass the markdown content to this function or fetch it.

    // If we want to import it as a string (requires loader config) or just fetch it from public.
    // Let's assume we fetch it from a public URL or API route.
    // But wait, I put it in `content/questions.md` (root).
    // I can read it on the server in a Server Component and pass it down.

    return []; // Placeholder, actual loading depends on usage context
}

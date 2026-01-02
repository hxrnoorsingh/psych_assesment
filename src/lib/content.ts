import { Axis, Question } from '@/types';

export function parseQuestions(markdown: string): Question[] {
    const questions: Question[] = [];
    const lines = markdown.split('\n');
    let currentAxis: Axis | null = null;

    for (const line of lines) {
        const trimmed = line.trim();

        // Check for Axis header
        // Format: "## Axis MA: Mental Functioning" or "## Axis PA: Personality Patterns"
        const axisMatch = trimmed.match(/^## Axis (PA|MA|SA):/);
        if (axisMatch) {
            currentAxis = axisMatch[1] as Axis;
            continue;
        }

        // Check for Question
        // Format: "1. Question text"
        const questionMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (questionMatch && currentAxis) {
            const id = `${currentAxis}${questionMatch[1]}`; // e.g., PA1, MA2
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
    return []; // Placeholder, actual loading depends on usage context
}

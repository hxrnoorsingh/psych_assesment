import { Question, Axis } from '@/types';
import fs from 'fs';
import path from 'path';

export async function getQuestions(): Promise<Question[]> {
    const filePath = path.join(process.cwd(), 'content', 'questions.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return parseQuestions(fileContent);
}

export function parseQuestions(markdown: string): Question[] {
    const lines = markdown.split('\n');
    const questions: Question[] = [];
    let currentAxis: Axis | null = null;

    lines.forEach((line) => {
        line = line.trim();
        if (line.startsWith('## Axis PA')) currentAxis = 'PA';
        else if (line.startsWith('## Axis MA')) currentAxis = 'MA';
        else if (line.startsWith('## Axis SA')) currentAxis = 'SA';
        else if (line.match(/^\d+\./) && currentAxis) {
            const text = line.replace(/^\d+\.\s*/, '');
            const id = `${currentAxis}${questions.filter((q) => q.axis === currentAxis).length + 1}`;
            questions.push({
                id,
                text,
                axis: currentAxis,
                direction: 'positive', // Can be enhanced if needed
            });
        }
    });

    return questions;
}

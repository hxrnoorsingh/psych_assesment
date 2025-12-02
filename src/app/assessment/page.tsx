import fs from 'fs';
import path from 'path';
import { parseQuestions } from '@/lib/content';
import { Questionnaire } from '@/components/assessment/Questionnaire';

async function getQuestions() {
    // Read from content/questions.md
    // Since we are in src/app/assessment, we need to go up to root
    const filePath = path.join(process.cwd(), 'content', 'questions.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return parseQuestions(fileContent);
}

export default async function AssessmentPage() {
    const questions = await getQuestions();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
            <div className="w-full max-w-2xl mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Self-Assessment</h1>
                <p className="text-muted-foreground">
                    Please answer the following questions honestly. There are no right or wrong answers.
                </p>
            </div>
            <Questionnaire questions={questions} />
        </div>
    );
}

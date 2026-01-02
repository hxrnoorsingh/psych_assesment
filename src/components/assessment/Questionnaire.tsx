'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types';
import { useAssessmentStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface QuestionnaireProps {
    questions: Question[];
}

export function Questionnaire({ questions }: QuestionnaireProps) {
    const router = useRouter();
    const {
        currentQuestionIndex,
        answers,
        setAnswer,
        nextQuestion,
        prevQuestion,
        calculateResult,
        isCompleted,
        reset,
    } = useAssessmentStore();

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Removed auto-redirect on completion to allow "Retake" from this page
    // useEffect(() => {
    //   if (isCompleted) {
    //     router.push('/results');
    //   }
    // }, [isCompleted, router]);

    if (!isHydrated) return null; // Prevent hydration mismatch

    // If completed, show a "Completed" state instead of redirecting
    if (isCompleted) {
        return (
            <div className="w-full max-w-md mx-auto">
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle>Assessment Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            You have already completed the assessment. You can view your results or start over.
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full" onClick={() => router.push('/results')}>
                            View Results
                        </Button>
                        <Button variant="outline" className="w-full gap-2" onClick={() => reset()}>
                            <RefreshCw className="h-4 w-4" />
                            Retake Assessment
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const currentAnswer = answers[currentQuestion?.id];

    const handleAnswer = (value: number) => {
        if (!currentQuestion) return;
        setAnswer(currentQuestion.id, value);

        // Immediate Crisis Trigger for Question SA6 (overwhelmed)
        if (currentQuestion.id === 'SA6' && value >= 4) {
            calculateResult(questions);
            router.push('/results'); // Explicitly push to results for crisis
            return;
        }

        // Auto-advance after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                calculateResult(questions);
                router.push('/results'); // Redirect on normal completion
            }
        }, 250);
    };

    if (!currentQuestion) {
        if (questions.length > 0 && currentQuestionIndex >= questions.length) {
            return (
                <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    <p className="text-muted-foreground">State mismatch detected (Index: {currentQuestionIndex}).</p>
                    <Button onClick={() => reset()}>Reset Assessment</Button>
                </div>
            );
        }
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-none shadow-lg bg-card/50 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl font-medium leading-relaxed text-center">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Button
                                        key={value}
                                        variant={currentAnswer === value ? "default" : "outline"}
                                        className={`h-14 text-lg transition-all ${currentAnswer === value
                                            ? 'ring-2 ring-primary ring-offset-2'
                                            : 'hover:border-primary/50'
                                            }`}
                                        onClick={() => handleAnswer(value)}
                                    >
                                        {value}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground px-1">
                                <span>Strongly Disagree</span>
                                <span>Strongly Agree</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-6">
                            <Button
                                variant="ghost"
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    if (currentQuestionIndex < questions.length - 1) {
                                        nextQuestion();
                                    } else {
                                        calculateResult(questions);
                                        router.push('/results');
                                    }
                                }}
                                disabled={!currentAnswer}
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

'use client';

import { AlertTriangle, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssessmentStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export function CrisisScreen() {
    const router = useRouter();
    const { reset } = useAssessmentStore();

    const handleRetake = () => {
        reset();
        router.push('/assessment');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <Card className="w-full max-w-md border-red-200 bg-red-50 dark:bg-red-950/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-red-100 dark:bg-red-900/50 p-3 rounded-full w-fit mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="text-2xl text-red-700 dark:text-red-400">
                        Support is Available
                    </CardTitle>
                    <CardDescription className="text-red-600/80 dark:text-red-400/80">
                        Your responses suggest you are experiencing significant distress. Please consider seeking professional support.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-medium">Emergency Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>National Suicide Prevention Lifeline: <strong>988</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></span>
                            </li>
                        </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        This tool is not a substitute for professional help. If you are in immediate danger, please call 911 or go to the nearest emergency room.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button variant="destructive" className="w-full" asChild>
                        <a href="tel:988">Call 988 Now</a>
                    </Button>
                    <Button variant="ghost" onClick={handleRetake} className="w-full gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Retake Assessment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/lib/store';
import { CrisisScreen } from './CrisisScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Axis } from '@/types';

export function Dashboard() {
    const router = useRouter();
    const { result, isCompleted, reset } = useAssessmentStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated && !isCompleted) {
            router.push('/assessment');
        }
    }, [isHydrated, isCompleted, router]);

    if (!isHydrated || !result) return null;

    if (result.isCrisis) {
        return <CrisisScreen />;
    }

    const { axisScores, globalSeverityIndex } = result;

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Low': return 'bg-green-500';
            case 'Moderate': return 'bg-yellow-500';
            case 'High': return 'bg-orange-500';
            case 'Critical': return 'bg-red-500';
            default: return 'bg-primary';
        }
    };

    const SCORING_LEGEND = [
        { label: 'Low', range: '0-25%', color: 'bg-green-500', description: 'Minimal impact on functioning' },
        { label: 'Moderate', range: '26-50%', color: 'bg-yellow-500', description: 'Some difficulties present' },
        { label: 'High', range: '51-75%', color: 'bg-orange-500', description: 'Significant impact on learning' },
        { label: 'Critical', range: '76-100%', color: 'bg-red-500', description: 'Severe impairment detected' },
    ];

    const AXIS_LABELS: Record<Axis, { name: string; description: string }> = {
        MA: {
            name: 'Mental Functioning (MA)',
            description: 'Attention, impulse control, and self-reflection capacities'
        },
        PA: {
            name: 'Personality Patterns (PA)',
            description: 'Maladaptive patterns related to internet use'
        },
        SA: {
            name: 'Symptomatic Distress (SA)',
            description: 'Anxiety, depression, and emotional dysregulation'
        },
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Assessment Results</h1>
                <p className="text-muted-foreground">
                    Internet-Induced Learning Difficulties Assessment (PDM-2 Framework)
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Global Severity Index</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="text-5xl font-bold mb-2">{globalSeverityIndex}%</div>
                        <p className="text-sm text-muted-foreground text-center">
                            Overall impact on learning (0-100% scale)
                        </p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Understanding Your Scores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SCORING_LEGEND.map((item) => (
                                <div key={item.label} className="flex items-start gap-2">
                                    <div className={`w-3 h-3 rounded-full ${item.color} mt-1 flex-shrink-0`} />
                                    <div className="text-sm">
                                        <span className="font-medium">{item.label}:</span> {item.range}
                                        <p className="text-muted-foreground text-xs">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {(['MA', 'PA', 'SA'] as Axis[]).map((axis) => {
                    const score = axisScores[axis];
                    const percentage = (score.raw / score.max) * 100;
                    const axisInfo = AXIS_LABELS[axis];

                    return (
                        <Card key={axis} className="flex flex-col">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{axisInfo.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground mt-1">{axisInfo.description}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getSeverityColor(score.severity)}`}>
                                        {score.severity}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <Progress value={percentage} className="h-2" />
                                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                                    <span>Score: {score.raw} / {score.max}</span>
                                    <span>{percentage.toFixed(1)}%</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8">
                <Button onClick={() => {
                    reset();
                    router.push('/assessment');
                }} variant="outline">
                    Retake Assessment
                </Button>
            </div>
        </div>
    );
}

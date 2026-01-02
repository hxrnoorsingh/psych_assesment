"use client";

import { useAssessmentStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Brain,
    Activity,
    HeartCrack,
    Info,
    ChevronRight,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function Dashboard() {
    const result = useAssessmentStore((state) => state.result);
    const reset = useAssessmentStore((state) => state.reset);

    if (!result) return null;

    const { axisScores, globalSeverityIndex } = result;

    // Determine severity label based on global index percentage
    const getSeverityLabel = (score: number) => {
        if (score < 20) return "Healthy Functioning";
        if (score < 40) return "Mild Difficulty";
        if (score < 60) return "Moderate Difficulty";
        if (score < 80) return "Significant Difficulty";
        return "Severe Difficulty";
    };

    const severityLabel = getSeverityLabel(globalSeverityIndex);

    // Color logic using "Clinical / Old Money" theme
    // Low Difficulty (Good) -> Primary (Sage Green)
    // Moderate Difficulty -> Accent (Lavender/Taupe)
    // High Difficulty -> Destructive (Soft Red)
    const getScoreColor = (score: number) => {
        if (score < 30) return "bg-primary";
        if (score < 60) return "bg-amber-400"; // Keep amber for warning, or use accent if strict
        return "bg-destructive";
    };

    const getAxisIcon = (axis: string) => {
        switch (axis) {
            case "MA":
                return <Brain className="h-5 w-5 text-primary" />;
            case "PA":
                return <Activity className="h-5 w-5 text-primary" />;
            case "SA":
                return <HeartCrack className="h-5 w-5 text-destructive" />;
            default:
                return <Info className="h-5 w-5" />;
        }
    };

    const axesData = [
        {
            key: "MA",
            title: "Mental Functioning",
            description:
                "Capacities for attention, impulse control, and self-reflection.",
            score: axisScores.MA.percentage,
        },
        {
            key: "PA",
            title: "Personality Patterns",
            description:
                "Enduring patterns of thinking and relating, often affected by internet overuse.",
            score: axisScores.PA.percentage,
        },
        {
            key: "SA",
            title: "Symptomatic Distress",
            description:
                "Subjective experiences of anxiety, depression, and emotional dysregulation.",
            score: axisScores.SA.percentage,
        },
    ];

    return (
        <div className="space-y-8 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Assessment Results</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Here is an analysis of your current psychological functioning based on the
                    PDM-2 framework. These scores reflect the impact of internet usage on learning and well-being.
                </p>
            </div>

            {/* Global Score Card */}
            <Card className="p-8 relative overflow-hidden border-border/50 bg-secondary/20 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-destructive opacity-50" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-lg font-medium text-muted-foreground">
                            Global Impact Index
                        </h3>
                        <div className="text-5xl font-extrabold tracking-tighter">
                            {globalSeverityIndex}%
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-background border text-sm font-medium">
                            {severityLabel}
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Resilient</span>
                            <span>Impacted</span>
                        </div>
                        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${globalSeverityIndex}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-xs text-right text-muted-foreground pt-1">
                            Higher percentage indicates greater difficulty.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Axis Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {axesData.map((axis) => (
                    <Card
                        key={axis.key}
                        className="p-6 flex flex-col gap-4 border-border/40 hover:border-border/80 transition-all hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-2 rounded-lg bg-background border">
                                {getAxisIcon(axis.key)}
                            </div>
                            <span className="text-2xl font-bold">{axis.score}%</span>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold">{axis.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed h-10">
                                {axis.description}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 space-y-2">
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getScoreColor(axis.score)}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${axis.score}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Interpretation & Resources */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6 border-border/40">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Info className="h-4 w-4" /> Understanding Your Scores
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What do these scores mean?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                                Scores represent the 'level of difficulty' or distress in each area.
                                <br />
                                <br />
                                <strong>0-30%:</strong> Healthy / Adaptive Functioning.
                                <br />
                                <strong>31-60%:</strong> Mild to Moderate challenges.
                                <br />
                                <strong>60%+:</strong> Significant impact requiring attention.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How is this calculated?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                                Based on your responses to the 20-item PDM-2 questionnaire. Mental functioning capacities (MA) are inverted, so a high difficulty score means lower capacity.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                <Card className="p-6 border-border/40 flex flex-col justify-center gap-4 bg-primary/5">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Next Steps</h3>
                        <p className="text-sm text-muted-foreground">
                            Consider discussing these results with a school counselor or mental
                            health professional to develop strategies for balanced internet use.
                        </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1" onClick={reset}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Retake
                        </Button>
                        <Button className="flex-1" asChild>
                            <Link href="/resources">
                                View Resources <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

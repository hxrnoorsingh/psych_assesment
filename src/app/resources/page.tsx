import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, BookOpen, Heart, Brain, Activity } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4">
            <div className="space-y-4 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight">Resources & Understanding</h1>
                <p className="text-muted-foreground text-lg">
                    Deepen your understanding of the assessment method and find professional support.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500" />
                            Crisis Support
                        </CardTitle>
                        <CardDescription>Immediate help for urgent situations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">National Suicide Prevention Lifeline</h3>
                            <p className="text-sm text-muted-foreground">Available 24/7 for free and confidential support.</p>
                            <a href="tel:988" className="inline-flex items-center text-primary hover:underline font-medium">
                                Call or Text 988 <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Crisis Text Line</h3>
                            <p className="text-sm text-muted-foreground">Text HOME to 741741 to connect with a Crisis Counselor.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            About the Method
                        </CardTitle>
                        <CardDescription>Why this approach is helpful.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        <p>
                            This assessment is inspired by the <strong>Psychodynamic Diagnostic Manual (PDM-2)</strong>. Unlike standard diagnostic tools that just list symptoms, this framework looks at the <em>whole person</em>.
                        </p>
                        <p>
                            It helps you understand not just "what" you are suffering from (symptoms), but "who" you are (personality) and "how" your mind works (mental functioning). This holistic view promotes deeper self-reflection and more targeted growth.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Understanding the Three Axes</h2>
                <p className="text-muted-foreground">
                    The PDM-2 framework assesses mental health through three distinct lenses, or "axes."
                </p>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="axis-p">
                        <AccordionTrigger className="text-lg font-medium">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                                    <Brain className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                Axis P: Personality & Relational Patterns
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground space-y-2 px-4">
                            <p>
                                <strong>What it is:</strong> This axis looks at your enduring personality traits—the characteristic ways you think, feel, behave, and relate to others.
                            </p>
                            <p>
                                <strong>Why it matters:</strong> Understanding your personality style helps explain why you might find yourself in the same types of conflicts or situations repeatedly. It moves beyond "symptoms" to look at the underlying structure of your self.
                            </p>
                            <p>
                                <strong>What the score means:</strong> A higher severity score here suggests that your personality patterns might be rigid or causing you significant difficulty in maintaining stable relationships or a consistent sense of self.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="axis-m">
                        <AccordionTrigger className="text-lg font-medium">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                Axis M: Mental Functioning
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground space-y-2 px-4">
                            <p>
                                <strong>What it is:</strong> This axis assesses the "capacities" of your mind. It looks at basic psychological tools like your ability to regulate emotions, reflect on your own state, empathize with others, and cope with stress.
                            </p>
                            <p>
                                <strong>Why it matters:</strong> Even if you don't have a specific "disorder," you might struggle if these underlying capacities are weak. Strengthening them is often the goal of psychodynamic therapy.
                            </p>
                            <p>
                                <strong>What the score means:</strong> Unlike the other axes, the questions here ask about <em>strengths</em>. However, the final score is converted to a <strong>severity</strong> scale. So, a "High Severity" score means you reported <em>low</em> capacities (e.g., difficulty calming yourself down), while a "Low Severity" score means you have strong mental resilience.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="axis-s">
                        <AccordionTrigger className="text-lg font-medium">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                                    <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                Axis S: Symptom Distress
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground space-y-2 px-4">
                            <p>
                                <strong>What it is:</strong> This axis is what most people think of as "mental health"—the subjective experience of symptoms. It covers depression, anxiety, sleep issues, and other forms of distress.
                            </p>
                            <p>
                                <strong>Why it matters:</strong> Symptoms are often the "alarm bell" that something is wrong. While they don't tell the whole story, reducing symptom distress is a key priority for immediate relief.
                            </p>
                            <p>
                                <strong>What the score means:</strong> A high score here indicates you are currently experiencing a significant amount of pain, worry, or sadness. This is often the most fluctuating score and can change day-to-day.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

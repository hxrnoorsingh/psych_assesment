export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">About This Tool</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    This Clinical Assessment Tool is designed to help young adults reflect on their emotional well-being through a psychodynamic lens. Unlike standard checklists that only look at symptoms, this tool explores personality patterns, mental capacities, and subjective experiences.
                </p>
            </div>

            <div className="space-y-6">
                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">Our Philosophy</h2>
                    <p className="leading-relaxed text-muted-foreground">
                        We believe that understanding yourself goes beyond just labeling symptoms. It involves looking at how you relate to others, how you understand your own mind, and how you cope with stress. This tool is inspired by the Psychodynamic Diagnostic Manual (PDM-2), which emphasizes a holistic view of the person.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">Privacy First</h2>
                    <p className="leading-relaxed text-muted-foreground">
                        Your mental health data is extremely sensitive. That&apos;s why we built this tool with a &quot;local-first&quot; architecture. Your responses are encrypted and stored directly on your device. We do not have access to your personal data unless you explicitly choose to share it (feature coming soon).
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-2xl font-semibold">Disclaimer</h2>
                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                        <p>
                            This tool is for self-reflection and educational purposes only. It is <strong>not</strong> a diagnostic tool and does not replace professional medical advice, diagnosis, or treatment. If you are experiencing a mental health emergency, please contact emergency services immediately.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

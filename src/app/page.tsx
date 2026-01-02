"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, BookOpen, Brain, Wifi } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl">
        <div className="flex items-center gap-3">
          <Brain className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Learning Assessment Tool
          </h1>
        </div>

        <p className="text-lg text-center sm:text-left max-w-2xl text-muted-foreground">
          A PDM-2 framework-based assessment tool designed to evaluate internet-induced learning difficulties in adolescents aged 12-18.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 w-full">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Mental Functioning (MA)</h3>
              <p className="text-xs text-muted-foreground">Attention, impulse control, and self-reflection</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <Wifi className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Personality Patterns (PA)</h3>
              <p className="text-xs text-muted-foreground">Internet-related behavioral patterns</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Symptomatic Distress (SA)</h3>
              <p className="text-xs text-muted-foreground">Anxiety, depression, and academic stress</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full h-10 sm:h-12 px-4 sm:px-5 text-sm sm:text-base">
                Start Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                  <AlertTriangle className="h-5 w-5" />
                  Important Information
                </DialogTitle>
                <DialogDescription className="pt-2 text-foreground space-y-3 text-left">
                  <p>
                    This is a research-based assessment tool designed for <strong>adolescents aged 12-18</strong> to evaluate internet-induced learning difficulties using the PDM-2 framework.
                  </p>
                  <p>
                    This is <strong>not a diagnostic test</strong>. It is intended for educational research purposes and does not replace professional evaluation or therapy.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By proceeding, you consent to the use of your responses for research purposes. All data is encrypted and stored locally.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/assessment">
                    I Understand & Agree
                  </Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link
            href="/about"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
}

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
import { AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Depth Lens
        </h1>
        <p className="text-lg text-center sm:text-left max-w-2xl">
          A psychodynamic, PDM-2–inspired self-assessment tool to help you reflect on relational patterns, mental functioning, and emotional distress.
        </p>
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
                  Important Disclaimer
                </DialogTitle>
                <DialogDescription className="pt-2 text-foreground space-y-3 text-left">
                  <p>
                    This is a reflective wellness tool, <strong>not a diagnostic test</strong>. It does not replace therapy, medical care, or crisis support.
                  </p>
                  <p>
                    Some questions may feel emotionally sensitive. If you feel unsafe or in crisis, please contact emergency services or a crisis hotline immediately.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By proceeding, you confirm you are 18+ and consent to the use of your responses as described in our Privacy Policy.
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

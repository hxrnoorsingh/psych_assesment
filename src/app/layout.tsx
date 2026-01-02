import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Internet-Induced Learning Difficulties Assessment",
  description: "A PDM-2 framework-based tool for assessing internet-induced learning difficulties in adolescents aged 12-18. Evaluates Mental Functioning (MA), Personality Patterns (PA), and Symptomatic Distress (SA).",
  keywords: ["PDM-2", "adolescents", "internet addiction", "learning difficulties", "cyberpsychology", "mental health assessment"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 container mx-auto py-6 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

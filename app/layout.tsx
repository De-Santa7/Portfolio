import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // 👉 REPLACE WITH YOUR NAME AND TITLE
  title: "Ugochukwuzitere Mbama | Full-Stack Developer & Prompt Engineer",
  description:
    "Portfolio of Ugochukwuzitere Mbama — a full-stack developer and prompt engineer building scalable web apps and AI-powered products with React, Next.js, Node.js, and TypeScript.",
  keywords: [
    "Ugochukwuzitere Mbama",
    "Full-Stack Developer",
    "Prompt Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Nigeria",
    "AI Integration",
  ],
  authors: [{ name: "Ugochukwuzitere Mbama" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ugochukwuzitere Mbama | Full-Stack Developer & Prompt Engineer",
    description:
      "Building scalable web apps and AI-powered products.",
    siteName: "Ugochukwuzitere Mbama Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugochukwuzitere Mbama | Developer Portfolio",
    description:
      "Full-Stack Developer & Prompt Engineer from Nigeria.",
  },
  robots: { index: true, follow: true },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dark class enforces dark mode — bg-zinc-950 is the base background
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-950 text-zinc-50 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

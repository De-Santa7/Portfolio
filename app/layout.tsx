import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Loader } from "@/components/Loader";
import { RevealObserver } from "@/components/RevealObserver";
import { Cursor } from "@/components/Cursor";
import { personal, site } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${personal.name}` },
  description: site.description,
  keywords: [
    personal.name,
    "Full-stack developer",
    "Prompt engineer",
    "Claude Code",
    "AI automation",
    "Next.js",
    "Django",
    "React Native",
    "Nigeria",
  ],
  authors: [{ name: personal.name, url: site.url }],
  creator: personal.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: personal.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

// Runs before first paint: pick the theme (?theme= link, saved choice, else
// dark) and skip the intro on repeat visits and for reduced motion.
const introScript = `try{var d=document.documentElement;var q=new URLSearchParams(location.search).get('theme');var t=q==='light'||q==='dark'?q:localStorage.getItem('theme');if(t==='light')d.dataset.theme='light';if(sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='skip'}sessionStorage.setItem('intro','1')}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: site.url,
  jobTitle: personal.role,
  address: { "@type": "PostalAddress", addressLocality: "Owerri", addressCountry: "NG" },
  sameAs: [personal.github, personal.linkedin],
  founder: { "@type": "Organization", name: "StudEx", url: "https://www.studex.com.ng" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="overflow-x-hidden bg-bg font-sans text-fg antialiased"
      >
        <Loader />
        {children}
        <RevealObserver />
        <Cursor />
      </body>
    </html>
  );
}

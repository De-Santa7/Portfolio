"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { personal, socials } from "@/data/portfolio";

// Icon map for social links
const iconMap = {
  github:   Github,
  linkedin: Linkedin,
  mail:     Mail,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section label */}
        <FadeUp>
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            05 — Contact
          </p>
        </FadeUp>

        {/* Centered content */}
        <div className="max-w-2xl mx-auto text-center">

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-50 leading-[1.05] mb-6">
              Let&apos;s Work{" "}
              <span className="text-gradient">Together.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              I&apos;m currently available for freelance projects and full-time opportunities.
              If you have something interesting to build, I&apos;d love to hear about it.
            </p>
          </FadeUp>

          {/* Email button */}
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button variant="solid" href={`mailto:${personal.email}`}>
                <Mail className="w-4 h-4" />
                Send me an email
                <ArrowRight className="w-4 h-4" />
              </Button>

              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm font-medium text-zinc-400 hover:text-zinc-50 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy email
                  </>
                )}
              </motion.button>
            </div>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.4}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-zinc-600 uppercase tracking-widest font-medium">
                Find me on
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
          </FadeUp>

          {/* Social links */}
          <FadeUp delay={0.5}>
            <div className="flex items-center justify-center gap-4">
              {socials.map(({ label, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="group w-12 h-12 rounded-xl flex items-center justify-center border border-white/8 bg-zinc-900 text-zinc-400 hover:text-accent hover:border-accent/30 hover:bg-accent/8 transition-all duration-200 shadow-card"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </FadeUp>

          {/* Footer note */}
          <FadeUp delay={0.6}>
            <p className="mt-16 text-sm text-zinc-600">
              © {new Date().getFullYear()} {personal.name} — Built with Next.js &amp; TypeScript
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

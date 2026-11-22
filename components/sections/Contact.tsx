"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { personal, socials } from "@/data/portfolio";

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
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="max-w-2xl mx-auto text-center">

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 leading-[1.05] mb-6">
              Get in touch
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              Open to freelance work and full-time roles. If you&apos;re building something
              and need a developer, reach out — I&apos;d love to hear about it.
            </p>
          </FadeUp>

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
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
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

          <FadeUp delay={0.4}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                Find me on
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </FadeUp>

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
                    className="group w-12 h-12 rounded-xl flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:text-accent hover:border-accent/30 hover:bg-orange-50 transition-all duration-200 shadow-card"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </FadeUp>

          <FadeUp delay={0.6}>
            <p className="mt-16 text-sm text-gray-400">
              © {new Date().getFullYear()} {personal.name} — Built with Next.js &amp; TypeScript
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

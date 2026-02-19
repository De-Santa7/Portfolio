"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { personal, stats } from "@/data/portfolio";

// ─── Animation Variants ───────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.25,
    },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function Hero() {
  const scrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Gradient orb — top right */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/15 blur-[120px] pointer-events-none"
      />

      {/* Gradient orb — bottom left */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 3 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-zinc-700/30 blur-[100px] pointer-events-none"
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Availability badge */}
          <motion.div variants={line}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {personal.availability}
            </span>
          </motion.div>

          {/* Name — line-by-line stagger */}
          <motion.div variants={line} className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-zinc-200">
              {personal.heroLine1}
            </h1>
          </motion.div>

          <motion.div variants={line} className="overflow-hidden -mt-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-gradient">
              {personal.heroLine2}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={line}
            className="text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed mt-2"
          >
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={line}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
          >
            <Button variant="solid" onClick={scrollToProjects}>
              View My Work
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              href={personal.cv}
              download="Ugochukwuzitere-Mbama-CV.pdf"
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/8 w-full max-w-2xl"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-zinc-50">{value}</span>
                <span className="text-xs text-zinc-500 font-medium text-center">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-600 uppercase tracking-widest font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}

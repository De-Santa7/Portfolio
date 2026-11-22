"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { personal, stats } from "@/data/portfolio";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  const scrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Single soft orange glow — top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5"
        >
          {/* Name */}
          <motion.div variants={item}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-gray-900">
              {personal.heroLine1}
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-gradient mt-1">
              {personal.heroLine2}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={item} className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed">
            {personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Button variant="solid" onClick={scrollToProjects}>
              See my work
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

          {/* Stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-12 mt-10 pt-10 border-t border-gray-200 w-full max-w-lg"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <span className="text-xs text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}

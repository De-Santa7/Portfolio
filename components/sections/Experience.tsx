"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { experiences, type ExperienceItem } from "@/data/portfolio";

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  const Icon = item.type === "work" ? Briefcase : GraduationCap;

  return (
    <motion.div
      variants={slideLeft}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12 }}
      className="relative pl-12 md:pl-16"
    >
      <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-white border border-orange-200 flex items-center justify-center shadow-card z-10">
        <Icon className="w-4 h-4 text-accent" />
      </div>

      <motion.div
        whileHover={{ x: 4 }}
        className="p-8 rounded-2xl bg-white border border-gray-200 shadow-card hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{item.role}</h3>
            <p className="text-sm font-semibold text-accent mt-1">{item.company}</p>
          </div>
          <span className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 border border-orange-200 text-orange-600">
            {item.period}
          </span>
        </div>

        <ul className="space-y-3">
          {item.bullets.map((bullet, bi) => (
            <li key={bi} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-orange-50/60">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16">
            Experience
          </h2>
        </FadeUp>

        <div className="relative max-w-3xl">
          <div className="absolute left-[18px] top-5 bottom-5 w-px timeline-line" />

          <div className="flex flex-col gap-10">
            {experiences.map((item, i) => (
              <TimelineEntry key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

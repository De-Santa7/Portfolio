"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio";

interface SkillBadgeProps {
  skill: Skill;
  delay?: number;
}

/**
 * Animated pill badge for displaying a single skill.
 * Scales up and glows on hover.
 */
export function SkillBadge({ skill, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay, ease: "easeOut" as const }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:border-accent/40 hover:bg-orange-50 transition-colors duration-200 cursor-default shadow-card"
    >
      <span className="text-base leading-none" aria-hidden="true">
        {skill.icon}
      </span>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
}

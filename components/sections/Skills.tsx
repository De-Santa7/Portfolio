"use client";

import { motion, type Variants } from "framer-motion";
import { FadeUp } from "@/components/ui/FadeUp";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { skillGroups } from "@/data/portfolio";

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeUp>
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            02 — Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 mb-4">
            My Toolkit
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-16">
            Technologies and tools I use to build things people love.
          </p>
        </FadeUp>

        {/* Skill groups */}
        <div className="flex flex-col gap-14">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.category} delay={gi * 0.1}>
              <div>
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-white/6" />
                </div>

                {/* Badges */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex flex-wrap gap-3"
                >
                  {group.skills.map((skill, si) => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill}
                      delay={gi * 0.08 + si * 0.04}
                    />
                  ))}
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

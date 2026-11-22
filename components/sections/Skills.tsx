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
    <section id="skills" className="py-24 md:py-32 bg-orange-50/60">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Tools & Tech
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-16">
            What I reach for when I&apos;m building something.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-14">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.category} delay={gi * 0.1}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

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

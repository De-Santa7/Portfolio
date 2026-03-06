"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { personal, stats } from "@/data/portfolio";

export function About() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <FadeUp>
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            01 — About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 mb-16">
            Who I am
          </h2>
        </FadeUp>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Avatar */}
          <FadeUp delay={0.1}>
            <div className="relative max-w-sm mx-auto md:mx-0">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />

              {/* Avatar card */}
              <div className="relative isolate rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/8 avatar-glow">
                {/* Inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-zinc-950/50" />

                {/* Grid overlay */}
                <div className="absolute inset-0 dot-grid opacity-30" />

                {/* Avatar photo (falls back to monogram on error / no upload) */}
                {!avatarError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/api/avatar"
                    alt={personal.name}
                    onError={() => setAvatarError(true)}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                )}

                {/* Monogram fallback */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${avatarError ? "" : "opacity-0"}`}>
                  <span className="text-8xl font-black tracking-tighter text-zinc-700 select-none">
                    UM
                  </span>
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                    {personal.shortName}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full border border-accent/20" />
                <div className="absolute bottom-6 left-6 w-10 h-10 rounded-full border border-white/10" />
              </div>

              {/* Location tag */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/8 shadow-card"
              >
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs font-medium text-zinc-300">{personal.location}</span>
              </motion.div>
            </div>
          </FadeUp>

          {/* Right — Bio + Stats */}
          <FadeUp delay={0.2} className="flex flex-col gap-8">

            {/* Bio */}
            <p className="text-lg text-zinc-400 leading-relaxed">
              {personal.bio}
            </p>

            {/* Info tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: MapPin,        text: personal.location },
                { icon: GraduationCap, text: personal.education },
                { icon: Briefcase,     text: personal.availability },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-white/8 text-xs font-medium text-zinc-400"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-accent" />
                  {text}
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-6 rounded-2xl bg-zinc-900 border border-white/8 shadow-card hover:border-white/12 transition-all duration-200"
                >
                  <p className="text-3xl font-bold text-accent mb-1">{value}</p>
                  <p className="text-sm text-zinc-500 font-medium">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200 self-start"
            >
              Let&apos;s work together
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

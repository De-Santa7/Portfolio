"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { personal, stats } from "@/data/portfolio";

export function About() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16">
            About me
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Avatar */}
          <FadeUp delay={0.1}>
            <div className="relative max-w-sm mx-auto md:mx-0">
              <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />

              <div className="relative isolate rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 avatar-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-orange-50/50" />
                <div className="absolute inset-0 dot-grid opacity-40" />

                {!avatarError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/api/avatar"
                    alt={personal.name}
                    onError={() => setAvatarError(true)}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                )}

                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${avatarError ? "" : "opacity-0"}`}>
                  <span className="text-8xl font-black tracking-tighter text-orange-200 select-none">
                    UM
                  </span>
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                    {personal.shortName}
                  </span>
                </div>

                <div className="absolute top-6 right-6 w-16 h-16 rounded-full border border-accent/20" />
                <div className="absolute bottom-6 left-6 w-10 h-10 rounded-full border border-orange-200" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-card"
              >
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs font-medium text-gray-700">{personal.location}</span>
              </motion.div>
            </div>
          </FadeUp>

          {/* Right — Bio + Stats */}
          <FadeUp delay={0.2} className="flex flex-col gap-8">

            <p className="text-lg text-gray-600 leading-relaxed">
              {personal.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: MapPin,        text: personal.location },
                { icon: GraduationCap, text: personal.education },
                { icon: Briefcase,     text: personal.availability },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-200 text-xs font-medium text-gray-600"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-accent" />
                  {text}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-card hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)] transition-all duration-200"
                >
                  <p className="text-3xl font-bold text-accent mb-1">{value}</p>
                  <p className="text-sm text-gray-500 font-medium">{label}</p>
                </motion.div>
              ))}
            </div>

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

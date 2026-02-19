"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Project card with gradient image area, title, description,
 * tech tags, and GitHub / Live Demo buttons.
 * Lifts and glows on hover.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" as const }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl border border-white/8 bg-zinc-900 shadow-card overflow-hidden hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Gradient image placeholder */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* Project initials */}
        <span className="relative text-4xl font-black tracking-tighter text-white/10 select-none">
          {project.title
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8 gap-4">
        <h3 className="text-lg font-bold text-zinc-50 group-hover:text-white transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-1">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-white/10 text-zinc-400 hover:text-zinc-100 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-accent/10 border border-accent/25 text-accent hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

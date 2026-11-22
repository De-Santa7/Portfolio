"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" as const }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-card overflow-hidden hover:border-orange-200 hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)] transition-all duration-300"
    >
      {/* Card header */}
      {project.image ? (
        <div className="relative h-44 bg-orange-50 flex items-center justify-center overflow-hidden p-6">
          <Image
            src={project.image}
            alt={`${project.title} logo`}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 dot-grid opacity-30" />
          <span className="relative text-4xl font-black tracking-tighter text-gray-900/10 select-none">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-8 gap-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-gray-600 border border-orange-200"
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
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

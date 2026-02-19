"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, personal } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeUp>
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            03 — Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 mb-4">
                Things I&apos;ve Built
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                A selection of projects I&apos;ve shipped — from full-stack APIs to AI-powered tools.
              </p>
            </div>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200 underline underline-offset-4"
            >
              View all on GitHub →
            </a>
          </div>
        </FadeUp>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

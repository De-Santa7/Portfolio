"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, personal } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Projects
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                Stuff I&apos;ve actually built and shipped.
              </p>
            </div>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200 underline underline-offset-4"
            >
              More on GitHub →
            </a>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

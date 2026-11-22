import { Check } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Architecture } from "@/components/ui/Architecture";
import { ProjectLinks, StackRow, Stats } from "@/components/ui/ProjectParts";
import { personal, projects } from "@/data/portfolio";

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="Work"
          title="Things I've built and shipped."
          intro="One product I run end to end, and a smaller AI build. Every link goes somewhere real."
        />

        {/* Featured */}
        <FadeUp as="article" className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10">
            <div className="flex flex-col gap-7">
              <div>
                <p className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                  <span className="rounded-full bg-accent px-2.5 py-1 text-on-accent">Featured</span>
                  <span className="text-muted">{featured.status}</span>
                </p>
                <h3 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{featured.title}</h3>
                <p className="mt-2 text-lg text-fg/90">{featured.tagline}</p>
                <p className="mt-4 leading-relaxed text-muted">{featured.summary}</p>
              </div>

              <ul className="space-y-3">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>

              <Stats stats={featured.stats} />
              <StackRow tools={featured.stack} />
              <ProjectLinks links={featured.links} />
            </div>

            <div className="lg:self-start lg:sticky lg:top-24">
              <Architecture compact />
            </div>
          </div>
        </FadeUp>

        {/* The rest */}
        <div className="mt-6 grid gap-6">
          {rest.map((p, i) => (
            <FadeUp
              key={p.slug}
              as="article"
              delay={0.05 * i}
              className="grid gap-6 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8 md:grid-cols-[1fr_auto] md:items-end"
            >
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{p.status}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-fg">{p.title}</h3>
                <p className="mt-1 text-fg/90">{p.tagline}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-5">
                  <StackRow tools={p.stack} />
                </div>
              </div>
              <ProjectLinks links={p.links} />
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-10">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            More on GitHub →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

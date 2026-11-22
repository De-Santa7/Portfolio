import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SessionCard } from "@/components/ui/SessionCard";
import { hero, personal } from "@/data/portfolio";

/**
 * Typographic hero. The h1 is never hidden (no opacity animation), so it
 * paints immediately for LCP; only secondary elements rise in.
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden="true" className="accent-glow absolute -top-40 right-[-10%] -z-10 size-[42rem] opacity-70" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="hero-rise mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted [--d:0s]">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {personal.availability}
            </span>
            <span>{personal.location}</span>
          </p>

          <p className="mb-3 font-mono text-sm text-accent">{personal.name}</p>

          <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            {hero.headline.before}
            <span className="text-accent">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>

          <p className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg [--d:0.1s]">
            {hero.sub}
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row [--d:0.2s]">
            <Button href="/#work">
              See the work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
            <Button href={personal.cv} download={personal.cvFilename} variant="outline">
              <Download className="size-4" />
              Download CV
            </Button>
          </div>
        </div>

        <SessionCard />
      </div>
    </section>
  );
}

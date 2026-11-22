import { personal } from "@/data/portfolio";

const stages = ["Plan", "Build", "Test", "Ship"];

/**
 * Intro: a terminal-style boot. A pipeline lights up stage by stage while a
 * counter runs to 100, then the curtain lifts. Pure CSS (see globals.css,
 * "Intro"), so it costs no JavaScript, and the page is fully rendered
 * underneath the whole time. Skipped on repeat visits and for reduced motion.
 */
export function Loader() {
  return (
    <div aria-hidden="true" className="intro-loader pointer-events-none fixed inset-0 z-[100] flex flex-col bg-bg">
      <div className="container-page flex items-center justify-between pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>{personal.shortName}</span>
        <span className="hidden sm:inline">Full-stack · Prompt engineering</span>
      </div>

      <div className="container-page flex flex-1 items-center">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-x-[6px] top-[5px] h-px bg-line">
            <div className="intro-line h-px origin-left bg-accent" />
          </div>
          <ol className="relative flex justify-between">
            {stages.map((s, i) => (
              <li key={s} className="intro-stage flex flex-col items-center gap-3" style={{ animationDelay: `${0.15 + i * 0.35}s` }}>
                <span className="intro-dot size-[11px] rounded-full border border-line-strong bg-bg" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-page flex items-end justify-between gap-6 pb-6">
        <p className="pb-3 font-mono text-xs text-muted sm:text-sm">
          <span className="text-accent">~/{personal.shortName.toLowerCase()}</span> $ npm run portfolio
          <br />
          <span className="text-fg/80">warming up the workspace</span>
          <span className="intro-caret ml-0.5 inline-block text-accent">▍</span>
        </p>
        <span className="intro-count font-semibold leading-none tracking-tighter text-fg tabular-nums" />
      </div>
    </div>
  );
}

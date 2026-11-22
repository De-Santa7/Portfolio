import { personal } from "@/data/portfolio";

/**
 * Short intro curtain, pure CSS (no JS needed to show or dismiss it).
 * The page is fully server-rendered underneath, so it never delays content.
 * Hidden via html[data-intro="skip"] on repeat visits / reduced motion.
 */
export function Loader() {
  return (
    <div
      aria-hidden="true"
      className="intro-loader pointer-events-none fixed inset-0 z-[100] flex animate-loader-out flex-col justify-end bg-bg"
    >
      <div className="container-page pb-12 font-mono text-sm text-muted">
        <p>
          <span className="text-accent">~/</span>
          {personal.shortName.toLowerCase()} <span className="text-muted">$</span> booting the workspace
          <span className="ml-0.5 inline-block animate-[blink_1s_steps(1)_3] text-accent">▍</span>
        </p>
        <div className="mt-4 h-px w-full bg-line">
          <div className="h-px origin-left animate-loader-bar bg-accent" />
        </div>
      </div>
    </div>
  );
}

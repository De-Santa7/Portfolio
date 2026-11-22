"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";

/**
 * Hero side-card: an *illustration* of how a typical task runs with Claude
 * Code. Clearly labelled as such — it is not a recording of a real session,
 * and contains no numbers or file names that could read as claims.
 */
const steps = [
  { tag: "task", text: "Retry failed vendor payouts automatically", tone: "fg" },
  { tag: "plan", text: "Write the goal, constraints and done-criteria", tone: "muted" },
  { tag: "read", text: "Claude reads the payout service and its tests", tone: "muted" },
  { tag: "edit", text: "Adds a scheduled retry job + logging", tone: "muted" },
  { tag: "test", text: "Run the payment tests, then a sandbox transfer", tone: "muted" },
  { tag: "review", text: "I read the full diff, line by line", tone: "muted" },
  { tag: "ship", text: "Merge, deploy, watch the first run", tone: "accent" },
] as const;

export function SessionCard() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      n = n >= steps.length + 3 ? 0 : n + 1; // hold on the finished state, then loop
      setShown(Math.min(n, steps.length));
      timer = setTimeout(tick, n === 0 ? 400 : 900);
    };
    timer = setTimeout(tick, 1600); // start after the intro
    return () => clearTimeout(timer);
  }, [reduce]);

  const visible = reduce ? steps.length : shown;
  const done = visible >= steps.length;

  return (
    <figure className="hero-rise relative w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40 [--d:0.35s]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-xs text-muted">claude-code<span className="hidden sm:inline"> · a typical task</span></span>
        </div>
        <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
          Illustration
        </span>
      </div>

      <ol className="min-h-[19.5rem] space-y-2.5 p-4 font-mono text-[13px] leading-snug sm:p-5" aria-label="How a typical task runs">
        {steps.map((s, i) => (
          <li
            key={s.tag}
            className={`grid grid-cols-[4.25rem_1fr] gap-2 transition-all duration-300 ${
              i < visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <span className={s.tone === "accent" ? "text-accent" : "text-muted"}>
              {i === 0 ? "›" : i < visible - 1 || done ? "✓" : "●"} {s.tag}
            </span>
            <span className={s.tone === "fg" ? "text-fg" : s.tone === "accent" ? "text-accent" : "text-muted"}>
              {s.text}
            </span>
          </li>
        ))}
        {!done && (
          <li className="pl-[4.75rem] text-accent" aria-hidden="true">
            <span className="animate-blink">▍</span>
          </li>
        )}
      </ol>

      <figcaption className="border-t border-line px-4 py-3 text-xs text-muted sm:px-5">
        How I build with AI: Claude does the typing, I own the plan and the review.
      </figcaption>
    </figure>
  );
}

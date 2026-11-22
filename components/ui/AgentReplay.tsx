"use client";

import { useEffect, useRef, useState } from "react";
import { startTour } from "./agentTour";

/** Fired when the agent cursor "clicks" the hero terminal; SessionCard listens. */
export const AGENT_RUN_EVENT = "agent:run";
/** Fired by SessionCard when an agent-started session has finished. */
export const AGENT_DONE_EVENT = "agent:done";

const FLY_ARRIVES_MS = 550 + 3600 * 0.78; // agent-fly delay + time to the "click" keyframe

/**
 * "Run the agent": replays the hero as a little performance. The headline
 * wipes back in, the agent cursor paints the highlight, flies into the
 * terminal and clicks it, the terminal session runs, and then the agent
 * gives a guided tour of the rest of the page (see agentTour.ts).
 * The choreography is CSS (globals.css, "replay"); this only measures the
 * flight path, restarts the animations and fires the event.
 */
export function AgentReplay({ className = "", onStart }: { className?: string; onStart?: () => void }) {
  const [running, setRunning] = useState(false);
  const stopTour = useRef<(() => void) | null>(null);

  // Tear the tour down if this button unmounts mid-tour.
  useEffect(() => () => stopTour.current?.(), []);

  function run() {
    if (running) return;
    onStart?.();
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

    const mark = document.querySelector<HTMLElement>(".agent-mark");
    const track = document.querySelector<HTMLElement>(".agent-track");
    const target = document.querySelector<HTMLElement>("[data-agent-target]");
    if (!mark || !track || !target) return;

    setRunning(true);
    // Wait for the scroll to settle so the measurements are right.
    setTimeout(() => {
      const m = mark.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      track.style.setProperty("--fly-x", `${t.left + 28 - m.right}px`);
      track.style.setProperty("--fly-y", `${t.top + t.height / 2 - (m.top + m.height * 0.62)}px`);

      root.dataset.intro = "skip";
      root.classList.remove("replay");
      void root.offsetWidth; // restart the CSS animations
      root.classList.add("replay");

      setTimeout(() => {
        target.animate(
          [
            { boxShadow: "0 0 0 0 var(--color-accent)", borderColor: "var(--color-accent)" },
            { boxShadow: "0 0 0 6px transparent", borderColor: "var(--color-accent)" },
          ],
          { duration: 600, easing: "ease-out" },
        );
        // When the terminal session finishes, the agent tours the rest of the page.
        const onDone = () => {
          window.removeEventListener(AGENT_DONE_EVENT, onDone);
          stopTour.current = startTour(() => {
            stopTour.current = null;
            setRunning(false);
          });
        };
        window.addEventListener(AGENT_DONE_EVENT, onDone);
        window.dispatchEvent(new Event(AGENT_RUN_EVENT));
      }, reduce ? 0 : FLY_ARRIVES_MS);
    }, reduce ? 0 : 450);
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={running}
      className={`group inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:bg-accent-soft disabled:opacity-60 ${className}`}
    >
      <span className={`text-accent ${running ? "inline-block animate-spin [animation-duration:1.6s]" : ""}`}>✻</span>
      {running ? "agent at work…" : "Run the agent"}
    </button>
  );
}

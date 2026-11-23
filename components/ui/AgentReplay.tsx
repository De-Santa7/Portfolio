"use client";

import { useEffect, useSyncExternalStore } from "react";
import { startTour } from "./agentTour";

/** Fired when the agent cursor "clicks" the hero terminal; SessionCard listens. */
export const AGENT_RUN_EVENT = "agent:run";
/** Fired by SessionCard when an agent-started session has finished. */
export const AGENT_DONE_EVENT = "agent:done";

const FLY_ARRIVES_MS = 550 + 3600 * 0.78; // agent-fly delay + time to the "click" keyframe
const RAN_KEY = "agent-ran";

// ─── Shared state: every "run the agent" control reflects the same run ───────
let running = false;
let stopTour: (() => void) | null = null;
const subs = new Set<() => void>();
const notify = () => subs.forEach((f) => f());
const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => subs.delete(cb);
};
function setRunning(v: boolean) {
  running = v;
  notify();
}
export const useAgentRunning = () => useSyncExternalStore(subscribe, () => running, () => false);
/** True until the visitor has run the agent once this session (drives the pulse). */
const useFresh = () =>
  useSyncExternalStore(
    subscribe,
    () => {
      try {
        return !sessionStorage.getItem(RAN_KEY);
      } catch {
        return false;
      }
    },
    () => false,
  );

/**
 * "Run the agent": replays the hero as a little performance. The headline
 * wipes back in, the agent cursor paints the highlight, flies into the
 * terminal and clicks it, the terminal session runs, and then the agent
 * gives a guided tour of the rest of the page (see agentTour.ts).
 * The choreography is CSS (globals.css, "replay"); this only measures the
 * flight path, restarts the animations and fires the events.
 */
export function runAgent() {
  if (running) return;
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mark = document.querySelector<HTMLElement>(".agent-mark");
  const track = document.querySelector<HTMLElement>(".agent-track");
  const target = document.querySelector<HTMLElement>("[data-agent-target]");
  if (!mark || !track || !target) return;

  try {
    sessionStorage.setItem(RAN_KEY, "1");
  } catch {
    /* private mode: no pulse memory, that's fine */
  }
  setRunning(true);
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

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
        stopTour = startTour(() => {
          stopTour = null;
          setRunning(false);
        });
      };
      window.addEventListener(AGENT_DONE_EVENT, onDone);
      window.dispatchEvent(new Event(AGENT_RUN_EVENT));
    }, reduce ? 0 : FLY_ARRIVES_MS);
  }, reduce ? 0 : 450);
}

/**
 * The control. `nav`: compact pill for the navbar. `hero`: the big one, with
 * a light running around its border and a pulse until it has been used.
 */
export function AgentReplay({
  variant = "nav",
  className = "",
  onStart,
}: {
  variant?: "nav" | "hero";
  className?: string;
  onStart?: () => void;
}) {
  const isRunning = useAgentRunning();
  const fresh = useFresh();

  // Leaving the page mid-tour (client navigation): tear the tour down.
  useEffect(() => () => stopTour?.(), []);

  const star = (
    <span className={`text-accent ${isRunning ? "inline-block animate-spin [animation-duration:1.6s]" : ""}`} aria-hidden="true">
      ✻
    </span>
  );
  const pulse = fresh && !isRunning && (
    <span className="relative flex size-2" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
      <span className="relative inline-flex size-2 rounded-full bg-accent" />
    </span>
  );
  const start = () => {
    onStart?.();
    runAgent();
  };

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={start}
        disabled={isRunning}
        className={`agent-cta group inline-flex flex-col items-center justify-center gap-0.5 rounded-full bg-surface px-5 py-3 font-mono text-sm text-fg transition-colors hover:bg-surface-2 disabled:opacity-70 ${className}`}
      >
        <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
          {pulse || star}
          <span className="font-semibold">{isRunning ? "agent at work…" : "Run the agent"}</span>
        </span>
        {!isRunning && <span className="text-[11px] leading-tight text-muted sm:hidden">it&apos;ll give you a guided tour</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={start}
      disabled={isRunning}
      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:bg-accent-soft disabled:opacity-60 ${
        fresh ? "border-accent-line" : "border-line-strong"
      } ${className}`}
    >
      {pulse || star}
      {isRunning ? "agent at work…" : "Run the agent"}
    </button>
  );
}

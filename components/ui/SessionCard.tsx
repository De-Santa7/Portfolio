"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";
import { AGENT_DONE_EVENT, AGENT_RUN_EVENT, runAgent, useAgentRunning } from "./AgentReplay";

/**
 * Hero terminal styled after the Claude Code CLI: welcome box, a `>` prompt
 * that types itself, tool calls (⏺) with results (⎿) and the ✻ spinner.
 * It is an *illustration* of how a typical task runs, labelled as such, with
 * no invented numbers or file names.
 */

const task = "retry failed vendor payouts automatically";

type Line =
  | { kind: "say"; text: string }
  | { kind: "tool"; name: string; arg: string; result: string }
  | { kind: "me"; text: string };

const lines: Line[] = [
  { kind: "say", text: "I'll plan this first: goal, constraints, what 'done' means." },
  { kind: "tool", name: "Read", arg: "payout service", result: "found where transfers fail" },
  { kind: "tool", name: "Write", arg: "scheduled retry job", result: "retries + logging added" },
  { kind: "tool", name: "Bash", arg: "run payment tests", result: "tests passed" },
  { kind: "me", text: "reviewed the diff line by line · merged · deployed" },
];

const TYPE_MS = task.length * 38;
const spinner = ["·", "✢", "✶", "✻", "✽", "✻", "✶", "✢"];
const verbs = ["Planning", "Reading", "Writing", "Testing", "Reviewing"];

export function SessionCard() {
  const reduce = useReducedMotion();
  const agentRunning = useAgentRunning();
  const [cycle, setCycle] = useState(0); // 0 = not started; bumps restart the CSS typing
  const [shown, setShown] = useState(0); // transcript lines revealed
  const [frame, setFrame] = useState(0); // spinner frame
  const [typedDone, setTypedDone] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    let byAgent = false;
    const run = () => {
      if (cancelled) return;
      setCycle((c) => c + 1);
      setShown(0);
      let t = TYPE_MS + 500;
      for (let i = 1; i <= lines.length; i++) timers.push(setTimeout(() => setShown(i), (t += 1100)));
      if (byAgent) {
        byAgent = false;
        timers.push(setTimeout(() => window.dispatchEvent(new Event(AGENT_DONE_EVENT)), t + 900));
      }
      timers.push(setTimeout(run, t + 4500)); // hold the finished state, then loop
    };

    // Start once the intro has lifted (data-intro="skip" means it never showed).
    const start = setTimeout(run, document.documentElement.dataset.intro === "skip" ? 600 : 2600);

    // "Run the agent" replay: the agent clicked the terminal, start over now.
    const onAgent = () => {
      clearTimeout(start);
      timers.forEach(clearTimeout);
      timers.length = 0;
      setTypedDone(false);
      byAgent = true;
      run();
    };
    window.addEventListener(AGENT_RUN_EVENT, onAgent);

    return () => {
      cancelled = true;
      clearTimeout(start);
      timers.forEach(clearTimeout);
      window.removeEventListener(AGENT_RUN_EVENT, onAgent);
    };
  }, [reduce]);

  const n = reduce ? lines.length : shown;
  const working = (reduce || typedDone) && n < lines.length;

  // Spin only while "working", so the card is idle the rest of the time.
  useEffect(() => {
    if (!working) return;
    const spin = setInterval(() => setFrame((f) => (f + 1) % spinner.length), 140);
    return () => clearInterval(spin);
  }, [working]);

  return (
    <figure
      className="hero-rise relative w-full overflow-hidden rounded-xl border border-line-strong bg-[#0d0d0e] font-mono text-[12.5px] leading-relaxed shadow-2xl shadow-black/50 sm:text-[13px] [--d:0.35s]"
      aria-label="Illustration: how a typical task runs with Claude Code"
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-2 text-[11px] text-muted">~/studex — zsh</span>
        </div>
        <span className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          illustration
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* welcome box */}
        <div className="rounded-lg border border-accent/70 px-4 py-3">
          <p className="text-fg">
            <span className="text-accent">✻</span> zitere&apos;s workspace
          </p>
          <p className="mt-2 pl-4 text-muted">how I build: Claude Code + me</p>
          <p className="pl-4 text-muted">cwd: ~/studex</p>
        </div>

        {/* prompt */}
        <p className="mt-4 text-fg">
          <span className="text-muted">&gt; </span>
          {reduce ? (
            task
          ) : cycle > 0 ? (
            <span
              key={cycle}
              className="type-in"
              style={{ "--chars": task.length, "--type-dur": `${TYPE_MS}ms` } as CSSProperties}
              onAnimationStart={() => setTypedDone(false)}
              onAnimationEnd={() => setTypedDone(true)}
            >
              {task}
            </span>
          ) : null}
          {!reduce && !typedDone && <span className="ml-px inline-block w-[0.6em] animate-blink bg-fg/80">&nbsp;</span>}
        </p>

        {/* transcript */}
        <ol className="mt-3 min-h-[12.5rem] space-y-2">
          {lines.slice(0, n).map((l, i) => (
            <li key={i} className="animate-rise [animation-duration:0.35s]">
              {l.kind === "say" && (
                <p className="text-fg">
                  <span className="text-fg/70">● </span>
                  {l.text}
                </p>
              )}
              {l.kind === "tool" && (
                <>
                  <p className="text-fg">
                    <span className="text-[#4ade80]">● </span>
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-muted">({l.arg})</span>
                  </p>
                  <p className="pl-4 text-muted">└  {l.result}</p>
                </>
              )}
              {l.kind === "me" && (
                <p className="text-accent">
                  ✓ <span className="text-muted">me: </span>
                  {l.text}
                </p>
              )}
            </li>
          ))}
          {working && (
            <li className="text-accent" aria-hidden="true">
              <span className="inline-block w-4">{spinner[frame]}</span>
              {verbs[Math.min(n, verbs.length - 1)]}…<span className="text-muted"> (esc to interrupt)</span>
            </li>
          )}
        </ol>

        {/* input box */}
        <button
          type="button"
          data-agent-target
          onClick={runAgent}
          disabled={agentRunning}
          className="mt-3 block w-full rounded-lg border border-line-strong px-3 py-2 text-left text-muted transition-colors hover:border-accent hover:text-fg disabled:hover:border-line-strong"
        >
          &gt; {agentRunning ? "" : <span className="text-muted">click to run the agent</span>}
        </button>
        <p className="mt-1.5 px-1 text-[11px] text-muted">? for shortcuts</p>
      </div>
    </figure>
  );
}

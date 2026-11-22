"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useReducedMotion } from "@/lib/useMediaQuery";

import type Matter from "matter-js";

type MatterModule = typeof Matter;

interface Sim {
  stop: () => void;
  /** Current transform of each tile, so "rise" can start from where it lies. */
  poses: () => Map<HTMLElement, string>;
}

/**
 * "Drop the stack": every .stack-tile becomes a rigid body (matter-js, loaded
 * only on first click) and falls to the section floor under gravity, tumbling
 * and piling up. While down, tiles can be grabbed and thrown with a mouse.
 * "Pick it back up" stops the physics and glides each tile home, gently.
 * The tiles stay server-rendered DOM; physics only writes their transforms.
 */
export function StackPlayground({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim | null>(null);
  const [fallen, setFallen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rising, setRising] = useState(false);
  const reduce = useReducedMotion();

  // Layout changes while the tiles are down: put everything back instantly.
  useEffect(() => {
    const reset = () => {
      if (!sim.current) return;
      sim.current.stop();
      sim.current = null;
      root.current?.querySelectorAll<HTMLElement>(".stack-tile").forEach((t) => (t.style.transform = ""));
      setFallen(false);
    };
    window.addEventListener("resize", reset);
    return () => {
      window.removeEventListener("resize", reset);
      sim.current?.stop();
    };
  }, []);

  async function drop() {
    const el = root.current;
    if (!el || sim.current) return;
    setBusy(true);
    const mod = await import("matter-js");
    const M = ((mod as unknown as { default?: MatterModule }).default ?? mod) as MatterModule;
    const { Engine, Bodies, Body, Composite, Constraint, Events } = M;

    const box = el.getBoundingClientRect();
    const W = box.width;
    const H = box.height - 2; // the "ground" line
    const engine = Engine.create({ gravity: { x: 0, y: 1.4 }, enableSleeping: false });

    // Floor, walls and a ceiling at the top of the section, so throws stay inside.
    const T = 200;
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + T / 2, W + 2 * T, T, { isStatic: true, friction: 0.9 }),
      Bodies.rectangle(-T / 2, H / 2, T, H * 3, { isStatic: true }),
      Bodies.rectangle(W + T / 2, H / 2, T, H * 3, { isStatic: true }),
      Bodies.rectangle(W / 2, -T / 2, W + 2 * T, T, { isStatic: true }),
    ]);

    const tiles = Array.from(el.querySelectorAll<HTMLElement>(".stack-tile")).map((t) => {
      const r = t.getBoundingClientRect();
      const x = r.left - box.left + r.width / 2;
      const y = r.top - box.top + r.height / 2;
      const body = Bodies.rectangle(x, y, r.width, r.height, {
        chamfer: { radius: 10 },
        restitution: 0.25,
        friction: 0.5,
        frictionAir: 0.012,
        density: 0.0016,
      });
      // A tiny random nudge so they tumble instead of dropping like a block.
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.6, y: Math.random() * -1.5 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);
      return { t, body, x, y };
    });
    Composite.add(
      engine.world,
      tiles.map((d) => d.body),
    );

    const transformOf = (d: (typeof tiles)[number]) =>
      `translate(${d.body.position.x - d.x}px, ${d.body.position.y - d.y}px) rotate(${d.body.angle}rad)`;
    const sync = () => {
      for (const d of tiles) d.t.style.transform = transformOf(d);
    };
    Events.on(engine, "afterUpdate", sync);

    // Grab-and-throw (mouse/pen; touch keeps scrolling the page). On press,
    // a spring is pinned to the exact point grabbed; moving drags it, and
    // letting go releases the tile with whatever speed it had: a throw.
    const bodyOf = new Map(tiles.map((d) => [d.t, d.body]));
    let grab: { c: Matter.Constraint; id: number; t: HTMLElement } | null = null;
    const local = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      const t = (e.target as Element).closest<HTMLElement>(".stack-tile");
      const body = t && bodyOf.get(t);
      if (!t || !body) return;
      e.preventDefault();
      const p = local(e);
      const c = Constraint.create({
        pointA: p,
        bodyB: body,
        pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
        length: 0,
        stiffness: 0.2,
        damping: 0.1,
      });
      Composite.add(engine.world, c);
      grab = { c, id: e.pointerId, t };
      t.dataset.dragging = "";
    };
    const onMove = (e: PointerEvent) => {
      if (grab && e.pointerId === grab.id) grab.c.pointA = local(e);
    };
    const onUp = (e: PointerEvent) => {
      if (!grab || e.pointerId !== grab.id) return;
      Composite.remove(engine.world, grab.c);
      delete grab.t.dataset.dragging;
      grab = null;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // Our own loop: advance by real elapsed time in fixed 60 Hz steps, so the
    // fall looks right at any frame rate, and idle while off-screen.
    const STEP = 1000 / 60;
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(el);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      acc += Math.min(now - last, 100); // cap catch-up after a pause
      last = now;
      if (!onScreen) {
        acc = 0;
        return;
      }
      while (acc >= STEP) {
        Engine.update(engine, STEP);
        acc -= STEP;
      }
    };
    if (reduce) {
      // No falling animation: settle the pile instantly.
      for (let i = 0; i < 240; i++) Engine.update(engine, STEP);
    }
    raf = requestAnimationFrame(tick);

    sim.current = {
      stop: () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        Events.off(engine, "afterUpdate", sync);
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        if (grab) delete grab.t.dataset.dragging;
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      },
      poses: () => new Map(tiles.map((d) => [d.t, transformOf(d)])),
    };
    setFallen(true);
    setBusy(false);
  }

  function rise() {
    const s = sim.current;
    if (!s) return;
    const poses = s.poses();
    s.stop();
    sim.current = null;
    setFallen(false);
    setBusy(true);

    // Gentle float home: lift and straighten a little, then glide into the
    // slot with an even ease-in-out. Lower tiles leave first; no overshoot.
    const order = [...poses.entries()].sort(
      (a, b) => b[0].getBoundingClientRect().bottom - a[0].getBoundingClientRect().bottom,
    );
    let longest = 0;
    order.forEach(([t, from], i) => {
      t.style.transform = "";
      const duration = reduce ? 1 : 1500;
      const delay = reduce ? 0 : i * 45;
      longest = Math.max(longest, duration + delay);
      t.animate(
        [
          { transform: from, easing: "cubic-bezier(0.3, 0, 0.3, 1)" },
          { transform: `${from} translateY(-18px)`, offset: 0.25, easing: "cubic-bezier(0.45, 0, 0.2, 1)" },
          { transform: "translate(0px, 0px) rotate(0rad)" },
        ],
        { duration, delay, fill: "backwards" },
      );
    });
    setRising(true);
    setTimeout(() => {
      setBusy(false);
      setRising(false);
    }, longest);
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-end gap-4">
        {fallen && (
          <span className="hidden font-mono text-xs text-muted [@media(pointer:fine)]:inline">
            grab one and throw it
          </span>
        )}
        <button
          type="button"
          onClick={fallen ? rise : drop}
          disabled={busy}
          aria-pressed={fallen}
          className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:bg-accent-soft disabled:opacity-50"
        >
          {fallen ? (
            <>
              <ArrowUpFromLine className="size-3.5 text-accent transition-transform group-hover:-translate-y-0.5" />
              Pick it back up
            </>
          ) : (
            <>
              <ArrowDownToLine className="size-3.5 text-accent transition-transform group-hover:translate-y-0.5" />
              Drop the stack
            </>
          )}
        </button>
      </div>

      <div
        ref={root}
        data-fallen={fallen ? "" : undefined}
        data-physics={fallen || rising ? "" : undefined}
        className="stack-play relative pb-28 md:pb-32"
      >
        {children}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line-strong">
          <span className="absolute -top-5 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            ground
          </span>
        </div>
      </div>
    </>
  );
}

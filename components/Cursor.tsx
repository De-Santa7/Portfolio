"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a dot that tracks the pointer exactly and a ring that trails
 * it with easing. The ring grows over links and buttons and says "drag" over
 * stack tiles; over text fields the native caret comes back.
 * Only on mouse/trackpad devices and when reduced motion is off; the rAF loop
 * stops as soon as the ring catches up, so it costs nothing at rest.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const d = dot.current!;
    const r = ring.current!;
    root.dataset.cursor = "on";

    let x = -100, y = -100, rx = x, ry = y, raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      root.dataset.cursorVisible = "";
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: Event) => {
      const t = e.target as Element;
      const state = t.closest("input, textarea, select, [contenteditable]")
        ? "text"
        : t.closest(".stack-tile")
          ? "drag"
          : t.closest("a, button, label, summary, [role='button']")
            ? "link"
            : "";
      if (state) root.dataset.cursorState = state;
      else delete root.dataset.cursorState;
    };

    const onLeave = () => delete root.dataset.cursorVisible;
    const onDown = () => (root.dataset.cursorDown = "");
    const onUp = () => delete root.dataset.cursorDown;

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      for (const k of ["cursor", "cursorVisible", "cursorState", "cursorDown"]) delete root.dataset[k];
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring">
        <span>drag</span>
      </div>
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
    </>
  );
}

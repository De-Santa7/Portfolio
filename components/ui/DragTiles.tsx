"use client";

import { useRef } from "react";

/**
 * Makes each direct <li> child draggable with a mouse/trackpad; on release it
 * springs back to its slot. Touch input is ignored so phones scroll normally.
 * The tiles themselves stay server-rendered.
 */
export function DragTiles({ children, className }: { children: React.ReactNode; className?: string }) {
  const drag = useRef<{ el: HTMLElement; x: number; y: number; id: number } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    const el = (e.target as HTMLElement).closest("li");
    if (!el || el.parentElement !== e.currentTarget) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "";
    drag.current = { el, x: e.clientX, y: e.clientY, id: e.pointerId };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    d.el.style.transform = `translate(${e.clientX - d.x}px, ${e.clientY - d.y}px) rotate(-3deg) scale(1.06)`;
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    delete d.el.dataset.dragging;
    d.el.style.transform = "";
    drag.current = null;
  }

  return (
    <ul
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </ul>
  );
}

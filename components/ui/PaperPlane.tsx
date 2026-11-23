"use client";

import type { CSSProperties } from "react";

export interface Flight {
  /** SVG path in the container's pixel space: from the button, a curl, then away. */
  path: string;
  w: number;
  h: number;
  /** Changes per launch so the CSS animations restart. */
  id: number;
}

/**
 * The "message sent" moment: a paper plane takes off from the send button,
 * follows a curling path (CSS offset-path, banking with the curve) and
 * leaves a dashed trail from its tail that draws behind it, then fades.
 * Pure CSS animation; this only renders the shapes. See globals.css "Plane".
 */
export function PaperPlane({ flight }: { flight: Flight }) {
  const maskId = `trail-${flight.id}`;
  return (
    <div key={flight.id} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <svg width={flight.w} height={flight.h} viewBox={`0 0 ${flight.w} ${flight.h}`} className="absolute inset-0 overflow-visible">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
            <path d={flight.path} pathLength={1} className="plane-trail-draw" fill="none" stroke="white" strokeWidth={8} />
          </mask>
        </defs>
        <path
          d={flight.path}
          mask={`url(#${maskId})`}
          className="plane-trail"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.6}
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
      </svg>
      <div className="plane" style={{ offsetPath: `path('${flight.path}')` } as CSSProperties}>
        {/* The original paper-plane drawing, whose nose points up-right (~45°).
            Rotated +45° so the nose points straight along +x: with
            offset-rotate: auto it then always leads along the path. */}
        <svg viewBox="0 0 32 32" width="36" height="36">
          <g transform="rotate(45 16 16)">
            <path d="M2 15.5 30 4 22 28l-7.5-7.2L2 15.5Z" fill="var(--color-fg)" stroke="var(--color-bg)" strokeWidth="1" strokeLinejoin="round" />
            <path d="M14.5 20.8 30 4 11 18.2l3.5 2.6Z" fill="var(--color-accent)" />
            <path d="M14.5 20.8 13.6 27l3.6-3.6" fill="color-mix(in oklab, var(--color-fg) 70%, black)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * Builds a flight path in the container's pixel space: the plane leaves the
 * send button heading right, dips a touch as it's launched, climbs, and
 * flies off past the right edge of the screen.
 */
export function planFlight(container: HTMLElement, from: HTMLElement): Flight {
  const c = container.getBoundingClientRect();
  const b = from.getBoundingClientRect();
  const x = b.left - c.left + b.width / 2;
  const y = b.top - c.top + b.height / 2;
  const toScreenEdge = window.innerWidth - (c.left + x);
  const ex = x + Math.max(420, toScreenEdge + 160);
  const ey = y - Math.min(460, Math.max(300, ex - x) * 0.55);
  const r = (n: number) => Math.round(n);
  const path =
    `M ${r(x)} ${r(y)} ` +
    `C ${r(x + 60)} ${r(y + 22)}, ${r(x + 150)} ${r(y + 12)}, ${r(x + 230)} ${r(y - 45)} ` +
    `S ${r(ex - 150)} ${r(ey + 110)}, ${r(ex)} ${r(ey)}`;
  return { path, w: r(c.width), h: r(c.height), id: Date.now() };
}

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
        {/* Paper plane, nose pointing right (offset-rotate: auto turns it along the path). */}
        <svg viewBox="0 0 32 32" width="34" height="34">
          <path d="M2 15.5 30 4 22 28l-7.5-7.2L2 15.5Z" fill="var(--color-fg)" stroke="var(--color-bg)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M14.5 20.8 30 4 11 18.2l3.5 2.6Z" fill="var(--color-accent)" />
          <path d="M14.5 20.8 13.6 27l3.6-3.6" fill="color-mix(in oklab, var(--color-fg) 70%, black)" />
        </svg>
      </div>
    </div>
  );
}

/** Builds a flight path from the button to off the top-right of the container. */
export function planFlight(container: HTMLElement, from: HTMLElement): Flight {
  const c = container.getBoundingClientRect();
  const b = from.getBoundingClientRect();
  const x = b.left - c.left + b.width / 2;
  const y = b.top - c.top + b.height / 2;
  const W = c.width;
  const r = (n: number) => Math.round(n);
  // Take off left and up, curl over, then shoot off past the top-right corner.
  const path =
    `M ${r(x)} ${r(y)} ` +
    `C ${r(x - 170)} ${r(y + 10)}, ${r(x - 210)} ${r(y - 170)}, ${r(x - 70)} ${r(y - 185)} ` +
    `C ${r(x + 70)} ${r(y - 200)}, ${r(W - 40)} ${r(y - 70)}, ${r(W + 280)} ${r(-140)}`;
  return { path, w: r(W), h: r(c.height), id: Date.now() };
}

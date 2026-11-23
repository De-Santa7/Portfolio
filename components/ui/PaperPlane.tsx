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
 * send button heading right, levels out, pulls up into a full vertical loop
 * (upside down over the top, nose leading the whole way), comes out level,
 * then climbs away past the right edge of the screen.
 */
export function planFlight(container: HTMLElement, from: HTMLElement): Flight {
  const c = container.getBoundingClientRect();
  const b = from.getBoundingClientRect();
  const r = (n: number) => Math.round(n);
  const x = b.left - c.left + b.width / 2;
  const y = b.top - c.top + b.height / 2;

  // Loop entry: level flight, a little right of and above the button.
  const R = 62; // loop radius
  const ax = x + 190;
  const ay = y - 55;
  const drift = 26; // real loops come out a bit further along

  const toScreenEdge = window.innerWidth - (c.left + ax);
  const ex = ax + Math.max(360, toScreenEdge + 160);
  const ey = ay - Math.min(420, Math.max(260, ex - ax) * 0.5);

  const path =
    `M ${r(x)} ${r(y)} ` +
    // launch: slight dip, then level out heading right (horizontal tangent at entry)
    `C ${r(x + 60)} ${r(y + 20)}, ${r(ax - 90)} ${r(ay)}, ${r(ax)} ${r(ay)} ` +
    // the loop: up the right side, over the top (upside down), down the left side
    `A ${R} ${R} 0 0 0 ${r(ax + drift / 2)} ${r(ay - 2 * R)} ` +
    `A ${R} ${R} 0 0 0 ${r(ax + drift)} ${r(ay)} ` +
    // out of the loop level, then climb away
    `C ${r(ax + drift + 110)} ${r(ay)}, ${r(ex - 150)} ${r(ey + 110)}, ${r(ex)} ${r(ey)}`;
  return { path, w: r(c.width), h: r(c.height), id: Date.now() };
}

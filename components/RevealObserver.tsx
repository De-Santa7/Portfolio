"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives every [data-reveal] element on the page with one IntersectionObserver.
 * Elements already on screen are marked shown *before* hiding is switched on,
 * so nothing flickers; if this script never runs, nothing is ever hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    const vh = window.innerHeight;

    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.dataset.shown = "";
    }
    root.dataset.reveal = "on";

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    for (const el of els) if (!("shown" in el.dataset)) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

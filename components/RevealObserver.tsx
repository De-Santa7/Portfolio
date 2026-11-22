"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives every [data-reveal] element with one IntersectionObserver.
 * An element is hidden only while it is being watched (data-pending), so
 * nothing is ever lost: no JS, a late-mounted node or a hot reload simply
 * leaves it visible. Elements already on screen are never hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          delete el.dataset.pending; // transition runs from the hidden state
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    const watch = (root: ParentNode) => {
      const vh = window.innerHeight;
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-seen])").forEach((el) => {
        el.dataset.seen = "";
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) return; // already visible: leave it alone
        el.dataset.pending = "";
        io.observe(el);
      });
    };

    watch(document);
    // Pick up anything rendered later (client navigation, streamed content).
    let queued = 0;
    const mo = new MutationObserver(() => {
      if (!queued) queued = requestAnimationFrame(() => ((queued = 0), watch(document)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
      // Never leave anything hidden behind us; let the next run start fresh.
      document.querySelectorAll<HTMLElement>("[data-seen]").forEach((el) => {
        delete el.dataset.pending;
        delete el.dataset.seen;
      });
    };
  }, [pathname]);

  return null;
}

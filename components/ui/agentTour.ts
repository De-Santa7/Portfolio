/**
 * Guided tour run by the "agent": scrolls the page slowly from section to
 * section, points at what matters, presses the stack's drop button, and ends
 * at the bottom. Any wheel, touch, key or click on "stop" hands control back
 * to the visitor immediately. Plain DOM (no React), torn down completely.
 */

interface Step {
  sel: string;
  say: string;
  act?: (el: HTMLElement) => Promise<void>;
}

const steps: Step[] = [
  { sel: "#work h3", say: "StudEx. I built it solo." },
  { sel: "#work .polaroid", say: "It's live at studex.com.ng" },
  { sel: '#work a[href="/work/studex"]', say: "The full case study is here." },
  { sel: "#about h2", say: "A bit about me." },
  { sel: "#principles ol", say: "How I work with AI." },
  {
    sel: "#stack button[aria-pressed]",
    say: "Watch this.",
    act: async (el) => {
      el.click();
      await sleep(3400); // let the pile settle
      if (aborted) return;
      say("…and back up.");
      document.querySelector<HTMLElement>("#stack button[aria-pressed]")?.click();
      await sleep(1500);
    },
  },
  { sel: "#contact form", say: "Four quick questions and you can reach me." },
];

let aborted = false;
let reduce = false;
let cursor: HTMLDivElement | null = null;
let bubble: HTMLSpanElement | null = null;
let cx = 0;
let cy = 0;

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, reduce ? Math.min(ms, 600) : ms));
}

function say(text: string) {
  if (!bubble) return;
  bubble.textContent = text;
  bubble.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], {
    duration: 220,
    easing: "ease-out",
  });
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function scrollToY(y: number): Promise<void> {
  const from = window.scrollY;
  const to = Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight));
  const dist = Math.abs(to - from);
  if (reduce || dist < 2) {
    window.scrollTo(0, to);
    return Promise.resolve();
  }
  const duration = Math.min(2600, Math.max(900, dist * 1.1)); // slow, like someone reading
  const start = performance.now();
  return new Promise((resolve) => {
    const frame = (now: number) => {
      if (aborted) return resolve();
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, from + (to - from) * ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

async function moveCursor(x: number, y: number) {
  if (!cursor) return;
  const anim = cursor.animate(
    [{ transform: `translate(${cx}px, ${cy}px)` }, { transform: `translate(${x}px, ${y}px)` }],
    { duration: reduce ? 1 : 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
  );
  cx = x;
  cy = y;
  await anim.finished.catch(() => {});
}

export function startTour(onEnd: () => void): () => void {
  aborted = false;
  reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto"; // our own easing, not the CSS smooth scroll

  cursor = document.createElement("div");
  cursor.className = "tour-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML =
    '<svg viewBox="0 0 16 16" width="22" height="22"><path d="M2 1.5 14 7.2l-5.3 1.5L6.4 14z" fill="#f4f4f5" stroke="#0a0a0b" stroke-width="1"/></svg><span class="tour-bubble"></span>';
  bubble = cursor.querySelector(".tour-bubble");
  document.body.append(cursor);

  const stop = document.createElement("button");
  stop.type = "button";
  stop.className = "tour-stop";
  stop.innerHTML = '<span class="tour-spin">✻</span> agent is giving a tour <span class="tour-stop-x">stop</span>';
  document.body.append(stop);

  cx = window.innerWidth * 0.5;
  cy = window.innerHeight * 0.35;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;

  const onUser = (e: Event) => {
    if (e.target instanceof Node && stop.contains(e.target)) return;
    end();
  };
  const listeners: [string, EventListener][] = [
    ["wheel", onUser],
    ["touchstart", onUser],
    ["keydown", onUser],
  ];
  listeners.forEach(([t, fn]) => window.addEventListener(t, fn, { passive: true }));
  stop.addEventListener("click", () => end());

  let ended = false;
  function end() {
    if (ended) return;
    ended = true;
    aborted = true;
    listeners.forEach(([t, fn]) => window.removeEventListener(t, fn));
    root.style.scrollBehavior = prevBehavior;
    cursor?.remove();
    stop.remove();
    cursor = null;
    bubble = null;
    onEnd();
  }

  (async () => {
    say("Let me show you around.");
    await sleep(1200);
    for (const s of steps) {
      if (aborted) return;
      const el = document.querySelector<HTMLElement>(s.sel);
      if (!el) continue;
      say("");
      await scrollToY(window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.3);
      if (aborted) return;
      await sleep(250); // let the section's reveal start
      const r = el.getBoundingClientRect();
      await moveCursor(r.left + Math.min(r.width * 0.35, 180), r.top + Math.min(r.height * 0.5, 36));
      if (aborted) return;
      say(s.say);
      if (s.act) await s.act(el);
      await sleep(1800);
    }
    if (aborted) return;
    say("");
    await scrollToY(document.documentElement.scrollHeight);
    await moveCursor(window.innerWidth * 0.5, window.innerHeight * 0.6);
    say("That's everything. Your turn.");
    await sleep(2400);
    end();
  })();

  return end;
}

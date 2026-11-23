/**
 * Guided tour run by the "agent". It moves around each section, pointing at
 * the things that matter (with a focus ring), scrolling only when the next
 * target is out of view; drops and lifts the stack; then fills in the
 * contact form with an example request and plays the "sent" animation.
 * It never sends anything, and it clears the demo answers when it ends.
 * Any wheel, touch, key or a click on "stop" hands control back at once.
 * Plain DOM (no React), torn down completely.
 */

/** Contact listens for this and empties the form (see Contact.tsx). */
export const CONTACT_RESET_EVENT = "contact:reset";
/** Contact flies the paper plane for a pretend send; nothing is sent. */
export const CONTACT_DEMO_SEND_EVENT = "contact:demo-send";

type Say = string | ((el: HTMLElement) => string);

interface Beat {
  sel: string;
  /** Which match to use when the selector finds several (default 0). */
  nth?: number;
  /** Or: the first match whose text contains this. */
  text?: string;
  say: Say;
  /** Pause after arriving, ms. */
  hold?: number;
  act?: (el: HTMLElement) => Promise<void>;
}

// What the agent types. It reads like a normal request; it is never sent
// (the "send" below only plays the animation) and the form is cleared after.
const demo = {
  reason: "A product to build",
  what: "A booking app for a campus barber: web and mobile, with Paystack payments.",
  timeline: "This month",
  who: "Ada, campus startup",
};

// Built on demand (the page must exist), never at import time.
const buildBeats = (): Beat[] => [
  // Work
  { sel: "#work h3", say: "StudEx. I built it solo." },
  { sel: "#work .polaroid", say: "It's live at studex.com.ng", hold: 1300 },
  { sel: "#work article ul li", text: "Transfer API", say: "Vendor payouts, retried automatically." },
  { sel: '#work figure[aria-label^="StudEx architecture"]', say: "One API serves web and mobile." },
  { sel: '#work a[href="/work/studex"]', say: "The full case study is here." },
  { sel: "#work article h3", text: "InterviewIQ", say: "InterviewIQ, an AI interview coach." },
  { sel: "#work .polaroid", nth: 1, say: "Try the live demo." },
  // About
  { sel: "#about h2", say: "A bit about me." },
  { sel: "#about p", text: "whoami", say: "whoami: that's me." },
  { sel: "#about p", text: "Claude Code daily", say: "Claude Code daily. I still read every diff." },
  // How I work: visit every card
  ...[0, 1, 2, 3].map((n) => ({
    sel: "#principles li",
    nth: n,
    say: (el: HTMLElement) => el.querySelector("h3")?.textContent ?? "",
    hold: 1200,
  })),
  // Stack
  { sel: "#stack .stack-tile", nth: 0, say: "TypeScript everywhere." },
  { sel: "#stack .stack-tile", text: "Claude Code", say: "My daily driver." },
  {
    sel: "#stack button[aria-pressed]",
    say: "Watch this.",
    act: async (el) => {
      click(el);
      await sleep(3400); // let the pile settle
      if (aborted) return;
      say("…and back up.");
      const again = document.querySelector<HTMLElement>("#stack button[aria-pressed]");
      if (again) click(again);
      await sleep(2200);
    },
  },
  // Contact: fill in an example request and play the send (nothing is sent)
  {
    sel: `#contact input[name="reason"][value="${demo.reason}"] + span`,
    say: "Let me fill this in for you.",
    act: async (el) => {
      click(el);
      await sleep(500);
    },
  },
  {
    sel: "#contact textarea",
    say: "Describing the project…",
    act: async (el) => typeInto(el as HTMLTextAreaElement, demo.what),
  },
  {
    sel: `#contact input[name="timeline"][value="${demo.timeline}"] + span`,
    say: "Timeline.",
    act: async (el) => {
      click(el);
      await sleep(400);
    },
  },
  {
    sel: "#contact #who",
    say: "And who it's from.",
    act: async (el) => typeInto(el as HTMLInputElement, demo.who),
  },
  {
    sel: '#contact button[type="submit"]',
    say: "Sending…",
    act: async (el) => {
      // A pretend send: same plane as a real one, but no email app, no email.
      cursor?.animate(
        [{ transform: `translate(${cx}px, ${cy}px)` }, { transform: `translate(${cx}px, ${cy}px) scale(0.8)` }, { transform: `translate(${cx}px, ${cy}px)` }],
        { duration: 220 },
      );
      el.animate([{ transform: "scale(1)" }, { transform: "scale(0.94)" }, { transform: "scale(1)" }], { duration: 220 });
      window.dispatchEvent(new Event(CONTACT_DEMO_SEND_EVENT));
      await sleep(1900);
      if (aborted) return;
      say("Sent ✈");
    },
    hold: 2400,
  },
];

let aborted = false;
let reduce = false;
let cursor: HTMLDivElement | null = null;
let bubble: HTMLSpanElement | null = null;
let focused: HTMLElement | null = null;
let cx = 0;
let cy = 0;

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, reduce ? Math.min(ms, 500) : ms));
}

function say(text: string) {
  if (!bubble) return;
  bubble.textContent = text;
  if (text) bubble.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 220 });
}

function focusOn(el: HTMLElement | null) {
  focused?.classList.remove("tour-focus");
  focused = el;
  el?.classList.add("tour-focus");
}

/** A visible "click": the cursor dips, then the element is clicked. */
function click(el: HTMLElement) {
  cursor?.animate(
    [{ transform: `translate(${cx}px, ${cy}px)` }, { transform: `translate(${cx}px, ${cy}px) scale(0.8)` }, { transform: `translate(${cx}px, ${cy}px)` }],
    { duration: 220 },
  );
  el.click();
}

/** Types into a React-controlled field: native setter + input event per char. */
async function typeInto(el: HTMLInputElement | HTMLTextAreaElement, text: string) {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const set = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (!set) return;
  for (let i = 1; i <= text.length; i++) {
    if (aborted) return;
    set.call(el, text.slice(0, i));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(reduce ? 0 : 28);
  }
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
  const duration = Math.min(2400, Math.max(800, dist * 1.1)); // slow, like someone reading
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

/** Glide to (x, y) along a slight arc, with speed scaled to distance. */
async function moveCursor(x: number, y: number) {
  if (!cursor) return;
  const dist = Math.hypot(x - cx, y - cy);
  const mx = (x + cx) / 2;
  const my = (y + cy) / 2 - Math.min(60, dist * 0.15);
  const anim = cursor.animate(
    [
      { transform: `translate(${cx}px, ${cy}px)` },
      { transform: `translate(${mx}px, ${my}px)` },
      { transform: `translate(${x}px, ${y}px)` },
    ],
    { duration: reduce ? 1 : Math.min(1100, 380 + dist * 0.9), easing: "cubic-bezier(0.45, 0, 0.25, 1)", fill: "forwards" },
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
    focusOn(null);
    cursor?.remove();
    stop.remove();
    cursor = null;
    bubble = null;
    // Never leave the fake demo answers in the visitor's form.
    window.dispatchEvent(new Event(CONTACT_RESET_EVENT));
    onEnd();
  }

  (async () => {
    say("Let me show you around.");
    await sleep(1200);
    for (const b of buildBeats()) {
      if (aborted) return;
      const all = Array.from(document.querySelectorAll<HTMLElement>(b.sel));
      const el = b.text ? all.find((e) => e.textContent?.includes(b.text!)) : all[b.nth ?? 0];
      if (!el) continue;

      // Scroll only when the target isn't comfortably in view.
      let r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.14 || r.bottom > vh * 0.82) {
        say("");
        focusOn(null);
        await scrollToY(window.scrollY + r.top - vh * 0.32);
        if (aborted) return;
        await sleep(200);
        r = el.getBoundingClientRect();
      }

      // Leave the last thing before flying to the next, so the bubble never
      // points at the wrong element mid-flight.
      say("");
      focusOn(null);
      await moveCursor(r.left + Math.min(r.width * 0.4, 160), r.top + Math.min(r.height * 0.55, 34));
      if (aborted) return;
      focusOn(el);
      say(typeof b.say === "function" ? b.say(el) : b.say);
      if (b.act) await b.act(el);
      if (aborted) return;
      await sleep(b.hold ?? 950);
    }
    if (aborted) return;
    focusOn(null);
    say("");
    await scrollToY(document.documentElement.scrollHeight);
    await moveCursor(window.innerWidth * 0.5, window.innerHeight * 0.55);
    say("That's everything. Your turn.");
    await sleep(2400);
    end();
  })();

  return end;
}

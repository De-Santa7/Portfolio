"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, personal, socials } from "@/data/portfolio";

function Chips({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            className="peer sr-only"
          />
          <span className="inline-block rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:border-accent-line hover:text-fg peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

function Question({ n, label, hint, children }: { n: number; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_1fr]">
      <span className="font-mono text-sm text-accent" aria-hidden="true">
        0{n}
      </span>
      <div className="min-w-0">
        <legend className="mb-4 text-lg font-medium text-fg">
          {label}
          {hint && <span className="ml-2 text-sm font-normal text-muted">{hint}</span>}
        </legend>
        {children}
      </div>
    </fieldset>
  );
}

const field =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

export function Contact() {
  const [reason, setReason] = useState("");
  const [what, setWhat] = useState("");
  const [timeline, setTimeline] = useState("");
  const [who, setWho] = useState("");
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const ready = reason !== "" && what.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const subject = `${reason}: ${what.trim().slice(0, 60)}${what.trim().length > 60 ? "…" : ""}`;
    const body = [
      `Hi ${personal.shortName},`,
      "",
      `What brings me here: ${reason}`,
      `What it is: ${what.trim()}`,
      `Timeline: ${timeline || "Not sure yet"}`,
      "",
      who.trim() ? `— ${who.trim()}` : "",
    ].join("\n");
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is visible on the page anyway */
    }
  }

  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Contact"
          title="Tell me what you're working on."
          intro={
            <>
              Four quick questions, then your email app opens with a draft you can edit before sending.
              {personal.replyPromise && <> {personal.replyPromise}</>}
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <FadeUp>
            <form onSubmit={submit} className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
              <Question n={1} label="What brings you here?">
                <Chips name="reason" options={contact.reasons} value={reason} onChange={setReason} />
              </Question>

              <Question n={2} label="What is it, in a line or two?">
                <label htmlFor="what" className="sr-only">
                  Describe it
                </label>
                <textarea
                  id="what"
                  required
                  rows={3}
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                  placeholder="e.g. A frontend role on a payments team, or an app for…"
                  className={`${field} resize-y`}
                />
              </Question>

              <Question n={3} label="Timeline?" hint="optional">
                <Chips name="timeline" options={contact.timelines} value={timeline} onChange={setTimeline} />
              </Question>

              <Question n={4} label="Who are you?" hint="optional">
                <label htmlFor="who" className="sr-only">
                  Your name and company
                </label>
                <input
                  id="who"
                  type="text"
                  autoComplete="name"
                  value={who}
                  onChange={(e) => setWho(e.target.value)}
                  placeholder="Your name, company"
                  className={field}
                />
              </Question>

              <div className="mt-2 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted" aria-live="polite">
                  {opened
                    ? "Your email app should be open. Nothing happened? Use the address on the right."
                    : ready
                      ? "Ready. You'll review the email before it's sent."
                      : "Answer 1 and 2 to continue."}
                </p>
                <button
                  type="submit"
                  disabled={!ready}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Mail className="size-4" />
                  Write the email
                </button>
              </div>
            </form>
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col gap-8">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">Or write directly</p>
              <a href={`mailto:${personal.email}`} className="break-all text-lg text-fg underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">
                {personal.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">Elsewhere</p>
              <ul className="divide-y divide-line border-y border-line">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-4 text-fg transition-colors hover:text-accent"
                      >
                        {s.label}
                        <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </a>
                    </li>
                  ))}
                <li>
                  <a
                    href={personal.cv}
                    download={personal.cvFilename}
                    className="group flex items-center justify-between py-4 text-fg transition-colors hover:text-accent"
                  >
                    CV (PDF)
                    <ArrowUpRight className="size-4 rotate-90 text-muted group-hover:text-accent" />
                  </a>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

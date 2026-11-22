"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { personal } from "@/data/portfolio";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "How I work", href: "/#principles" },
  { label: "Stack", href: "/#stack" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-fg" onClick={() => setOpen(false)}>
          {personal.shortName.toLowerCase()}
          <span className="text-accent">_</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get in touch
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-full border border-line-strong text-fg md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
          <div id="mobile-menu" className="h-[calc(100dvh-4rem)] border-t border-line bg-bg md:hidden">
            <ul className="container-page flex flex-col gap-1 pt-6">
              {[...links, { label: "Contact", href: "/#contact" }].map((l, i) => (
                <li key={l.href} className="animate-rise" style={{ animationDelay: `${0.04 * i}s` }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-2xl font-semibold tracking-tight text-fg"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </header>
  );
}

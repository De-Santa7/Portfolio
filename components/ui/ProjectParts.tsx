import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { ProjectLink, Stat, Tool } from "@/data/portfolio";
import { iconPath } from "@/lib/icons";
import { TechIcon } from "./TechIcon";
import { Todo } from "./Todo";

/** Shared building blocks for project cards and case studies. Server components. */

export function Stats({ stats }: { stats: Stat[] }) {
  const isProd = process.env.NODE_ENV === "production";
  const visible = isProd ? stats.filter((s) => s.value !== null) : stats;
  if (visible.length === 0) return null;
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {visible.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-surface-2 px-4 py-3">
          <dt className="text-xs text-muted">{s.label}</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg">
            {s.value ?? <Todo>real number</Todo>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StackRow({ tools }: { tools: Tool[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {tools.map((t) => (
        <li
          key={t.name}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted"
        >
          <TechIcon name={t.name} path={iconPath(t.icon)} className="size-3.5" />
          {t.name}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ links, skip }: { links: ProjectLink[]; skip?: ProjectLink["kind"] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {links
        .filter((l) => l.kind !== skip)
        .map((l) => {
          if (!l.href) {
            return (
              <li key={l.label}>
                <Todo>{l.label} link</Todo>
              </li>
            );
          }
          if (l.kind === "case-study") {
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Read the {l.label.toLowerCase()}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          }
          const Icon = l.kind === "repo" ? Github : ArrowUpRight;
          return (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {l.kind === "repo" && <Icon className="size-4" />}
                {l.label}
                {l.kind === "live" && <Icon className="size-4" />}
              </a>
            </li>
          );
        })}
    </ul>
  );
}

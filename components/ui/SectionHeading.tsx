import { FadeUp } from "./FadeUp";

/** Mono index label + large heading + optional intro line. */
export function SectionHeading({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <FadeUp className="mb-12 md:mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </FadeUp>
  );
}

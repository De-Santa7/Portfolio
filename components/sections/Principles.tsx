import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/data/portfolio";

export function Principles() {
  return (
    <section id="principles" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="How I work"
          title="Rules I actually follow when building with AI."
          intro="AI makes me faster. These are the habits that keep faster from turning into sloppier."
        />

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {principles.map((p, i) => (
            <FadeUp
              as="li"
              key={p.title}
              delay={0.06 * i}
              className="group relative bg-bg p-7 transition-colors hover:bg-surface sm:p-9"
            >
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{p.body}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}

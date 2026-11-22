import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, personal } from "@/data/portfolio";

export function About() {
  const facts = [
    { label: "Now", value: about.current },
    { label: "Focus", value: "Full-stack products, AI-assisted development, automation" },
    { label: "Based in", value: `${personal.location} · ${personal.timezone}` },
  ];

  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="02" label="About" title="Product-minded, careful with the details." />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <FadeUp>
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-4 py-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{f.label}</dt>
                  <dd className={f.label === "Now" ? "font-medium text-fg" : "text-fg/90"}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <FadeUp key={i} delay={0.05 * i}>
                <p
                  className={`leading-relaxed ${
                    i === 0 ? "text-xl text-fg md:text-2xl md:leading-snug" : "text-base text-muted md:text-lg"
                  }`}
                >
                  {p}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

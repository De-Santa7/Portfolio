import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Prompt, Terminal } from "@/components/ui/Terminal";
import { about, personal } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading index="02" label="About" title="Product-minded, careful with the details." />

        <FadeUp>
          <Terminal title={`zitere@portfolio: ~ (about)`} className="max-w-4xl">
            <Prompt>whoami</Prompt>
            <p className="text-fg">
              {personal.name} <span className="text-muted">·</span> {personal.role.toLowerCase()}
            </p>

            <Prompt>cat now.txt</Prompt>
            <p className="text-fg">{about.current}</p>

            <Prompt>cat about.md</Prompt>
            <div className="space-y-3 text-muted">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-fg" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <Prompt>echo $LOCATION</Prompt>
            <p className="text-fg">
              {personal.location} <span className="text-muted">({personal.timezone})</span>
            </p>

            <Prompt>
              <span className="inline-block animate-blink text-accent" aria-hidden="true">
                ▍
              </span>
            </Prompt>
          </Terminal>
        </FadeUp>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeUp } from "@/components/ui/FadeUp";
import { Architecture } from "@/components/ui/Architecture";
import { TapedShot } from "@/components/ui/TapedShot";
import { ProjectLinks, StackRow, Stats } from "@/components/ui/ProjectParts";
import { projects } from "@/data/portfolio";

type Params = { params: Promise<{ slug: string }> };

const withCaseStudy = projects.filter((p) => p.caseStudy);

export const dynamicParams = false;

export function generateStaticParams() {
  return withCaseStudy.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = withCaseStudy.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} case study`;
  return {
    title,
    description: `${project.tagline} ${project.summary}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.tagline, url: `/work/${project.slug}`, type: "article" },
  };
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <FadeUp as="section" className="grid gap-6 border-t border-line py-14 md:grid-cols-[14rem_1fr] md:gap-12 md:py-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span> / {title}
      </h2>
      <div>{children}</div>
    </FadeUp>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = withCaseStudy.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;

  return (
    <>
      <Navbar />
      <main id="main" className="pt-28 md:pt-36">
        <article className="container-page">
          <Link href="/#work" className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent">
            <ArrowLeft className="size-3.5" /> All work
          </Link>

          <header className="grid gap-12 pb-14 md:pb-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
            <p className="hero-rise mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Case study</p>
            <h1 className="text-5xl font-semibold tracking-tight text-fg md:text-7xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-balance text-xl leading-snug text-fg/90 md:text-2xl">{project.tagline}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">{project.summary}</p>

            <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{m.label}</dt>
                  <dd className="mt-1 text-fg">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <ProjectLinks links={project.links} skip="case-study" />
            </div>
            </div>
            <div className="hero-rise px-4 [--d:0.2s]">
              <TapedShot file={project.shot.file} title={project.title} subtitle={project.shot.subtitle} caption={project.shot.caption} priority />
            </div>
          </header>

          <Block index="01" title="The problem">
            <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-fg/90">
              {cs.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>

          <Block index="02" title="What I built">
            <ul className="max-w-2xl space-y-4">
              {cs.built.map((b) => (
                <li key={b} className="flex gap-4 leading-relaxed text-fg/90">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-3xl">
              <Stats stats={project.stats} />
            </div>
          </Block>

          <Block index="03" title="Architecture">
            <div className="max-w-3xl">
              <Architecture />
            </div>
          </Block>

          <Block index="04" title="Key decisions">
            <ol className="max-w-3xl space-y-10">
              {cs.decisions.map((d, i) => (
                <li key={d.title} className="grid gap-2 sm:grid-cols-[2.5rem_1fr]">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg">{d.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block index="05" title="Stack">
            <StackRow tools={project.stack} />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              Also: Django REST Framework, JWT auth, Zustand, APScheduler, Neon, Render, Cloudflare and Firebase
              Cloud Messaging for push.
            </p>
          </Block>

          <div className="border-t border-line py-14 md:py-20">
            <p className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">Want something like this built?</p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

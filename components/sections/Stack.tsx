import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DragTiles } from "@/components/ui/DragTiles";
import { TechIcon } from "@/components/ui/TechIcon";
import { toolGroups } from "@/data/portfolio";
import { iconPath } from "@/lib/icons";

export function Stack() {
  return (
    <section id="stack" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Stack"
          title="What I build with."
          intro={
            <>
              Grouped by job. <span className="mx-1 inline-block size-1.5 rounded-full bg-accent align-middle" />
              marks tools used in a project on this page.
              <span className="hidden [@media(pointer:fine)]:inline"> Drag the tiles if you like, they come back.</span>
            </>
          }
        />

        <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
          {toolGroups.map((g, i) => (
            <FadeUp key={g.category} delay={0.04 * i}>
              <h3 className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {g.category}
                <span className="h-px flex-1 bg-line" />
              </h3>
              <DragTiles className="flex flex-wrap gap-2.5">
                {g.tools.map((t) => {
                  const used = t.usedIn && t.usedIn.length > 0;
                  return (
                    <li
                      key={t.name}
                      title={used ? `Used in ${t.usedIn!.join(" & ")}` : undefined}
                      className="stack-tile relative flex select-none items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-fg/90 hover:border-accent-line hover:text-fg"
                    >
                      <TechIcon name={t.name} path={iconPath(t.icon)} className="size-[18px] shrink-0" />
                      {t.name}
                      {used && (
                        <>
                          <span aria-hidden="true" className="ml-0.5 size-1.5 rounded-full bg-accent" />
                          <span className="sr-only">(used in {t.usedIn!.join(" and ")})</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </DragTiles>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

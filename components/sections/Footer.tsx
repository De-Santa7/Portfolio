import { about, personal, socials } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <p className="container-page mb-8 text-balance text-lg italic text-fg/80 md:text-xl">
        <span className="text-accent">&ldquo;</span>
        {about.motto}
        <span className="text-accent">&rdquo;</span>
      </p>
      <div className="container-page flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

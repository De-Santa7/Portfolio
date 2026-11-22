import { iconPath } from "@/lib/icons";
import { TechIcon } from "./TechIcon";

/** StudEx system diagram, built from HTML so it reflows on any screen. Server component. */

function Node({
  title,
  detail,
  icon,
  name,
  emphasis = false,
}: {
  title: string;
  detail: string;
  icon?: string;
  name: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 items-start gap-3 rounded-xl border p-3 ${
        emphasis ? "border-accent-line bg-accent-soft" : "border-line bg-surface-2"
      }`}
    >
      <TechIcon name={name} path={iconPath(icon)} className={`mt-0.5 size-4 shrink-0 ${emphasis ? "text-accent" : "text-muted"}`} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">{title}</p>
        <p className="text-xs leading-snug text-muted">{detail}</p>
      </div>
    </div>
  );
}

function Link({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2 pl-5" aria-hidden="true">
      <span className="h-6 w-px bg-accent-line" />
      <span className="font-mono text-[11px] text-muted">{label}</span>
    </div>
  );
}

export function Architecture({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      aria-label="StudEx architecture: web and mobile clients call one Django REST API, which uses Postgres, Paystack, Cloudinary and Firebase Cloud Messaging."
      className="rounded-2xl border border-line bg-bg/60 p-4 sm:p-5"
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Architecture <span className="text-muted">· Cloudflare DNS in front</span>
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        <Node name="Next.js" icon="nextdotjs" title="Web app" detail="Next.js + TypeScript · Vercel" />
        <Node name="Expo" icon="expo" title="Mobile app" detail="Expo / React Native · iOS & Android" />
      </div>

      <Link label="HTTPS · JWT" />

      <Node
        name="Django"
        icon="django"
        title="Django REST API"
        detail="Business rules, orders, payouts · Render"
        emphasis
      />
      <div className="mt-2 rounded-xl border border-dashed border-line-strong px-3 py-2 font-mono text-[11px] leading-relaxed text-muted">
        <span className="text-accent">APScheduler</span> · auto-complete orders after 7 days · retry failed transfers
      </div>

      <Link label="reads / writes / calls" />

      <div className={`grid gap-2 ${compact ? "grid-cols-2" : "sm:grid-cols-2"}`}>
        <Node name="PostgreSQL" icon="postgresql" title="Postgres" detail="Neon" />
        <Node name="Paystack" title="Paystack" detail="Checkout · held funds · Transfer API" />
        <Node name="Cloudinary" icon="cloudinary" title="Cloudinary" detail="Product & store images" />
        <Node name="Firebase" icon="firebase" title="FCM" detail="Push notifications" />
      </div>
    </figure>
  );
}

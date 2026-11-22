/**
 * Visible marker for a fact that still needs a real value. Rendered only in
 * `next dev`; production builds render nothing, so a placeholder can never ship.
 */
export function Todo({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-accent-line px-2 py-0.5 font-mono text-[11px] text-accent">
      TODO · {children}
    </span>
  );
}

/**
 * Renders a simple-icons path, or a letter tile when a tool has no official
 * logo (Paystack, Zustand, Groq, APScheduler). Takes the path as a prop so it
 * works in both server and client components.
 */
export function TechIcon({
  name,
  path,
  className = "size-4",
}: {
  name: string;
  path: string | null;
  className?: string;
}) {
  if (path) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-grid place-items-center rounded-[4px] border border-current font-mono text-[0.6em] font-bold leading-none`}
    >
      {name[0]}
    </span>
  );
}

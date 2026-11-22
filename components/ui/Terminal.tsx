/** A terminal window frame. Server component; content is plain, selectable text. */
export function Terminal({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-5 font-mono text-[13.5px] leading-relaxed sm:p-7 sm:text-[14.5px]">{children}</div>
    </div>
  );
}

/** One `user@host:~$ command` line. */
export function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 first:mt-0">
      <span className="text-accent">zitere@portfolio</span>
      <span className="text-muted">:~$ </span>
      <span className="text-fg">{children}</span>
    </p>
  );
}

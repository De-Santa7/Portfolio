import type { CSSProperties } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}

/**
 * Fades and lifts its children into view once, on scroll.
 * Server component: it only marks the element. <RevealObserver/> (one tiny
 * client script in the layout) does the observing. Without JS, content is
 * simply visible.
 */
export function FadeUp({ children, delay = 0, className, as: Tag = "div" }: FadeUpProps) {
  return (
    <Tag data-reveal="" className={className} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

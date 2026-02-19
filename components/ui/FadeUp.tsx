"use client";

import { motion, type Variants } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Distance to travel upward on enter (default 28px) */
  distance?: number;
}

const variant = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
});

/**
 * Reusable scroll-triggered fade-and-slide-up animation wrapper.
 * Wraps any content and animates it into view once — no repeat.
 *
 * Usage:
 *   <FadeUp delay={0.1}>
 *     <p>Your content here</p>
 *   </FadeUp>
 */
export function FadeUp({ children, delay = 0, className, distance = 28 }: FadeUpProps) {
  return (
    <motion.div
      variants={variant(distance)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  variant: "solid" | "outline";
  children: React.ReactNode;
  href?: string;
  download?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

/**
 * Reusable animated button component.
 * - solid:   filled orange accent, glowing shadow on hover
 * - outline: transparent with border, brightens on hover
 */
export function Button({
  variant,
  children,
  href,
  download,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer select-none";

  const variants = {
    solid:
      "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

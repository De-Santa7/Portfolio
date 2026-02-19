import type { Config } from "tailwindcss";

/**
 * ╔══════════════════════════════════════════════════════╗
 * ║          DESIGN TOKEN SYSTEM — Edit Here             ║
 * ╠══════════════════════════════════════════════════════╣
 * ║  All design decisions live in this file.             ║
 * ║  Change a value here, it updates the whole site.     ║
 * ╚══════════════════════════════════════════════════════╝
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ─── Accent Color (ONE — used sparingly) ────────────────
      colors: {
        accent: {
          DEFAULT: "#f97316", // 👉 CHANGE THIS to change the whole accent
          hover: "#ea580c",
          muted: "rgba(249,115,22,0.12)",
          border: "rgba(249,115,22,0.25)",
          glow: "rgba(249,115,22,0.2)",
        },
      },

      // ─── Typography ─────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      // ─── Border Radius ──────────────────────────────────────
      borderRadius: {
        card: "1rem",     // 16px — all cards
        badge: "9999px",  // fully rounded — pills and badges
      },

      // ─── Spacing ────────────────────────────────────────────
      spacing: {
        section: "6rem", // 96px — py-section for all sections
      },

      // ─── Box Shadows ────────────────────────────────────────
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        glow: "0 0 30px rgba(249,115,22,0.2), 0 0 60px rgba(249,115,22,0.08)",
        "glow-sm": "0 0 12px rgba(249,115,22,0.3)",
        "button-accent": "0 4px 20px rgba(249,115,22,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;

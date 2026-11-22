import { ImageResponse } from "next/og";
import { hero, personal } from "@/data/portfolio";

export const alt = `${personal.name}, ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, generated at build time. Keep colours in sync with globals.css.
export default function OpengraphImage() {
  const accent = "#d97757";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a1a1aa" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
          {personal.name}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
          <span>{hero.headline.before}</span>
          <span style={{ color: accent }}>{hero.headline.highlight}</span>
          <span>{hero.headline.after}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a1a1aa" }}>
          <span>{personal.role}</span>
          <span style={{ color: accent }}>StudEx · case study inside</span>
        </div>
      </div>
    ),
    size,
  );
}

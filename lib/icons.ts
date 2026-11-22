// Server-only icon registry. Import this from Server Components only, and
// pass the resulting `path` strings down to client components as props, so
// simple-icons never ends up in the browser bundle.
import {
  siClaude,
  siCloudflare,
  siCloudinary,
  siDjango,
  siExpo,
  siFirebase,
  siFramer,
  siGithub,
  siNeon,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRender,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

const registry: Record<string, { path: string }> = {
  claude: siClaude,
  cloudflare: siCloudflare,
  cloudinary: siCloudinary,
  django: siDjango,
  expo: siExpo,
  firebase: siFirebase,
  framer: siFramer,
  github: siGithub,
  neon: siNeon,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  render: siRender,
  supabase: siSupabase,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
};

/** SVG path for a 24×24 viewBox, or null when the tool has no official logo. */
export function iconPath(key?: string): string | null {
  return key ? registry[key]?.path ?? null : null;
}

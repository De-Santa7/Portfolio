import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Todo } from "./Todo";

/** Finds /public/<base>.png|jpg|webp at build time. */
function findScreenshot(base: string): string | null {
  const file = ["png", "jpg", "webp"].map((ext) => `${base}.${ext}`).find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));
  return file ? `/${file}` : null;
}

/**
 * A screenshot taped to the page like a polaroid. Server component.
 * Falls back to a typographic card until the screenshot file exists.
 */
export function TapedShot({
  file,
  title,
  subtitle,
  caption,
  priority = false,
}: {
  /** Base filename in /public, without extension. */
  file: string;
  title: string;
  subtitle: string;
  caption: string;
  priority?: boolean;
}) {
  const src = findScreenshot(file);

  return (
    <figure className="polaroid relative mx-auto w-full max-w-xl bg-[#f2efe8] p-2.5 pb-0 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] sm:p-3 sm:pb-0">
      <span aria-hidden="true" className="tape tape-left" />
      <span aria-hidden="true" className="tape tape-right" />

      <div className="relative aspect-[2/1] overflow-hidden bg-[#e6e2d9]">
        {src ? (
          <Image
            src={src}
            alt={`${title}: ${subtitle}`}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#e9e4da] to-[#d9d2c4] p-6 text-center">
            <div>
              <p className="text-4xl font-bold tracking-tight text-[#1c1917] sm:text-5xl">{title}</p>
              <p className="mt-2 text-sm text-[#44403c]">{subtitle}</p>
              <div className="mt-3">
                <Todo>save screenshot as public/{file}.png</Todo>
              </div>
            </div>
          </div>
        )}
      </div>

      <figcaption className="px-1 py-3 text-center font-mono text-xs text-[#44403c] sm:py-4">{caption}</figcaption>
    </figure>
  );
}

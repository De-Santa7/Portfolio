export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "File must be JPEG, PNG, or WebP" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 4 MB)" },
      { status: 400 }
    );
  }

  try {
    const blob = await put("avatar", file, {
      access: "private",
      addRandomSuffix: false,
      contentType: file.type,
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[upload-image]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

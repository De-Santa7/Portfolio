export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("cv");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 4 MB)" },
      { status: 400 }
    );
  }

  try {
    const blob = await put("cv", file, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type || "application/octet-stream",
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[upload-cv]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

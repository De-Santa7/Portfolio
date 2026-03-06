export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const ALLOWED_KEYS = ["avatar", "cv"];

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { key } = body as { key?: string };

  if (!key || !ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  try {
    const { blobs } = await list({ prefix: key, limit: 1 });
    if (blobs.length > 0) {
      await del(blobs[0].url);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

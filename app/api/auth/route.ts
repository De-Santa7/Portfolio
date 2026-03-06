export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { computeToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    // Artificial delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = computeToken();
  const isProd = process.env.NODE_ENV === "production";

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 86400,
    secure: isProd,
    path: "/",
  });

  return response;
}

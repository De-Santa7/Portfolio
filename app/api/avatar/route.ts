export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "avatar", limit: 1 });

    if (blobs.length > 0) {
      const res = await fetch(blobs[0].downloadUrl, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });

      if (!res.ok) {
        return new NextResponse(null, { status: 404 });
      }

      const buffer = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") ?? "image/jpeg";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache, no-store",
        },
      });
    }
  } catch {
    // Fall through to 404
  }

  return new NextResponse(null, { status: 404 });
}

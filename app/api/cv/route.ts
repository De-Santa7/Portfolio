export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

const EXTENSIONS: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/vnd.oasis.opendocument.text": ".odt",
};

export async function GET(request: NextRequest) {
  try {
    const { blobs } = await list({ prefix: "cv", limit: 1 });

    if (blobs.length > 0) {
      const blobRes = await fetch(blobs[0].downloadUrl, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      const buffer = await blobRes.arrayBuffer();
      const contentType = blobRes.headers.get("content-type") ?? "application/octet-stream";
      const ext = EXTENSIONS[contentType] ?? "";
      const filename = `Ugochukwuzitere-Mbama-CV${ext}`;

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-cache, no-store",
        },
      });
    }
  } catch {
    // Fall through to static fallback
  }

  return NextResponse.redirect(new URL("/cv.pdf", request.url));
}

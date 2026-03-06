import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_NAME = "admin_session";

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var is not set");
  return pw;
}

export function computeToken(): string {
  return createHmac("sha256", getPassword())
    .update("portfolio-admin")
    .digest("hex");
}

export function verifyToken(candidate: string): boolean {
  if (!candidate) return false;
  try {
    const expected = Buffer.from(computeToken(), "utf8");
    const actual = Buffer.from(candidate, "utf8");
    if (expected.length !== actual.length) return false;
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

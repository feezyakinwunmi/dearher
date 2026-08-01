import { SurpriseData } from "./types";

/**
 * There is no database, so a "shareable link" has to carry the whole
 * page inside the URL itself. We JSON-encode the page data, UTF-8
 * safe base64 it, and make it URL-safe.
 *
 * Trade-off worth knowing: if photos are attached, they're stored as
 * base64 data URLs, which makes the link long — sometimes long enough
 * that some messaging apps truncate it. For a production version,
 * upload photos to real storage (S3, Cloudinary, etc.) and put the
 * resulting image URLs in `photos` instead of data URLs; the link
 * then stays short no matter how many photos are added.
 */

export function encodeShareData(data: SurpriseData): string {
  const json = JSON.stringify(data);
  const base64 =
    typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, "utf-8").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeShareData(encoded: string): SurpriseData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(escape(atob(padded)))
        : Buffer.from(padded, "base64").toString("utf-8");
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object" || !parsed.letter) return null;
    return parsed as SurpriseData;
  } catch {
    return null;
  }
}

/** Rough estimate of the final URL length, so the UI can warn about long links. */
export function estimateLinkLength(data: SurpriseData): number {
  return encodeShareData(data).length + 40;
}

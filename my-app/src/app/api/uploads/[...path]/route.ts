import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { join } from "path";
import { existsSync, statSync, createReadStream } from "fs";
import { Readable } from "stream";
import { NextRequest } from "next/server";
import { rateLimit, UPLOAD_RATE_LIMIT } from "@/lib/rateLimit";
import { canViewFriendResources } from "@/lib/actions/friends";

const ALLOWED_DIRS = new Set(["profiles", "entries"]);

const EXT_MIME: Record<string, string> = {
  jpg:  "image/jpeg",
  jpeg: "image/jpeg",
  png:  "image/png",
  gif:  "image/gif",
  webp: "image/webp",
  mp4:  "video/mp4",
  mov:  "video/quicktime",
  ogg:  "audio/ogg",
  wav:  "audio/wav",
  mp3:  "audio/mpeg",
};

function mimeFor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "webm") {
    return filename.startsWith("voice-") ? "audio/webm" : "video/webm";
  }
  return EXT_MIME[ext] ?? "application/octet-stream";
}

function safePath(segments: string[], base: "data" | "public"): string | null {
  if (segments.length !== 2) return null;
  const [dir, filename] = segments;
  if (!ALLOWED_DIRS.has(dir)) return null;
  if (!/^[\w.\-]+$/.test(filename)) return null;
  return base === "data"
    ? join(process.cwd(), "data", "uploads", dir, filename)
    : join(process.cwd(), "public", "uploads", dir, filename);
}

/**
 * Parse the leading `{ownerId}-` segment from an upload filename.
 * Convention established by upload routes: `${userId}-${timestamp}.${ext}`.
 * Treats the first `-` as the separator so cuids (which may contain digits) work.
 */
function parseOwnerId(filename: string): string | null {
  const dashIdx = filename.indexOf("-");
  if (dashIdx <= 0) return null;
  const candidate = filename.slice(0, dashIdx);
  if (!/^[a-z0-9]{20,30}$/i.test(candidate)) return null;
  return candidate;
}

function notFound() {
  return new Response("Not Found", { status: 404 });
}

function forbidden() {
  return new Response("Forbidden", { status: 403 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const session = await getServerSession(authOptions);
  const viewerId = (session?.user as { id?: string } | undefined)?.id;
  if (!session || !viewerId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const rl = rateLimit(`uploads:${viewerId}`, UPLOAD_RATE_LIMIT);
  if (!rl.success) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": String(rl.retryAfterSeconds) },
    });
  }

  const { path: segments } = await params;
  if (segments.length !== 2) return notFound();
  const [dir, filename] = segments;
  if (!ALLOWED_DIRS.has(dir)) return notFound();

  const ownerId = parseOwnerId(filename);
  if (!ownerId) return notFound();

  // Authorization: owner always allowed. Friends may view shared resources
  // (profile pictures; entry media visible on shared entries).
  if (ownerId !== viewerId) {
    const allowed = await canViewFriendResources(viewerId, ownerId);
    if (!allowed) return forbidden();
  }

  const primary = safePath(segments, "data");
  if (!primary) return notFound();

  // Private storage first, fall back to legacy public/ location
  const filePath = existsSync(primary)
    ? primary
    : (safePath(segments, "public") ?? primary);

  if (!existsSync(filePath)) return notFound();

  const stat        = statSync(filePath);
  const totalSize   = stat.size;
  const contentType = mimeFor(filename);

  const rangeHeader = request.headers.get("range");

  // ── Partial content (Range request from <audio>/<video>) ────────────────
  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d*)-(\d*)/);
    if (!match) {
      return new Response("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${totalSize}` },
      });
    }

    const start = match[1] ? parseInt(match[1], 10) : 0;
    const end   = match[2] ? parseInt(match[2], 10) : totalSize - 1;

    if (start > end || end >= totalSize) {
      return new Response("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${totalSize}` },
      });
    }

    const chunkSize = end - start + 1;
    const stream    = createReadStream(filePath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type":            contentType,
        "Content-Length":          String(chunkSize),
        "Content-Range":           `bytes ${start}-${end}/${totalSize}`,
        "Accept-Ranges":           "bytes",
        "Cache-Control":           "private, max-age=3600",
        "X-Content-Type-Options":  "nosniff",
      },
    });
  }

  // ── Full file ────────────────────────────────────────────────────────────
  const stream = createReadStream(filePath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type":            contentType,
      "Content-Length":          String(totalSize),
      "Accept-Ranges":           "bytes",
      "Cache-Control":           "private, max-age=3600",
      "X-Content-Type-Options":  "nosniff",
    },
  });
}

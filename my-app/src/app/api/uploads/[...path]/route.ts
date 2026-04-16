import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { join } from "path";
import { existsSync, statSync, createReadStream } from "fs";
import { Readable } from "stream";
import { NextRequest } from "next/server";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { path: segments } = await params;

  const primary = safePath(segments, "data");
  if (!primary) return new Response("Not Found", { status: 404 });

  // Private storage first, fall back to legacy public/ location
  const filePath = existsSync(primary)
    ? primary
    : (safePath(segments, "public") ?? primary);

  if (!existsSync(filePath)) return new Response("Not Found", { status: 404 });

  const stat        = statSync(filePath);
  const totalSize   = stat.size;
  const filename    = segments[segments.length - 1];
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
        "Content-Type":   contentType,
        "Content-Length": String(chunkSize),
        "Content-Range":  `bytes ${start}-${end}/${totalSize}`,
        "Accept-Ranges":  "bytes",
        "Cache-Control":  "private, max-age=3600",
      },
    });
  }

  // ── Full file ────────────────────────────────────────────────────────────
  const stream = createReadStream(filePath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type":   contentType,
      "Content-Length": String(totalSize),
      "Accept-Ranges":  "bytes",
      "Cache-Control":  "private, max-age=3600",
    },
  });
}

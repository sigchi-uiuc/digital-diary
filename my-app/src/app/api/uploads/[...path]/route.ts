import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { join } from "path";
import { existsSync, statSync, createReadStream } from "fs";
import { Readable } from "stream";

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
    // Voice recordings are named voice-<userId>-<ts>.webm; everything else is video
    return filename.startsWith("voice-") ? "audio/webm" : "video/webm";
  }
  return EXT_MIME[ext] ?? "application/octet-stream";
}

function resolvePath(segments: string[]): string | null {
  if (segments.length !== 2) return null;
  const [dir, filename] = segments;

  if (!ALLOWED_DIRS.has(dir)) return null;
  // No path traversal, no slashes, only safe characters
  if (!/^[\w.\-]+$/.test(filename)) return null;

  return join(process.cwd(), "data", "uploads", dir, filename);
}

// Fallback: legacy files still living in public/uploads (pre-migration)
function legacyPath(segments: string[]): string | null {
  if (segments.length !== 2) return null;
  const [dir, filename] = segments;
  if (!ALLOWED_DIRS.has(dir)) return null;
  if (!/^[\w.\-]+$/.test(filename)) return null;
  return join(process.cwd(), "public", "uploads", dir, filename);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { path: segments } = await params;

  const primary = resolvePath(segments);
  if (!primary) {
    return new Response("Not Found", { status: 404 });
  }

  // Try private storage first, then fall back to legacy public location
  const filePath = existsSync(primary) ? primary : (legacyPath(segments) ?? primary);

  if (!existsSync(filePath)) {
    return new Response("Not Found", { status: 404 });
  }

  const stat = statSync(filePath);
  const filename = segments[segments.length - 1];
  const contentType = mimeFor(filename);

  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream;

  return new Response(webStream, {
    headers: {
      "Content-Type":   contentType,
      "Content-Length": String(stat.size),
      "Cache-Control":  "private, max-age=3600",
    },
  });
}

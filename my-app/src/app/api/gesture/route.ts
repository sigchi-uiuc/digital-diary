import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, getClientIp, DEFAULT_API_RATE_LIMIT } from "@/lib/rateLimit";

const GESTURE_SERVER = process.env.GESTURE_SERVER_URL ?? "http://gesture-server:8000";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = (session.user as { id?: string })?.id;
    const rlKey = userId ? `gesture:${userId}` : `gesture:${getClientIp(request)}`;
    const rl = rateLimit(rlKey, DEFAULT_API_RATE_LIMIT);
    if (!rl.success) {
        return new Response("Too Many Requests", {
            status: 429,
            headers: { "Retry-After": String(rl.retryAfterSeconds) },
        });
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") === "hand" ? "hand" : "face";

    const body = await request.arrayBuffer();

    let upstream: Response;
    try {
        upstream = await fetch(`${GESTURE_SERVER}/detect?mode=${mode}`, {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body,
        });
    } catch (err) {
        console.error("[gesture] upstream fetch failed:", err);
        return Response.json({ error: "Service unavailable" }, { status: 502 });
    }

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error("[gesture] upstream error:", upstream.status, text);
        return Response.json({ error: "Service unavailable" }, { status: 502 });
    }

    const result = await upstream.json();
    return Response.json(result);
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const GESTURE_SERVER = process.env.GESTURE_SERVER_URL ?? "http://gesture-server:8000";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.arrayBuffer();

    let upstream: Response;
    try {
        upstream = await fetch(`${GESTURE_SERVER}/detect`, {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body,
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[gesture] upstream fetch failed:", msg);
        return Response.json({ error: `Cannot reach gesture server: ${msg}` }, { status: 502 });
    }

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        console.error("[gesture] upstream error:", upstream.status, text);
        return Response.json({ error: `Gesture server ${upstream.status}: ${text}` }, { status: 502 });
    }

    const result = await upstream.json();
    return Response.json(result);
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const GESTURE_SERVER = process.env.GESTURE_SERVER_URL ?? "http://gesture-server:8000";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") === "face" ? "face" : "hand";

    const body = await request.arrayBuffer();

    const upstream = await fetch(`${GESTURE_SERVER}/detect?mode=${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body,
    });

    const result = await upstream.json();
    return Response.json(result);
}

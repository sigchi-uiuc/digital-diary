import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function mimeToExt(mime?: string) {
    if (!mime) return "webm";
    if (mime.includes("webm")) return "webm";
    if (mime.includes("mpeg") || mime.includes("mp3")) return "mp3";
    if (mime.includes("wav")) return "wav";
    if (mime.includes("ogg")) return "ogg";
    return "webm";
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("audio");

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "recordings");
        await fs.mkdir(uploadsDir, { recursive: true });

        const ext = mimeToExt(file.type || undefined);
        const filename = `recording-${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDir, filename);

        await fs.writeFile(filePath, buffer);

        const publicUrl = `/uploads/recordings/${filename}`;

        // At this point you can call any transcription service with `buffer`.
        // For now return the saved file URL and a null transcription placeholder.
        return NextResponse.json({ transcription: null, url: publicUrl });
    } catch (error: any) {
        console.error("Error handling uploaded audio:", error);
        return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
    }
}
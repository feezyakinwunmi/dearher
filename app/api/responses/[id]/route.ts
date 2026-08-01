import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const { blobs } = await list({
        prefix: `responses/${id}/`,
    });

    const responses = await Promise.all(
        blobs.map(async (blob) => {
            const res = await fetch(blob.downloadUrl);
            return res.json();
        })
    );

    responses.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );

    return NextResponse.json(responses);
}
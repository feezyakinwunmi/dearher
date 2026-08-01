import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = nanoid();

    await put(
      `responses/${body.surpriseId}/${id}.json`,
      JSON.stringify({
        id,
        name: body.name,
        message: body.message,
        createdAt: new Date().toISOString(),
      }),
      {
        access: "public",
        addRandomSuffix: false,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
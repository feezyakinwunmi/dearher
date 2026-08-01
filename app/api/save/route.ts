import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = nanoid(8);

    await put(
      `surprises/${id}.json`,
      JSON.stringify(body),
      {
        access: "private",
        addRandomSuffix: false,
      }
    );

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
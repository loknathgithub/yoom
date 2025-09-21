import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";
import { auth } from "@/auth";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 });

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1h
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(session.user.email!, exp, issued);

  return NextResponse.json({ token });
}

'use server'

import { auth } from "@/auth"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

// Helper to create Stream-safe user IDs
function streamSafeId(email: string) {
  return email.replace(/[^a-z0-9@_-]/gi, "_").toLowerCase();
}

export const tokenProvider = async () => {
  const session = await auth();

  if (!session?.user) throw new Error('User is not logged in!');
  if (!apiKey) throw new Error('No API Key!');
  if (!apiSecret) throw new Error('No API secret!');

  const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 });

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1 hour
  const issued = Math.floor(Date.now() / 1000) - 60; // issued 1 min ago

  // Use streamSafeId to ensure the ID contains only allowed characters
  const userId = streamSafeId(session.user.email!);

  const token = client.createToken(userId, exp, issued);  // generation of stream token and passing, the id here and in the parent class must be same

  return token;
}

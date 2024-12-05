import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// This is the main auth route handler
async function handler(req: Request) {
  const authResponse = await auth(req);
  
  // Ensure we're returning a valid response
  if (!authResponse) {
    return NextResponse.json({ error: "No auth response" }, { status: 401 });
  }

  // Set CORS headers
  const response = new NextResponse(authResponse.body, {
    status: authResponse.status ?? 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    }
  });

  // Copy all headers from auth response
  authResponse.headers?.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const GET = handler;
export const POST = handler;

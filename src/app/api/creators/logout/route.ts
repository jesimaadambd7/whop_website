import { NextResponse } from "next/server";
import { clearCreatorSessionCookie } from "@/lib/creator/session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clearCreatorSessionCookie());
  return response;
}

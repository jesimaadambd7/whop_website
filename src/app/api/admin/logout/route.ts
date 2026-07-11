import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(clearSessionCookie());
  return response;
}

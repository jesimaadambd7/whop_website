import { NextResponse } from "next/server";
import { authenticateCreator } from "@/lib/admin/creator-store";
import {
  createCreatorSessionCookie,
  getCreatorSession,
} from "@/lib/creator/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const creator = await authenticateCreator(email, password);
    if (!creator) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (creator.status === "pending") {
      return NextResponse.json(
        { error: "Your account is still awaiting admin approval." },
        { status: 403 },
      );
    }

    if (creator.status === "rejected") {
      return NextResponse.json(
        { error: "This account was not approved. Contact hello@vidcarry.com for help." },
        { status: 403 },
      );
    }

    const response = NextResponse.json({
      ok: true,
      creator: {
        id: creator.id,
        displayName: creator.displayName,
        username: creator.username,
        email: creator.email,
        status: creator.status,
      },
    });
    response.cookies.set(createCreatorSessionCookie(creator.id));
    return response;
  } catch (error) {
    console.error("Creator login error:", error);
    return NextResponse.json({ error: "Could not sign in." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getCreatorSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ creator: session });
}

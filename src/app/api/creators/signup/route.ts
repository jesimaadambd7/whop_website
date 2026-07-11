import { NextResponse } from "next/server";
import { isValidCreatorPassword } from "@/lib/admin/creator-auth";
import { createCreatorAccount } from "@/lib/admin/creator-store";
import { createSubmission } from "@/lib/admin/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      displayName?: string;
      username?: string;
      email?: string;
      password?: string;
    };

    const displayName = body.displayName?.trim() ?? "";
    const username = body.username?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!displayName || displayName.length < 2) {
      return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
    }

    if (!username || username.length < 3 || !/^[a-zA-Z0-9-]+$/.test(username)) {
      return NextResponse.json(
        { error: "Choose a valid portfolio username." },
        { status: 400 },
      );
    }

    if (!email) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    if (!isValidCreatorPassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be 10+ characters with uppercase, lowercase, and a number.",
        },
        { status: 400 },
      );
    }

    const creator = await createCreatorAccount({
      displayName,
      username,
      email,
      password,
    });

    await createSubmission({
      type: "creator",
      name: displayName,
      email,
      summary: `Creator signup: ${username}`,
      payload: {
        displayName,
        username,
        email,
        acceptedTerms: "yes",
      },
    });

    return NextResponse.json({ ok: true, creator });
  } catch (error) {
    console.error("Creator signup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create account." },
      { status: 500 },
    );
  }
}

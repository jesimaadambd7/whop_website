import { NextResponse } from "next/server";
import { PersistentStorageError } from "@/lib/admin/json-store";
import { createSubmission } from "@/lib/admin/submissions";
import type { SubmissionType } from "@/lib/admin/types";

const allowedTypes: SubmissionType[] = [
  "contact",
  "creative-audit",
  "career",
  "talent",
  "creator",
];

export async function POST(request: Request) {
  const body = (await request.json()) as {
    type?: SubmissionType;
    name?: string;
    email?: string;
    summary?: string;
    payload?: Record<string, string>;
  };

  if (
    !body.type ||
    !allowedTypes.includes(body.type) ||
    !body.name?.trim() ||
    !body.email?.trim() ||
    !body.summary?.trim()
  ) {
    return NextResponse.json({ error: "Invalid submission payload." }, { status: 400 });
  }

  try {
    const submission = await createSubmission({
      type: body.type,
      name: body.name.trim(),
      email: body.email.trim(),
      summary: body.summary.trim(),
      payload: body.payload ?? {},
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (error) {
    if (error instanceof PersistentStorageError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("Submission create failed:", error);
    return NextResponse.json({ error: "Could not save submission." }, { status: 500 });
  }
}

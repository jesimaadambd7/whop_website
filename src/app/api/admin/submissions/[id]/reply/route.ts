import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { addSubmissionReply } from "@/lib/admin/submissions";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const message = String(body.body ?? "").trim();
    if (!message) {
      return NextResponse.json({ error: "Reply message is required." }, { status: 400 });
    }

    const submission = await addSubmissionReply(params.id, message);
    if (!submission) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error("Submission reply error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send reply." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { updateSubmissionStatus } from "@/lib/admin/submissions";
import type { SubmissionStatus } from "@/lib/admin/types";

const statuses: SubmissionStatus[] = ["new", "reviewing", "replied", "closed"];

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    submissionId?: string;
    status?: SubmissionStatus;
  };

  if (!body.submissionId || !body.status || !statuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid submission update." }, { status: 400 });
  }

  const updated = await updateSubmissionStatus(body.submissionId, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, submission: updated });
}

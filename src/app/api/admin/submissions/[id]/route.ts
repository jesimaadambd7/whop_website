import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { deleteSubmission } from "@/lib/admin/submissions";

type Params = { params: { id: string } };

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteSubmission(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

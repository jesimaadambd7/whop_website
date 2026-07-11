import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { listCreators } from "@/lib/admin/creator-store";
import type { CreatorStatus } from "@/lib/admin/creator-types";
import { CREATOR_STATUSES } from "@/lib/admin/creator-types";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status") ?? "";
  const status = CREATOR_STATUSES.includes(statusParam as CreatorStatus)
    ? (statusParam as CreatorStatus)
    : "";

  const creators = await listCreators({ status });
  return NextResponse.json({ creators });
}

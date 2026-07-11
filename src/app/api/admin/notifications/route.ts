import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { getAdminNotificationSnapshot } from "@/lib/admin/notifications";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await getAdminNotificationSnapshot();
  return NextResponse.json(snapshot);
}

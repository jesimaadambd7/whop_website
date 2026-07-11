import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { getAdminNotificationSnapshot } from "@/lib/admin/notifications";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await getAdminNotificationSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Admin notifications error:", error);
    return NextResponse.json({
      counts: { inquiries: 0, creators: 0, orders: 0, total: 0 },
      events: [],
      generatedAt: new Date().toISOString(),
    });
  }
}

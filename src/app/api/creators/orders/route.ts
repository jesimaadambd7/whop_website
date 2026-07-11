import { NextResponse } from "next/server";
import { listOrdersByEmail } from "@/lib/admin/order-store";
import { toClientOrder } from "@/lib/creator/orders";
import { getCreatorSession } from "@/lib/creator/session";

export async function GET() {
  const session = await getCreatorSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrdersByEmail(session.email);
  return NextResponse.json({ orders: orders.map(toClientOrder) });
}

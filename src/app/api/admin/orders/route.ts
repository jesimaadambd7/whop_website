import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { listOrders } from "@/lib/admin/order-store";
import type { BillingType, OrderStatus } from "@/lib/admin/order-types";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") || "") as OrderStatus | "";
  const billing = (searchParams.get("billing") || "") as BillingType | "";

  const orders = await listOrders({ status, billing });
  return NextResponse.json({ orders });
}

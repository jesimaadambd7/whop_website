import { NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/admin/order-store";

type Params = { params: { id: string } };

export async function POST(_request: Request, { params }: Params) {
  try {
    const order = await markOrderPaid(params.id);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Mark order paid error:", error);
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}

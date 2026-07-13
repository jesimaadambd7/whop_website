import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { notifyOrderClient } from "@/lib/admin/order-email";
import { deliverOrderToClient } from "@/lib/admin/order-store";
import { normalizeDeliveryUrl } from "@/lib/admin/order-utils";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const fileUrl = body.fileUrl ? String(body.fileUrl) : undefined;
    const fileLabel = body.fileLabel ? String(body.fileLabel) : undefined;
    const externalUrl = body.externalUrl
      ? normalizeDeliveryUrl(String(body.externalUrl))
      : undefined;
    const externalLabel = body.externalLabel ? String(body.externalLabel) : undefined;

    const order = await deliverOrderToClient(params.id, {
      fileUrl,
      fileLabel,
      externalUrl: externalUrl || undefined,
      externalLabel,
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const latestMessage = order.messages[order.messages.length - 1];
    if (latestMessage) {
      await notifyOrderClient(order, latestMessage.body, "delivery");
    }

    return NextResponse.json({ order, emailed: true });
  } catch (error) {
    console.error("Deliver order error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not deliver order." },
      { status: 400 },
    );
  }
}

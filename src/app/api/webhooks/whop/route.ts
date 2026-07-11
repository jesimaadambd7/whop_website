import { NextRequest, NextResponse } from "next/server";
import Whop from "@whop/sdk";
import { markOrderPaid } from "@/lib/admin/order-store";

const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());

    const whop = new Whop({ apiKey: process.env.WHOP_API_KEY! });
    const event = whop.webhooks.unwrap(body, {
      headers,
      key: webhookSecret,
    });

    if (event.type === "payment.succeeded") {
      const data = event.data as {
        id?: string;
        metadata?: Record<string, string>;
      };
      const orderId = data.metadata?.order_id;
      if (orderId) {
        await markOrderPaid(orderId, data.id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }
}

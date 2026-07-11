import { NextResponse } from "next/server";
import {
  addClientOrderMessage,
  getOrderForEmail,
} from "@/lib/admin/order-store";
import { toClientOrder } from "@/lib/creator/orders";
import { getCreatorSession } from "@/lib/creator/session";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const session = await getCreatorSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await getOrderForEmail(params.id, session.email);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order: toClientOrder(order) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await getCreatorSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { body?: string };
    const message = body.body?.trim() ?? "";
    if (!message) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const order = await addClientOrderMessage(params.id, session.email, message);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order: toClientOrder(order) });
  } catch (error) {
    console.error("Client order message error:", error);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}

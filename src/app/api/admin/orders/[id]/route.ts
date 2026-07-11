import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  addOrderDelivery,
  addOrderMessage,
  getOrder,
  issueOrderRefund,
  updateOrder,
} from "@/lib/admin/order-store";
import type { OrderStatus } from "@/lib/admin/order-types";
import { ORDER_STATUSES } from "@/lib/admin/order-types";
import { fromDatetimeLocalValue } from "@/lib/admin/package-utils";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.action === "message") {
      const order = await addOrderMessage(params.id, String(body.body ?? ""));
      if (!order) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    if (body.action === "delivery") {
      const order = await addOrderDelivery(
        params.id,
        String(body.label ?? ""),
        String(body.url ?? ""),
      );
      if (!order) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    if (body.action === "refund") {
      const order = await issueOrderRefund(params.id);
      if (!order) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    const status = body.status as OrderStatus | undefined;
    if (status && !ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const order = await updateOrder(params.id, {
      status,
      dueAt: fromDatetimeLocalValue(String(body.dueAt ?? "")) || null,
      statusNote: body.statusNote != null ? String(body.statusNote) : undefined,
      confirmKickoff: body.confirmKickoff === true,
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update order." },
      { status: 500 },
    );
  }
}

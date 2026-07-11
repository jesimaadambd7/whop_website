import type { AdminOrder } from "@/lib/admin/order-types";

export type ClientOrder = Pick<
  AdminOrder,
  | "id"
  | "orderNumber"
  | "status"
  | "billingType"
  | "source"
  | "packageSlug"
  | "packageTitle"
  | "amount"
  | "currency"
  | "dueAt"
  | "statusNote"
  | "messages"
  | "deliveries"
  | "createdAt"
  | "updatedAt"
  | "paidAt"
>;

export function toClientOrder(order: AdminOrder): ClientOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    billingType: order.billingType,
    source: order.source,
    packageSlug: order.packageSlug,
    packageTitle: order.packageTitle,
    amount: order.amount,
    currency: order.currency,
    dueAt: order.dueAt ?? null,
    statusNote: order.statusNote ?? "",
    messages: order.messages ?? [],
    deliveries: order.deliveries ?? [],
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    paidAt: order.paidAt,
  };
}

import type {
  AdminOrder,
  BillingType,
  OrderDelivery,
  OrderMessage,
  OrderSource,
  OrderStatus,
} from "@/lib/admin/order-types";
import { createOrderId, createOrderNumber, normalizeEmail } from "@/lib/admin/order-utils";
import { readJsonStore, writeJsonStore } from "@/lib/admin/json-store";

const STORE_FILE = "orders-store.json";

async function readAll(): Promise<AdminOrder[]> {
  const orders = await readJsonStore<AdminOrder[]>(STORE_FILE, []);
  if (!Array.isArray(orders)) return [];
  return orders.filter((order) => order?.id && order?.status).map(normalizeOrder);
}

async function writeAll(orders: AdminOrder[]) {
  await writeJsonStore(STORE_FILE, orders);
}

function normalizeOrder(order: AdminOrder): AdminOrder {
  return {
    ...order,
    messages: order.messages ?? [],
    deliveries: order.deliveries ?? [],
    dueAt: order.dueAt ?? null,
    statusNote: order.statusNote ?? "",
    confirmKickoff: order.confirmKickoff ?? false,
  };
}

export async function listOrdersByEmail(email: string) {
  const normalized = normalizeEmail(email);
  const orders = await readAll();
  return orders
    .filter((order) => normalizeEmail(order.email) === normalized)
    .map(normalizeOrder)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderForEmail(id: string, email: string) {
  const order = await getOrder(id);
  if (!order || normalizeEmail(order.email) !== normalizeEmail(email)) return null;
  return order;
}

export async function addClientOrderMessage(id: string, email: string, body: string) {
  const order = await getOrderForEmail(id, email);
  if (!order) return null;

  const orders = await readAll();
  const index = orders.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const message: OrderMessage = {
    id: createOrderId(),
    body: body.trim(),
    author: "client",
    createdAt: now,
  };

  const current = normalizeOrder(orders[index]);
  orders[index] = {
    ...current,
    messages: [...current.messages, message],
    updatedAt: now,
  };
  await writeAll(orders);
  return normalizeOrder(orders[index]);
}

export async function listOrders(filters?: {
  status?: OrderStatus | "";
  billing?: BillingType | "";
}) {
  const orders = await readAll();
  return orders
    .filter((order) => {
      const statusMatch = !filters?.status || order.status === filters.status;
      const billingMatch = !filters?.billing || order.billingType === filters.billing;
      return statusMatch && billingMatch;
    })
    .map(normalizeOrder)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrder(id: string) {
  const orders = await readAll();
  const order = orders.find((item) => item.id === id);
  return order ? normalizeOrder(order) : null;
}

export async function createOrder(input: {
  source: OrderSource;
  packageSlug: string;
  packageTitle: string;
  variantId?: string;
  billingType: BillingType;
  customerName: string;
  email: string;
  company?: string;
  website?: string;
  amount: number;
  currency?: string;
  intake?: Record<string, string>;
}) {
  const orders = await readAll();
  const now = new Date().toISOString();
  const order: AdminOrder = {
    id: createOrderId(),
    orderNumber: createOrderNumber(),
    status: "awaiting_payment",
    billingType: input.billingType,
    source: input.source,
    packageSlug: input.packageSlug,
    packageTitle: input.packageTitle,
    variantId: input.variantId,
    customerName: input.customerName.trim(),
    email: normalizeEmail(input.email),
    company: (input.company || "not applicable").trim(),
    website: input.website?.trim() || undefined,
    amount: input.amount,
    currency: (input.currency || "usd").toLowerCase(),
    intake: input.intake ?? {},
    dueAt: null,
    statusNote: "",
    confirmKickoff: false,
    messages: [],
    deliveries: [],
    createdAt: now,
    updatedAt: now,
  };

  orders.push(order);
  await writeAll(orders);
  return order;
}

export async function markOrderPaid(id: string, whopPaymentId?: string) {
  const orders = await readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const current = orders[index];
  if (current.status === "awaiting_payment" || current.status === "paid") {
    orders[index] = {
      ...current,
      status: current.status === "awaiting_payment" ? "paid" : current.status,
      whopPaymentId: whopPaymentId || current.whopPaymentId,
      paidAt: current.paidAt || now,
      updatedAt: now,
    };
    await writeAll(orders);
  }

  return orders[index];
}

export async function updateOrder(
  id: string,
  patch: Partial<
    Pick<AdminOrder, "status" | "dueAt" | "statusNote" | "confirmKickoff" | "paidAt" | "whopPaymentId">
  >,
) {
  const orders = await readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const current = normalizeOrder(orders[index]);
  const nextStatus = patch.status ?? current.status;

  orders[index] = normalizeOrder({
    ...current,
    ...patch,
    status: nextStatus,
    updatedAt: now,
    paidAt:
      nextStatus === "paid" && !current.paidAt ? now : patch.paidAt ?? current.paidAt,
  });
  await writeAll(orders);
  return orders[index];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return updateOrder(id, { status });
}

export async function addOrderMessage(id: string, body: string) {
  const orders = await readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const message: OrderMessage = {
    id: createOrderId(),
    body: body.trim(),
    author: "admin",
    createdAt: now,
  };

  const current = normalizeOrder(orders[index]);
  orders[index] = {
    ...current,
    messages: [...current.messages, message],
    updatedAt: now,
  };
  await writeAll(orders);
  return orders[index];
}

export async function addOrderDelivery(id: string, label: string, url: string) {
  const orders = await readAll();
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const delivery: OrderDelivery = {
    id: createOrderId(),
    label: label.trim(),
    url: url.trim(),
    createdAt: now,
  };

  const current = normalizeOrder(orders[index]);
  orders[index] = {
    ...current,
    deliveries: [...current.deliveries, delivery],
    updatedAt: now,
  };
  await writeAll(orders);
  return orders[index];
}

export async function issueOrderRefund(id: string) {
  const order = await getOrder(id);
  if (!order) return null;
  if (order.confirmKickoff) {
    throw new Error("Refund is only available before kickoff is confirmed.");
  }
  return updateOrder(id, { status: "refunded" });
}

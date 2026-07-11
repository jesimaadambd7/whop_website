import type { AdminOrder } from "@/lib/admin/order-types";
import { formatMoney } from "@/lib/admin/package-utils";

export function createOrderId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

export function createOrderNumber(date = new Date()) {
  const stamp = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("");
  const suffix = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `VC-${stamp}-${suffix}`;
}

export function formatOrderAmount(order: Pick<AdminOrder, "amount" | "currency" | "billingType">) {
  const label = formatMoney(order.amount, order.currency);
  return order.billingType === "monthly" ? `${label}/mo` : label;
}

const INTAKE_FIELDS = [
  { key: "goal", label: "Goal" },
  { key: "footageReadiness", label: "Footage readiness" },
  { key: "brandOverview", label: "Brand overview" },
  { key: "targetAudience", label: "Target audience" },
  { key: "offer", label: "Offer" },
  { key: "notes", label: "Notes" },
] as const;

export function getOrderIntakeRows(intake: Record<string, string>) {
  return INTAKE_FIELDS.map((field) => ({
    label: field.label,
    value: intake[field.key]?.trim() || "Not provided",
  }));
}

export function getOrderAssetLinks(order: Pick<AdminOrder, "intake" | "website">) {
  const links: { label: string; url: string }[] = [];
  if (order.website) {
    links.push({ label: "Website", url: order.website });
  }
  if (order.intake.footageLink) {
    links.push({ label: "Footage link", url: order.intake.footageLink });
  }
  if (order.intake.referenceLink) {
    links.push({ label: "Reference link", url: order.intake.referenceLink });
  }
  return links;
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export type ClientGroup = {
  key: string;
  name: string;
  email: string;
  company: string;
  orders: AdminOrder[];
};

export function groupOrdersByClient(orders: AdminOrder[]): ClientGroup[] {
  const groups = new Map<string, ClientGroup>();

  for (const order of orders) {
    const email = normalizeEmail(order.email);
    const key = `${email}::${order.company.trim().toLowerCase()}`;
    const existing = groups.get(key);
    if (existing) {
      existing.orders.push(order);
      if (order.customerName.trim()) {
        existing.name = order.customerName;
      }
    } else {
      groups.set(key, {
        key,
        name: order.customerName,
        email: order.email,
        company: order.company,
        orders: [order],
      });
    }
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      orders: [...group.orders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    }))
    .sort((a, b) => {
      const aTime = new Date(a.orders[0]?.createdAt ?? 0).getTime();
      const bTime = new Date(b.orders[0]?.createdAt).getTime();
      return bTime - aTime;
    });
}

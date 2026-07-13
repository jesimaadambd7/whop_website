import type { AdminOrder } from "@/lib/admin/order-types";
import { formatMoney } from "@/lib/admin/package-utils";

export function toPublicDeliveryUrl(url: string) {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  if (siteUrl && trimmed.startsWith("/")) return `${siteUrl}${trimmed}`;
  return trimmed;
}

export function isUploadedDeliveryUrl(url: string) {
  const value = url.trim();
  return (
    value.includes("/assets/deliveries/") ||
    value.includes("/api/files/deliveries/") ||
    value.includes("blob.vercel-storage.com")
  );
}

export function getDeliveryFilename(url: string) {
  const part = url.split("/").pop()?.split("?")[0] || "";
  const decoded = decodeURIComponent(part);
  return decoded.replace(/^\d+-/, "") || "Uploaded file";
}

export function getOrderUploadedDeliveryLinks(
  deliveries: AdminOrder["deliveries"],
): { label: string; url: string; filename: string }[] {
  return deliveries
    .filter((delivery) => isUploadedDeliveryUrl(delivery.url))
    .map((delivery) => ({
      label: "Here's your delivery.",
      url: toPublicDeliveryUrl(delivery.url),
      filename: getDeliveryFilename(delivery.url),
    }));
}

export function getOrderExternalDeliveryLinks(
  deliveries: AdminOrder["deliveries"],
): { label: string; url: string }[] {
  return deliveries
    .filter((delivery) => !isUploadedDeliveryUrl(delivery.url))
    .map((delivery) => ({
      label: delivery.label.trim() || "Delivery link",
      url: toPublicDeliveryUrl(delivery.url),
    }));
}

export function normalizeDeliveryUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

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

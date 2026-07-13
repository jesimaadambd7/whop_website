import type { AdminOrder } from "@/lib/admin/order-types";
import { formatOrderAmount } from "@/lib/admin/order-utils";
import { sendEmail } from "@/lib/email/send";
import {
  buildOrderEmailHtml,
  buildOrderEmailPlainText,
} from "@/lib/email/templates/order-notification";
import { siteConfig } from "@/lib/data/site";

type OrderEmailKind = "delivery" | "message" | "status" | "confirmation";

function getOrderPortalUrl(orderId: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || siteConfig.url;
  return `${base}/creator/dashboard/orders/${orderId}`;
}

function buildOrderConfirmationBody(order: AdminOrder) {
  const nextStep =
    order.source === "resource"
      ? "Your digital resource is ready to access from your order dashboard."
      : "Our team will review your brief and keep you updated as production moves forward.";

  return [
    `Payment confirmed: ${formatOrderAmount(order)}`,
    "",
    nextStep,
    "",
    "You can reply to this email anytime if you have questions about your order.",
    "",
    "A separate payment receipt may also arrive from Whop for your records.",
  ].join("\n");
}

function getOrderEmailSubject(order: AdminOrder, kind: OrderEmailKind) {
  if (kind === "confirmation") {
    return `Order confirmed — ${order.orderNumber}`;
  }
  if (kind === "delivery") {
    return `Your VidCarry delivery is ready — ${order.orderNumber}`;
  }
  if (kind === "status") {
    return `VidCarry order update — ${order.orderNumber}`;
  }
  return `New message about your VidCarry order — ${order.orderNumber}`;
}

async function sendOrderEmail(
  order: AdminOrder,
  body: string,
  kind: OrderEmailKind,
  amountLabel?: string,
) {
  if (!order.email.trim()) {
    throw new Error("This order does not have a customer email.");
  }

  const templateInput = {
    customerName: order.customerName,
    orderNumber: order.orderNumber,
    packageTitle: order.packageTitle,
    body,
    portalUrl: getOrderPortalUrl(order.id),
    kind,
    amountLabel,
  };

  await sendEmail({
    to: order.email,
    subject: getOrderEmailSubject(order, kind),
    text: buildOrderEmailPlainText(templateInput),
    html: buildOrderEmailHtml(templateInput),
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email,
  });
}

export async function notifyOrderConfirmation(order: AdminOrder) {
  await sendOrderEmail(
    order,
    buildOrderConfirmationBody(order),
    "confirmation",
    formatOrderAmount(order),
  );
}

export async function notifyOrderClient(
  order: AdminOrder,
  body: string,
  kind: Exclude<OrderEmailKind, "confirmation"> = "message",
) {
  await sendOrderEmail(order, body, kind);
}

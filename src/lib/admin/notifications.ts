import { listCreators } from "@/lib/admin/creator-store";
import { listOrders } from "@/lib/admin/order-store";
import type {
  AdminNotificationAccent,
  AdminNotificationEvent,
  AdminNotificationSnapshot,
} from "@/lib/admin/notification-types";
import { getSubmissionStats, listSubmissions } from "@/lib/admin/submissions";
import type { SubmissionType } from "@/lib/admin/types";

const INQUIRY_LABELS: Record<SubmissionType, string> = {
  contact: "Contact inquiry",
  "creative-audit": "Creative audit request",
  career: "Career application",
  talent: "Talent request",
  creator: "Creator signup",
};

function inquiryAccent(type: SubmissionType): AdminNotificationAccent {
  if (type === "creator") return "amber";
  if (type === "creative-audit") return "violet";
  if (type === "career") return "emerald";
  return "sky";
}

export async function getAdminNotificationSnapshot(): Promise<AdminNotificationSnapshot> {
  const [submissions, creators, orders] = await Promise.all([
    listSubmissions().catch((error) => {
      console.error("Notification snapshot: submissions failed", error);
      return [];
    }),
    listCreators({ status: "pending" }).catch((error) => {
      console.error("Notification snapshot: creators failed", error);
      return [];
    }),
    listOrders().catch((error) => {
      console.error("Notification snapshot: orders failed", error);
      return [];
    }),
  ]);

  const submissionStats = getSubmissionStats(submissions);
  const actionableOrders = orders.filter((order) =>
    ["awaiting_payment", "paid", "intake_required"].includes(order.status),
  );

  const events: AdminNotificationEvent[] = [];

  for (const submission of submissions) {
    if (submission.status !== "new") continue;

    events.push({
      id: `inquiry:${submission.id}`,
      kind: "inquiry",
      title: INQUIRY_LABELS[submission.type],
      message: `${submission.name} · ${submission.summary}`,
      href: `/admin/inquiries`,
      createdAt: submission.createdAt,
      accent: inquiryAccent(submission.type),
    });
  }

  for (const creator of creators) {
    events.push({
      id: `creator:${creator.id}`,
      kind: "creator",
      title: "Creator awaiting approval",
      message: `${creator.displayName} (@${creator.username})`,
      href: "/admin/creators",
      createdAt: creator.createdAt,
      accent: "amber",
    });
  }

  for (const order of orders) {
    if (order.status === "awaiting_payment") {
      events.push({
        id: `order:${order.id}:checkout`,
        kind: "order",
        title: "New checkout started",
        message: `${order.customerName} · ${order.packageTitle}`,
        href: `/admin/orders/${order.id}`,
        createdAt: order.createdAt,
        accent: "sky",
      });
    }

    if (order.status === "paid" || order.status === "intake_required") {
      events.push({
        id: `order:${order.id}:${order.status}`,
        kind: "order",
        title:
          order.status === "paid"
            ? "Payment received"
            : "Order needs intake review",
        message: `${order.orderNumber} · ${order.packageTitle}`,
        href: `/admin/orders/${order.id}`,
        createdAt: order.paidAt ?? order.updatedAt ?? order.createdAt,
        accent: order.status === "paid" ? "emerald" : "violet",
      });
    }

    for (const message of order.messages) {
      if (message.author !== "client") continue;

      events.push({
        id: `order-message:${message.id}`,
        kind: "order_message",
        title: "New client message",
        message: `${order.orderNumber} · ${message.body.slice(0, 120)}`,
        href: `/admin/orders/${order.id}`,
        createdAt: message.createdAt,
        accent: "rose",
      });
    }
  }

  events.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    counts: {
      inquiries: submissionStats.new,
      creators: creators.length,
      orders: actionableOrders.length,
      total: submissionStats.new + creators.length + actionableOrders.length,
    },
    events,
    generatedAt: new Date().toISOString(),
  };
}

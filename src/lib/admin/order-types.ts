export type OrderStatus =
  | "awaiting_payment"
  | "paid"
  | "intake_required"
  | "ready_for_kickoff"
  | "in_progress"
  | "client_review"
  | "revision"
  | "delivered"
  | "completed"
  | "on_hold"
  | "cancelled"
  | "refunded"
  | "disputed";

export type OrderSource = "package" | "resource";

export type BillingType = "one_time" | "monthly";

export type OrderMessage = {
  id: string;
  body: string;
  author: "admin" | "client";
  createdAt: string;
};

export type OrderDelivery = {
  id: string;
  label: string;
  url: string;
  createdAt: string;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  billingType: BillingType;
  source: OrderSource;
  packageSlug: string;
  packageTitle: string;
  variantId?: string;
  customerName: string;
  email: string;
  company: string;
  website?: string;
  amount: number;
  currency: string;
  intake: Record<string, string>;
  dueAt?: string | null;
  statusNote?: string;
  confirmKickoff?: boolean;
  messages: OrderMessage[];
  deliveries: OrderDelivery[];
  whopPaymentId?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  confirmationEmailSentAt?: string;
};

export const ORDER_STATUSES: OrderStatus[] = [
  "awaiting_payment",
  "paid",
  "intake_required",
  "ready_for_kickoff",
  "in_progress",
  "client_review",
  "revision",
  "delivered",
  "completed",
  "on_hold",
  "cancelled",
  "refunded",
  "disputed",
];

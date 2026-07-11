export type AdminNotificationKind = "inquiry" | "creator" | "order" | "order_message";

export type AdminNotificationAccent = "sky" | "amber" | "emerald" | "violet" | "rose";

export type AdminNotificationEvent = {
  id: string;
  kind: AdminNotificationKind;
  title: string;
  message: string;
  href: string;
  createdAt: string;
  accent: AdminNotificationAccent;
};

export type AdminNotificationCounts = {
  inquiries: number;
  creators: number;
  orders: number;
  total: number;
};

export type AdminNotificationSnapshot = {
  counts: AdminNotificationCounts;
  events: AdminNotificationEvent[];
  generatedAt: string;
};

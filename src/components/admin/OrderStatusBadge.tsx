import type { OrderStatus } from "@/lib/admin/order-types";
import { cn } from "@/lib/utils";

type Props = {
  status: OrderStatus;
  className?: string;
};

const STATUS_STYLES: Record<OrderStatus, { badge: string; dot: string }> = {
  awaiting_payment: {
    badge: "border-amber-400/60 bg-amber-500/20 text-amber-200",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]",
  },
  paid: {
    badge: "border-emerald-400/60 bg-emerald-500/20 text-emerald-200",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]",
  },
  intake_required: {
    badge: "border-violet-400/60 bg-violet-500/20 text-violet-200",
    dot: "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]",
  },
  ready_for_kickoff: {
    badge: "border-sky-400/60 bg-sky-500/20 text-sky-200",
    dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]",
  },
  in_progress: {
    badge: "border-cyan-400/60 bg-cyan-500/20 text-cyan-200",
    dot: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]",
  },
  client_review: {
    badge: "border-fuchsia-400/60 bg-fuchsia-500/20 text-fuchsia-200",
    dot: "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.9)]",
  },
  revision: {
    badge: "border-orange-400/60 bg-orange-500/20 text-orange-200",
    dot: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.9)]",
  },
  delivered: {
    badge: "border-teal-400/60 bg-teal-500/20 text-teal-200",
    dot: "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)]",
  },
  completed: {
    badge: "border-emerald-300/70 bg-emerald-400/25 text-emerald-100",
    dot: "bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]",
  },
  on_hold: {
    badge: "border-zinc-400/50 bg-zinc-500/20 text-zinc-200",
    dot: "bg-zinc-400",
  },
  cancelled: {
    badge: "border-red-400/60 bg-red-500/20 text-red-200",
    dot: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.9)]",
  },
  refunded: {
    badge: "border-rose-400/60 bg-rose-500/20 text-rose-200",
    dot: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)]",
  },
  disputed: {
    badge: "border-red-500/70 bg-red-600/25 text-red-100",
    dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
  },
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
  intake_required: "Intake required",
  ready_for_kickoff: "Ready for kickoff",
  in_progress: "In progress",
  client_review: "Client review",
  revision: "Revision",
  delivered: "Delivered",
  completed: "Completed",
  on_hold: "On hold",
  cancelled: "Cancelled",
  refunded: "Refunded",
  disputed: "Disputed",
};

export function formatOrderStatusLabel(status: OrderStatus) {
  return STATUS_LABELS[status];
}

export function OrderStatusBadge({ status, className }: Props) {
  const styles = STATUS_STYLES[status];
  const label = STATUS_LABELS[status];

  return (
    <span
      title={label}
      className={cn(
        "inline-flex h-8 w-[12rem] shrink-0 items-center justify-center gap-2 rounded-full border px-3 text-[10px] font-black uppercase tracking-[0.1em] whitespace-nowrap",
        styles.badge,
        className,
      )}
    >
      <span className={cn("h-2 w-2 shrink-0 rounded-full", styles.dot)} aria-hidden />
      <span>{label}</span>
    </span>
  );
}

import Link from "next/link";
import type { ClientOrder } from "@/lib/creator/orders";
import { formatOrderAmount } from "@/lib/admin/order-utils";
import { cn } from "@/lib/utils";

type Props = {
  orders: ClientOrder[];
};

function statusClasses(status: ClientOrder["status"]) {
  if (status === "awaiting_payment") return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  if (status === "completed" || status === "delivered") {
    return "border-emerald-300/30 bg-emerald-300/10 text-emerald-100";
  }
  if (status === "cancelled" || status === "refunded") {
    return "border-red-300/30 bg-red-400/10 text-red-200";
  }
  return "border-sky-300/30 bg-sky-300/10 text-sky-100";
}

function formatDate(value?: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function CreatorOrdersPanel({ orders }: Props) {
  return (
    <>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Your account</p>
      <h1 className="mt-3 font-display text-5xl font-black tracking-[-0.06em]">Purchases</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Track package and resource orders, production status, VidCarry replies, and delivery links
        tied to your account email.
      </p>

      <section className="mt-8 grid gap-4">
        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
            <p className="text-lg font-bold text-white">No purchases yet.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Orders placed with your account email will appear here after checkout.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/packages/ugc-ad-sprint"
                className="rounded-full bg-sky-400 px-5 py-3 text-sm font-black text-black"
              >
                Browse packages
              </Link>
              <Link
                href="/resources"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-zinc-300"
              >
                Browse resources
              </Link>
            </div>
          </div>
        ) : (
          orders.map((order) => {
            const adminMessages = order.messages.filter((message) => message.author === "admin");
            const latestReply = adminMessages.at(-1);

            return (
              <Link
                key={order.id}
                href={`/creator/dashboard/orders/${order.id}`}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
                      {order.orderNumber}
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                      {order.packageTitle}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-500">
                      Ordered {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-black text-sky-200">
                      {formatOrderAmount(order)}
                    </p>
                    <span
                      className={cn(
                        "mt-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em]",
                        statusClasses(order.status),
                      )}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
                {order.statusNote ? (
                  <p className="mt-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300">
                    {order.statusNote}
                  </p>
                ) : null}
                {latestReply ? (
                  <p className="mt-3 text-sm text-zinc-400">
                    <span className="font-bold text-white">Latest reply:</span> {latestReply.body}
                  </p>
                ) : null}
              </Link>
            );
          })
        )}
      </section>
    </>
  );
}

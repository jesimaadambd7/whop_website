"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ClientOrder } from "@/lib/creator/orders";
import { formatOrderAmount } from "@/lib/admin/order-utils";
import { cn } from "@/lib/utils";

type Props = {
  order: ClientOrder;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-white outline-none focus:border-sky-300";

function statusClasses(status: ClientOrder["status"]) {
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

export function CreatorOrderDetailPanel({ order: initialOrder }: Props) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [messageBody, setMessageBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!messageBody.trim()) return;

    startTransition(async () => {
      setError(null);
      try {
        const response = await fetch(`/api/creators/orders/${order.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: messageBody }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not send message.");
        }
        setOrder(data.order);
        setMessageBody("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not send message.");
      }
    });
  }

  return (
    <>
      <Link
        href="/creator/dashboard"
        className="inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
      >
        ← Back to purchases
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
            {order.orderNumber}
          </p>
          <h1 className="mt-2 font-display text-5xl font-black tracking-[-0.06em]">
            {order.packageTitle}
          </h1>
        </div>
        <p className="font-display text-3xl font-black text-sky-200">
          {formatOrderAmount(order)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.16em]",
            statusClasses(order.status),
          )}
        >
          {order.status.replace(/_/g, " ")}
        </span>
        <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
          Ordered {formatDate(order.createdAt)}
        </span>
        {order.paidAt ? (
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
            Paid {formatDate(order.paidAt)}
          </span>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <h2 className="font-display text-3xl font-black">Messages</h2>
          <div className="mt-5 grid gap-3">
            {order.messages.length === 0 ? (
              <p className="text-sm text-zinc-500">No messages yet. UGCViss updates will appear here.</p>
            ) : (
              order.messages.map((message) => (
                <article
                  key={message.id}
                  className={cn(
                    "rounded-2xl border p-4 text-sm",
                    message.author === "admin"
                      ? "border-sky-400/20 bg-sky-400/[0.06]"
                      : "border-white/10 bg-black/30",
                  )}
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                    {message.author === "admin" ? "UGCViss team" : "You"} ·{" "}
                    {formatDate(message.createdAt)}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">{message.body}</p>
                </article>
              ))
            )}
          </div>
          <form className="mt-5" onSubmit={sendMessage}>
            <textarea
              rows={4}
              value={messageBody}
              onChange={(event) => setMessageBody(event.target.value)}
              placeholder="Reply to the UGCViss team"
              className={inputClass}
              required
            />
            {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="mt-3 rounded-full bg-sky-400 px-5 py-3 font-black text-black disabled:opacity-60"
            >
              {pending ? "Sending..." : "Send message"}
            </button>
          </form>
        </section>

        <aside className="grid content-start gap-6">
          <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/[0.05] p-6">
            <h2 className="font-display text-2xl font-black">Status update</h2>
            <dl className="mt-4 grid gap-4 text-sm">
              <div>
                <dt className="text-xs font-black uppercase text-zinc-500">Current status</dt>
                <dd className="mt-2 text-white">{order.status.replace(/_/g, " ")}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase text-zinc-500">Due date</dt>
                <dd className="mt-2 text-white">{formatDate(order.dueAt)}</dd>
              </div>
            </dl>
            {order.statusNote ? (
              <p className="mt-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-7 text-zinc-300">
                {order.statusNote}
              </p>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">No client-facing status note yet.</p>
            )}
          </section>

          <section className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/[0.05] p-6">
            <h2 className="font-display text-2xl font-black">Deliveries</h2>
            {order.deliveries.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">Delivery links will appear here when ready.</p>
            ) : (
              <div className="mt-4 grid gap-2">
                {order.deliveries.map((delivery) => (
                  <a
                    key={delivery.id}
                    href={delivery.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm transition hover:border-emerald-300/30"
                  >
                    <p className="font-bold text-white">{delivery.label}</p>
                    <p className="mt-1 truncate text-emerald-200">{delivery.url}</p>
                  </a>
                ))}
              </div>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}

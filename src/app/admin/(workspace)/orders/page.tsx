import Link from "next/link";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { listOrders } from "@/lib/admin/order-store";
import type { BillingType, OrderStatus } from "@/lib/admin/order-types";
import { ORDER_STATUSES } from "@/lib/admin/order-types";
import { formatOrderAmount } from "@/lib/admin/order-utils";

type Props = {
  searchParams?: {
    status?: string;
    billing?: string;
  };
};

function parseStatus(value: string | undefined): OrderStatus | "" {
  if (!value) return "";
  return ORDER_STATUSES.includes(value as OrderStatus) ? (value as OrderStatus) : "";
}

function parseBilling(value: string | undefined): BillingType | "" {
  if (value === "one_time" || value === "monthly") return value;
  return "";
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const status = parseStatus(searchParams?.status);
  const billing = parseBilling(searchParams?.billing);
  const orders = await listOrders({ status, billing });

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">
        Production operations
      </p>
      <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.06em]">
        Client orders.
      </h1>

      <form className="mt-7 flex flex-wrap gap-3">
        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-white/10 bg-black px-4 py-3"
        >
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <select
          name="billing"
          defaultValue={billing}
          className="rounded-xl border border-white/10 bg-black px-4 py-3"
        >
          <option value="">All billing</option>
          <option value="one_time">One time</option>
          <option value="monthly">Monthly</option>
        </select>
        <button className="rounded-xl bg-sky-400 px-5 py-3 font-black text-black">Filter</button>
      </form>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10">
        {orders.length === 0 ? (
          <div className="p-8 text-sm text-zinc-500">
            No orders yet. New checkouts will appear here as soon as a customer clicks Pay Now.
          </div>
        ) : (
          <>
            <div className="hidden border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-zinc-500 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_6rem_12rem] lg:gap-x-6">
              <p>Order</p>
              <p className="lg:border-l lg:border-white/10 lg:pl-6">Client</p>
              <p className="text-right">Amount</p>
              <p className="text-right">Status</p>
            </div>
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="grid gap-x-6 gap-y-3 border-b border-white/10 bg-white/[0.025] p-6 transition hover:bg-white/[0.05] last:border-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_6rem_12rem] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-sky-300">{order.orderNumber}</p>
                  <h2 className="mt-2 font-display text-2xl font-black">{order.packageTitle}</h2>
                </div>
                <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-6">
                  <p className="truncate font-bold">{order.customerName}</p>
                  <p className="mt-1 truncate text-sm text-zinc-500">
                    {order.email} / {order.company}
                  </p>
                </div>
                <p className="font-black text-sky-200 lg:text-right">{formatOrderAmount(order)}</p>
                <div className="flex lg:justify-end">
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </>
        )}
      </section>
    </main>
  );
}

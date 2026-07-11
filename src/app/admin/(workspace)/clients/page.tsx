import Link from "next/link";
import { listOrders } from "@/lib/admin/order-store";
import { formatOrderAmount, groupOrdersByClient } from "@/lib/admin/order-utils";

export default async function AdminClientsPage() {
  const orders = await listOrders();
  const clients = groupOrdersByClient(orders);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">Client CRM</p>
      <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.06em]">Clients.</h1>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {clients.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-sm text-zinc-500 md:col-span-2">
            No clients yet. They will appear here after the first checkout is started.
          </div>
        ) : (
          clients.map((client) => (
            <article
              key={client.key}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6"
            >
              <h2 className="font-display text-3xl font-black">{client.name}</h2>
              <p className="mt-2 text-sm text-zinc-500">
                {client.email} / {client.company}
              </p>
              <div className="mt-5 grid gap-2">
                {client.orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="flex justify-between rounded-xl border border-white/10 bg-black/30 p-3 text-sm transition hover:border-sky-400/30"
                  >
                    <span>{order.orderNumber}</span>
                    <strong>{formatOrderAmount(order)}</strong>
                  </Link>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

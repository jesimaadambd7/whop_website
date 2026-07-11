import { notFound } from "next/navigation";
import { AdminOrderDetailPanel } from "@/components/admin/AdminOrderDetailPanel";
import { getOrder } from "@/lib/admin/order-store";
import { formatOrderAmount } from "@/lib/admin/order-utils";

type Props = {
  params: { id: string };
};

export default async function AdminOrderDetailPage({ params }: Props) {
  const order = await getOrder(params.id);
  if (!order) notFound();

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
        {order.orderNumber}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-display text-5xl font-black tracking-[-0.06em]">
            {order.packageTitle}
          </h1>
          <p className="mt-3 text-zinc-400">
            {order.customerName} / {order.email} / {order.company}
          </p>
        </div>
        <p className="font-display text-3xl font-black text-sky-200">
          {formatOrderAmount(order)}
        </p>
      </div>

      <AdminOrderDetailPanel order={order} />
    </main>
  );
}

import { notFound } from "next/navigation";
import { CreatorDashboardShell } from "@/components/creators/CreatorDashboardShell";
import { CreatorOrderDetailPanel } from "@/components/creators/CreatorOrderDetailPanel";
import { getOrderForEmail } from "@/lib/admin/order-store";
import { toClientOrder } from "@/lib/creator/orders";
import { requireCreatorSession } from "@/lib/creator/session";

type Props = {
  params: { id: string };
};

export default async function CreatorOrderDetailPage({ params }: Props) {
  const creator = await requireCreatorSession();
  const order = await getOrderForEmail(params.id, creator.email);
  if (!order) notFound();

  return (
    <CreatorDashboardShell creator={creator}>
      <CreatorOrderDetailPanel order={toClientOrder(order)} />
    </CreatorDashboardShell>
  );
}

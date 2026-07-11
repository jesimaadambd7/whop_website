import { CreatorDashboardShell } from "@/components/creators/CreatorDashboardShell";
import { CreatorOrdersPanel } from "@/components/creators/CreatorOrdersPanel";
import { listOrdersByEmail } from "@/lib/admin/order-store";
import { toClientOrder } from "@/lib/creator/orders";
import { requireCreatorSession } from "@/lib/creator/session";

export default async function CreatorDashboardPage() {
  const creator = await requireCreatorSession();
  const orders = await listOrdersByEmail(creator.email);

  return (
    <CreatorDashboardShell creator={creator}>
      <CreatorOrdersPanel orders={orders.map(toClientOrder)} />
    </CreatorDashboardShell>
  );
}

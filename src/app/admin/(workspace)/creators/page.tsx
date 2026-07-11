import { AdminCreatorsPanel } from "@/components/admin/AdminCreatorsPanel";
import { getCreatorStats, listCreators } from "@/lib/admin/creator-store";
import type { CreatorStatus } from "@/lib/admin/creator-types";
import { CREATOR_STATUSES } from "@/lib/admin/creator-types";

type Props = {
  searchParams?: {
    status?: string;
  };
};

function parseStatus(value: string | undefined): CreatorStatus | "" {
  if (!value) return "";
  return CREATOR_STATUSES.includes(value as CreatorStatus) ? (value as CreatorStatus) : "";
}

export default async function AdminCreatorsPage({ searchParams }: Props) {
  const status = parseStatus(searchParams?.status);
  const creators = await listCreators({ status });
  const stats = await getCreatorStats();

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <AdminCreatorsPanel
        initialCreators={creators}
        stats={stats}
        activeStatus={status}
      />
    </main>
  );
}

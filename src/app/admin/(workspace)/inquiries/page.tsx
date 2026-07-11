import Link from "next/link";
import { SubmissionCard } from "@/components/admin/SubmissionCard";
import { SubmissionFilters } from "@/components/admin/SubmissionFilters";
import { getSubmissionStats, listSubmissions } from "@/lib/admin/submissions";
import type { SubmissionStatus, SubmissionType } from "@/lib/admin/types";

type Props = {
  searchParams?: {
    type?: string;
    status?: string;
  };
};

function parseFilter<T extends string>(value: string | undefined, allowed: readonly T[]) {
  if (!value) return "all" as const;
  return allowed.includes(value as T) ? (value as T) : ("all" as const);
}

export default async function AdminInquiriesPage({ searchParams }: Props) {
  const typeFilter = parseFilter<SubmissionType>(searchParams?.type, [
    "contact",
    "creative-audit",
    "career",
    "talent",
    "creator",
  ]);
  const statusFilter = parseFilter<SubmissionStatus>(searchParams?.status, [
    "new",
    "reviewing",
    "replied",
    "closed",
  ]);

  const allSubmissions = await listSubmissions();
  const submissions = await listSubmissions({
    type: typeFilter,
    status: statusFilter,
  });
  const stats = getSubmissionStats(allSubmissions);

  const filterQuery = new URLSearchParams();
  if (typeFilter !== "all") filterQuery.set("type", typeFilter);
  if (statusFilter !== "all") filterQuery.set("status", statusFilter);
  const redirectTo = filterQuery.toString()
    ? `/admin/inquiries?${filterQuery}`
    : "/admin/inquiries";

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Inquiry inbox</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-display text-5xl font-black tracking-[-0.06em]">Inquiries</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Contact forms, creative audits, career applications, talent submissions, and creator
            signups land here as soon as someone submits.
          </p>
        </div>
        <p className="font-display text-3xl font-black text-sky-200">{allSubmissions.length}</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        {[
          { label: "New", value: stats.new },
          { label: "Reviewing", value: stats.reviewing },
          { label: "Replied", value: stats.replied },
          { label: "Closed", value: stats.closed },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
          >
            <p className="text-3xl font-black text-white">{item.value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SubmissionFilters
          activeType={typeFilter}
          activeStatus={statusFilter}
          basePath="/admin/inquiries"
        />
      </div>

      {submissions.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
          <p className="text-lg font-bold text-white">No inquiries match these filters.</p>
          <p className="mt-2 text-sm text-zinc-500">
            New contact, audit, career, talent, and creator signups will appear here automatically.
          </p>
          <Link
            href="/admin/inquiries"
            className="mt-5 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              redirectTo={redirectTo}
            />
          ))}
        </div>
      )}
    </main>
  );
}

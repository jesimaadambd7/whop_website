import Link from "next/link";
import { AdminSectionHeader } from "@/components/admin/AdminSectionHeader";
import { SubmissionCard } from "@/components/admin/SubmissionCard";
import { adminControlPanels } from "@/lib/data/admin-nav";
import { getCreatorStats } from "@/lib/admin/creator-store";
import { getSubmissionStats, listSubmissions } from "@/lib/admin/submissions";

export default async function AdminDashboardPage() {
  const allSubmissions = await listSubmissions();
  const recentSubmissions = allSubmissions.slice(0, 4);
  const stats = getSubmissionStats(allSubmissions);
  const creatorStats = await getCreatorStats();

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <AdminSectionHeader
        title="Admin dashboard"
        description="Commerce, content controls, and the inquiry inbox in one workspace."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/admin/inquiries"
          className="rounded-[1.75rem] border border-sky-400/20 bg-sky-400/[0.07] p-5 transition hover:border-sky-300/50"
        >
          <p className="text-3xl font-black text-white">{stats.new}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-sky-200">
            New inquiries
          </p>
        </Link>
        <Link
          href="/admin/inquiries"
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20"
        >
          <p className="text-3xl font-black text-white">{allSubmissions.length}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Total inquiries
          </p>
        </Link>
        <Link
          href="/admin/creators"
          className="rounded-[1.75rem] border border-amber-300/20 bg-amber-300/[0.07] p-5 transition hover:border-amber-200/50"
        >
          <p className="text-3xl font-black text-white">{creatorStats.pending}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
            Creator profiles awaiting approval
          </p>
        </Link>
        <Link
          href="/admin/creators?status=approved"
          className="rounded-[1.75rem] border border-emerald-300/20 bg-emerald-300/[0.07] p-5 transition hover:border-emerald-200/50"
        >
          <p className="text-3xl font-black text-white">{creatorStats.approved}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
            Approved live creators
          </p>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {adminControlPanels.map((panel) => (
          <Link
            key={panel.href}
            href={panel.href}
            className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-5 transition hover:-translate-y-1 hover:border-sky-300/60 hover:bg-sky-400/15"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
              Control panel
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">
              {panel.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{panel.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em]">Recent inquiries</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Contact, audit, career, talent, and creator signups from the site.
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
        >
          Open inbox
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {recentSubmissions.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 text-sm text-zinc-500 lg:col-span-2">
            No inquiries yet. They will appear here when someone submits a contact, audit, career,
            talent, or creator signup form.
          </div>
        ) : (
          recentSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              redirectTo="/admin/inquiries"
            />
          ))
        )}
      </div>
    </main>
  );
}

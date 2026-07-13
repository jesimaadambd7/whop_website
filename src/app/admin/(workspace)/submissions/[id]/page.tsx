import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminSectionHeader } from "@/components/admin/AdminSectionHeader";
import { SubmissionDeleteButton } from "@/components/admin/SubmissionDeleteButton";
import { SubmissionDetailInteractive } from "@/components/admin/SubmissionDetailInteractive";
import { getSubmission } from "@/lib/admin/submissions";

type Props = {
  params: { id: string };
};

export default async function SubmissionDetailPage({ params }: Props) {
  const submission = await getSubmission(params.id);
  if (!submission) notFound();

  return (
    <main className="min-h-screen bg-black px-5 py-24 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/admin/inquiries"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-sky-400/50 hover:text-sky-300"
        >
          ← Inquiries
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <AdminSectionHeader
            title={submission.name}
            description={submission.summary}
            showSignOut={false}
          />
          <SubmissionDeleteButton
            submissionId={submission.id}
            submissionName={submission.name}
            redirectTo="/admin/inquiries"
          />
        </div>

        <SubmissionDetailInteractive submission={submission} />
      </section>
    </main>
  );
}

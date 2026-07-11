import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminSectionHeader } from "@/components/admin/AdminSectionHeader";
import { SubmissionDeleteButton } from "@/components/admin/SubmissionDeleteButton";
import { SubmissionStatusForm } from "@/components/admin/SubmissionStatusForm";
import { getSubmission } from "@/lib/admin/submissions";

type Props = {
  params: { id: string };
};

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

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

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Email</p>
              <p className="mt-2 text-base text-white">{submission.email}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Type</p>
              <p className="mt-2 text-base text-white">{submission.type}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                Submitted
              </p>
              <p className="mt-2 text-base text-white">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(new Date(submission.createdAt))}
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                Status
              </p>
              <SubmissionStatusForm
                submissionId={submission.id}
                status={submission.status}
                redirectTo={`/admin/submissions/${submission.id}`}
              />
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              Submission details
            </p>
            <dl className="mt-4 space-y-4">
              {Object.entries(submission.payload).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    {formatLabel(key)}
                  </dt>
                  <dd className="mt-2 whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}

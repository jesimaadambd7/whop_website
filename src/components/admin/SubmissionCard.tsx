import Link from "next/link";
import { SubmissionDeleteButton } from "@/components/admin/SubmissionDeleteButton";
import { SubmissionStatusForm } from "@/components/admin/SubmissionStatusForm";
import type { Submission } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

function formatTypeLabel(type: Submission["type"]) {
  if (type === "creative-audit") return "Creative Audit";
  if (type === "creator") return "Creator signup";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClasses(status: Submission["status"]) {
  if (status === "new") return "border-sky-300/30 bg-sky-300/10 text-sky-100";
  if (status === "reviewing") return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  if (status === "replied") return "border-emerald-300/30 bg-emerald-300/10 text-emerald-100";
  return "border-white/10 bg-white/5 text-zinc-300";
}

type SubmissionCardProps = {
  submission: Submission;
  redirectTo: string;
};

export function SubmissionCard({ submission, redirectTo }: SubmissionCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/35 hover:bg-white/[0.055]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">
              {formatTypeLabel(submission.type)}
            </span>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
                statusClasses(submission.status),
              )}
            >
              {submission.status}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-white">
            {submission.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{submission.summary}</p>
          <p className="mt-2 text-sm text-zinc-500">{submission.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/submissions/${submission.id}`}
            className="rounded-full bg-sky-400 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            Open
          </Link>
          <SubmissionDeleteButton
            submissionId={submission.id}
            submissionName={submission.name}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
          {formatDate(submission.createdAt)}
        </p>
        <SubmissionStatusForm
          submissionId={submission.id}
          status={submission.status}
          redirectTo={redirectTo}
        />
      </div>
    </article>
  );
}

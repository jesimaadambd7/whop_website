"use client";

import { useState } from "react";
import { SubmissionReplyPanel } from "@/components/admin/SubmissionReplyPanel";
import { SubmissionStatusForm } from "@/components/admin/SubmissionStatusForm";
import type { Submission } from "@/lib/admin/types";

type Props = {
  submission: Submission;
};

export function SubmissionDetailInteractive({ submission: initialSubmission }: Props) {
  const [submission, setSubmission] = useState(initialSubmission);

  return (
    <>
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
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Submitted</p>
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
              onStatusChange={(status) => setSubmission((current) => ({ ...current, status }))}
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
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </dt>
                <dd className="mt-2 whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <SubmissionReplyPanel
        submission={submission}
        onSubmissionUpdate={setSubmission}
      />
    </>
  );
}

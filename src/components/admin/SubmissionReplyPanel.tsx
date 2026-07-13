"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminSuccessModal } from "@/components/admin/AdminSuccessModal";
import type { Submission } from "@/lib/admin/types";

type Props = {
  submission: Submission;
  onSubmissionUpdate?: (submission: Submission) => void;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-white outline-none focus:border-sky-300";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function SubmissionReplyPanel({
  submission: initialSubmission,
  onSubmissionUpdate,
}: Props) {
  const router = useRouter();
  const [submission, setSubmission] = useState(initialSubmission);
  const [replyBody, setReplyBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setSubmission(initialSubmission);
  }, [initialSubmission]);

  function sendReply() {
    if (!replyBody.trim()) return;

    startTransition(async () => {
      setError(null);
      try {
        const response = await fetch(`/api/admin/submissions/${submission.id}/reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: replyBody }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not send reply.");
        }

        setSubmission(data.submission);
        onSubmissionUpdate?.(data.submission);
        setReplyBody("");
        setSuccess({
          title: "Reply sent.",
          description: "Your message was emailed to the customer and the inquiry is now marked as replied.",
        });
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <>
      <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
        <h2 className="font-display text-3xl font-black">Messages</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Reply to the customer by email. Sent messages appear in this thread.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <article className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
              {submission.name} · {formatDate(submission.createdAt)}
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">{submission.summary}</p>
          </article>

          {(submission.replies ?? []).map((reply) => (
            <article
              key={reply.id}
              className="rounded-2xl border border-sky-400/20 bg-sky-400/[0.06] p-4 text-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-300">
                You · {formatDate(reply.createdAt)}
              </p>
              <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-200">{reply.body}</p>
            </article>
          ))}
        </div>

        <form
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault();
            sendReply();
          }}
        >
          <label className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
            Reply to customer
          </label>
          <textarea
            name="body"
            required
            rows={5}
            value={replyBody}
            onChange={(event) => setReplyBody(event.target.value)}
            placeholder="Write your reply to the customer..."
            className={`${inputClass} mt-3`}
          />
          <button
            type="submit"
            disabled={pending || !replyBody.trim()}
            className="mt-4 rounded-full bg-sky-400 px-5 py-3 font-black text-black disabled:opacity-60"
          >
            {pending ? "Sending..." : "Send and email customer"}
          </button>
        </form>
      </section>

      <AdminSuccessModal
        open={!!success}
        title={success?.title ?? ""}
        description={success?.description}
        onClose={() => setSuccess(null)}
      />
    </>
  );
}

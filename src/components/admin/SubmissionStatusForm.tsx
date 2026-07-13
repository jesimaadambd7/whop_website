"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SubmissionStatus } from "@/lib/admin/types";

type SubmissionStatusFormProps = {
  submissionId: string;
  status: SubmissionStatus;
  redirectTo: string;
  onStatusChange?: (status: SubmissionStatus) => void;
};

export function SubmissionStatusForm({
  submissionId,
  status,
  redirectTo,
  onStatusChange,
}: SubmissionStatusFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValue(status);
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/admin/submissions/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, status: value }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      onStatusChange?.(value);
      router.push(redirectTo);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <select
        name="status"
        value={value}
        onChange={(event) => setValue(event.target.value as SubmissionStatus)}
        className="rounded-full border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white outline-none focus:border-sky-300"
      >
        <option value="new">New</option>
        <option value="reviewing">Reviewing</option>
        <option value="replied">Replied</option>
        <option value="closed">Closed</option>
      </select>
      <button
        type="submit"
        disabled={saving}
        className="rounded-full border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-sky-300/50 hover:text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

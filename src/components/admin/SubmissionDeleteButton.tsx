"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AdminConfirmModal,
  type AdminConfirmRequest,
} from "@/components/admin/AdminConfirmModal";

type Props = {
  submissionId: string;
  submissionName: string;
  redirectTo?: string;
  className?: string;
};

export function SubmissionDeleteButton({
  submissionId,
  submissionName,
  redirectTo,
  className,
}: Props) {
  const router = useRouter();
  const [confirm, setConfirm] = useState<AdminConfirmRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <>
      {error ? <p className="text-sm text-red-200">{error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null);
          setConfirm({
            title: "Delete inquiry",
            description: `Remove the inquiry from ${submissionName}? This cannot be undone.`,
            confirmLabel: "Delete inquiry",
            onConfirm: async () => {
              const response = await fetch(`/api/admin/submissions/${submissionId}`, {
                method: "DELETE",
              });
              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.error || "Could not delete inquiry.");
              }
              if (redirectTo) {
                router.push(redirectTo);
              } else {
                router.refresh();
              }
            },
          });
        }}
        className={
          className ??
          "rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-red-300/40 hover:text-red-200 disabled:opacity-60"
        }
      >
        Delete
      </button>

      <AdminConfirmModal
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.confirmLabel}
        pending={pending}
        onConfirm={() => {
          if (!confirm) return;
          startTransition(async () => {
            try {
              await confirm.onConfirm();
              setConfirm(null);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not delete inquiry.");
              setConfirm(null);
            }
          });
        }}
        onCancel={() => {
          if (!pending) setConfirm(null);
        }}
      />
    </>
  );
}

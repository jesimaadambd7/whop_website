"use client";

import { useEffect } from "react";

type AdminConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  pendingLabel?: string;
  tone?: "danger" | "primary";
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  pendingLabel = "Working...",
  tone = "danger",
  pending = false,
  onConfirm,
  onCancel,
}: AdminConfirmModalProps) {
  const isPrimary = tone === "primary";
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) {
        onCancel();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, pending, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        disabled={pending}
        onClick={onCancel}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity disabled:cursor-not-allowed"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-description"
        className={`relative w-full max-w-md overflow-hidden rounded-[2rem] border bg-[#080b11] shadow-[0_30px_120px_rgba(0,0,0,0.65)] ${
          isPrimary ? "border-sky-400/20" : "border-red-400/20"
        }`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-24 ${
            isPrimary
              ? "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_68%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.18),transparent_68%)]"
          }`}
        />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className={`grid size-12 shrink-0 place-items-center rounded-2xl border text-lg font-black ${
                isPrimary
                  ? "border-sky-400/25 bg-sky-500/10 text-sky-200"
                  : "border-red-400/25 bg-red-500/10 text-red-200"
              }`}
            >
              {isPrimary ? "✓" : "!"}
            </div>
            <div className="min-w-0">
              <p
                className={`text-[10px] font-black uppercase tracking-[0.28em] ${
                  isPrimary ? "text-sky-300" : "text-red-300"
                }`}
              >
                {isPrimary ? "Confirm save" : "Confirm action"}
              </p>
              <h2
                id="admin-confirm-title"
                className="mt-2 font-display text-2xl font-black tracking-[-0.04em] text-white"
              >
                {title}
              </h2>
            </div>
          </div>

          <p id="admin-confirm-description" className="mt-5 text-sm leading-7 text-zinc-400">
            {description}
          </p>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={pending}
              onClick={onCancel}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={onConfirm}
              className={`rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition disabled:opacity-60 ${
                isPrimary
                  ? "border-sky-400/35 bg-sky-400 text-black hover:border-white hover:bg-white"
                  : "border-red-400/35 bg-red-500/15 text-red-100 hover:border-red-300 hover:bg-red-500/25 hover:text-white"
              }`}
            >
              {pending ? pendingLabel : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export type AdminConfirmRequest = {
  title: string;
  description: string;
  confirmLabel?: string;
  pendingLabel?: string;
  tone?: "danger" | "primary";
  onConfirm: () => void | Promise<void>;
};

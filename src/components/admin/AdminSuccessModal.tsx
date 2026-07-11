"use client";

import { useEffect } from "react";

type AdminSuccessModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
};

export function AdminSuccessModal({
  open,
  title,
  description,
  onClose,
}: AdminSuccessModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-success-title"
        aria-describedby={description ? "admin-success-description" : undefined}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-[#080b11] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_68%)]" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-lg font-black text-emerald-200">
              ✓
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">
                Success
              </p>
              <h2
                id="admin-success-title"
                className="mt-2 font-display text-2xl font-black tracking-[-0.04em] text-white"
              >
                {title}
              </h2>
            </div>
          </div>

          {description && (
            <p id="admin-success-description" className="mt-5 text-sm leading-7 text-zinc-400">
              {description}
            </p>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-emerald-400/35 bg-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:border-white hover:bg-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

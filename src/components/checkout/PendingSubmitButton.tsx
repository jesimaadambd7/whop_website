"use client";

import { cn } from "@/lib/utils";

type PendingSubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  name?: string;
  value?: string;
  pending?: boolean;
};

export function PendingSubmitButton({
  children,
  pendingLabel = "Processing...",
  className,
  name,
  value,
  pending = false,
}: PendingSubmitButtonProps) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={pending}
      aria-busy={pending}
      className={cn(
        "rounded-full bg-sky-400 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <span className="inline-flex items-center justify-center gap-2">
        <span>{pending ? pendingLabel : children}</span>
      </span>
    </button>
  );
}

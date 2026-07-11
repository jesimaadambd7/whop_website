"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ResourceUnlockFormProps = {
  slug: string;
  price: string;
  className?: string;
  variant?: "sidebar" | "cta";
};

export function ResourceUnlockForm({
  slug,
  price,
  className,
  variant = "sidebar",
}: ResourceUnlockFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const primaryClass =
    variant === "sidebar"
      ? "w-full rounded-full bg-sky-400 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
      : "w-full rounded-full bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black sm:w-auto disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div
      className={cn(
        variant === "cta" ? "flex flex-col gap-3 sm:flex-row sm:items-center" : "space-y-3",
        className,
      )}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(() => {
            router.push(`/checkout/${slug}`);
          });
        }}
        className={variant === "cta" ? "sm:w-auto" : undefined}
      >
        <button type="submit" disabled={isPending} aria-busy={isPending} className={primaryClass}>
          <span className="inline-flex items-center justify-center gap-2">
            <span>{isPending ? "Opening checkout..." : variant === "cta" ? `Unlock for ${price}` : "Unlock resource"}</span>
          </span>
        </button>
      </form>
      <Link
        href={variant === "cta" ? "/resources/library" : "/resources/login"}
        className={cn(
          "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-bold tracking-tight transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          variant === "cta"
            ? "w-full justify-center border-black/20 bg-white text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)] hover:border-black hover:bg-black hover:text-white sm:w-auto"
            : "w-full justify-center border-white/15 bg-white/5 text-white hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-6",
        )}
      >
        {variant === "cta" ? "My Library" : "Login to Library"}
      </Link>
    </div>
  );
}

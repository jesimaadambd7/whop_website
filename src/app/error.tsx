"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-24">
      <div className="premium-panel max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">Something went wrong</p>
        <h1 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white">
          We hit a snag loading this page.
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Try again, or head back to a stable page while we recover.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-sky-400 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-sky-400/80 hover:bg-sky-400/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

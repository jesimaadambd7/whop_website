"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <section className="flex min-h-screen items-center justify-center px-5 py-24">
          <div className="max-w-lg rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">Application error</p>
            <h1 className="mt-4 font-display text-3xl font-black text-white">UGCViss ran into a problem.</h1>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Refresh the page or try again in a moment.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full bg-sky-400 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}

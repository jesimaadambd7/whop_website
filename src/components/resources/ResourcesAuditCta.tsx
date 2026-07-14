import Link from "next/link";

export function ResourcesAuditCta() {
  return (
    <div className="premium-panel glow-card rounded-[2.5rem] border border-sky-400/25 bg-sky-400 p-7 text-black sm:p-10">
      <p className="text-xs font-black uppercase tracking-[0.3em]">Need direct feedback?</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
        Get a creative audit instead of guessing the next ad.
      </h2>
      <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-black/70">
        Share your site, current creative, and campaign bottleneck. UGCViss will review the fit
        and suggest the clearest next move.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/portfolio#creative-audit"
          className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold tracking-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition duration-300 hover:border-zinc-900 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
        >
          Get Creative Audit
        </Link>
        <Link
          href="/contact#book-call"
          className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-bold tracking-tight text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition duration-300 hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
}

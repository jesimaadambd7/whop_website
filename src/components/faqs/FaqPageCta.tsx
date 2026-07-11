import Link from "next/link";

export function FaqPageCta() {
  return (
    <div className="premium-panel glow-card rounded-[2rem] border border-sky-400/25 bg-sky-400 p-6 text-black sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.28em]">Ready for the next step?</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.05em] sm:text-5xl">
        Tell us what you are launching, scaling, or fixing.
      </h2>
      <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/70 sm:text-base">
        We will help decide whether your brand needs a shoot, UGC ad batch, editing sprint, motion
        polish, paid ads support, or a complete creative system.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact#book-call"
          className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold tracking-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition duration-300 hover:border-zinc-900 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
        >
          Book a Call
        </Link>
        <Link
          href="/contact#inquiry-form"
          className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-bold tracking-tight text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition duration-300 hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
        >
          Send a Brief
        </Link>
      </div>
    </div>
  );
}

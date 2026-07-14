import Link from "next/link";
import { CreatorPortfolioLivePreview } from "@/components/creators/CreatorPortfolioLivePreview";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { PublicCreatorPricing } from "@/lib/admin/creator-pricing-utils";

export function CreatorHero({ pricing }: { pricing: PublicCreatorPricing }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,168,255,0.25),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.08),transparent_25%)]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="inline-flex rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-sky-300">
              UGCViss Creator Portfolio
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-6xl font-black leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl">
              Your work deserves more than a folder link.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-zinc-300">
              Launch a premium mixed-media portfolio, get discovered in a curated creative
              directory, receive client inquiries, understand engagement, and unlock the
              complete UGCViss resource vault.
            </p>

            <div className="mt-9">
              <Link
                href="/creator/signup"
                className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-6 py-4 text-sm font-bold tracking-tight text-black shadow-[0_0_32px_rgba(0,168,255,0.28)] transition duration-300 hover:border-white hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7"
              >
                Create Your Portfolio
              </Link>
            </div>

            <p className="mt-5 text-sm text-zinc-500">{pricing.subheadline}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="premium-panel rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-5">
              <div className="rounded-[2.25rem] border border-sky-400/20 bg-black/70 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                    Live portfolio
                  </span>
                  <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                    {pricing.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <CreatorPortfolioLivePreview />

                <h2 className="mt-6 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
                  A clean portfolio built for creative work.
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Video editing", "UGC ads", "Motion", "Analytics"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

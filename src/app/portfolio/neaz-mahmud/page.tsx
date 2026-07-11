import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CreatorPortfolioGrid } from "@/components/portfolio/CreatorPortfolioGrid";
import { neazPortfolio } from "@/lib/data/creator-portfolio";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: `Portfolio of ${neazPortfolio.name} | ${neazPortfolio.role} | VidCarry`,
  description:
    "A private client-facing gallery of video editing work completed by Neaz Mahmud, Founder & CEO of VidCarry.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function NeazPortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,168,255,0.22),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.08),transparent_28%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
        />
        <Container className="relative">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              {neazPortfolio.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-6xl font-black leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
              Portfolio of{" "}
              <span className="text-sky-400">{neazPortfolio.name}</span>
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
              {neazPortfolio.role}
            </p>
            <p className="mt-7 max-w-4xl text-lg leading-9 text-zinc-300 sm:text-xl">
              {neazPortfolio.bio}
            </p>
          </div>
        </Container>
      </section>

      <section className="relative py-16 sm:py-20">
        <Container>
          <CreatorPortfolioGrid />
        </Container>
      </section>
    </>
  );
}

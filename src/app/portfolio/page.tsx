import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AuditForm } from "@/components/shared/AuditForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { ClientLibraryCard } from "@/components/portfolio/ClientLibraryCard";
import {
  portfolioPageItems,
  portfolioClientLibraries,
} from "@/lib/data/portfolio-page";

export const metadata: Metadata = {
  title: "Creative Portfolio | VidCarry",
  description:
    "View VidCarry creative portfolio work across UGC ads, ecommerce videos, creator-led content, motion graphics, paid social creative, and short-form content.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Client creative libraries for brands that need more winning ads."
        description="Filter campaign formats across UGC ads, ecommerce videos, YouTube edits, motion graphics, paid social assets, and short-form content, then open each client library to explore the work."
      />

      <SectionShell>
        <Container>
          <PortfolioFilter items={portfolioPageItems} />
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Client work library
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Every client gets a focused library for videos, shoots, edits, and ad assets.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Open each brand to explore its dedicated video library with campaign formats,
              creative angles, deliverables, and sales-focused production notes.
            </p>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {portfolioClientLibraries.map((client) => (
              <ClientLibraryCard key={client.slug} client={client} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <AuditForm id="creative-audit" bordered />
      <CtaBanner title="Have a product ready? We can shoot, edit, and launch the campaign." />
    </>
  );
}

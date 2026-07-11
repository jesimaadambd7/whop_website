import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PortfolioPreviewCard } from "@/components/shared/PortfolioPreviewCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { portfolioItems } from "@/lib/data/portfolio";

export function PortfolioPreview() {
  const preview = portfolioItems.filter((item) => item.featured).slice(0, 3);

  return (
    <SectionShell withGrid>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Portfolio
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Client creative built for paid social, ecommerce, and sales.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            Explore selected campaign formats across UGC ads, ecommerce videos,
            product explainers, short-form content, and motion-led performance
            creative.
          </p>
        </Reveal>

        <Stagger className="grid auto-rows-fr items-stretch gap-6 lg:grid-cols-3" stagger={0.1}>
          {preview.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <PortfolioPreviewCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10" delay={0.2}>
          <Link
            href="/portfolio"
            className="glass-hover-btn inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold tracking-tight text-white transition duration-300 hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-6"
          >
            View Portfolio
          </Link>
        </Reveal>
      </Container>
    </SectionShell>
  );
}

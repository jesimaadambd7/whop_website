"use client";

import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { PortfolioMediaPlayer } from "@/components/shared/PortfolioMediaPlayer";
import type { PortfolioItem } from "@/lib/data/portfolio";

type PortfolioPreviewCardProps = {
  item: PortfolioItem;
};

export function PortfolioPreviewCard({ item }: PortfolioPreviewCardProps) {
  const eyebrow = item.eyebrow ?? item.industry ?? item.client ?? "Selected Work";

  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      className="portfolio-preview-card h-full overflow-hidden"
      bodyClassName="flex h-full flex-col overflow-hidden p-0"
    >
      <PortfolioMediaPlayer item={item} />

      <div className="relative z-[1] p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-3 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
            {item.description}
          </p>
        )}
        <Link
          href={item.href}
          className="glass-hover-btn mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:border-sky-400 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          View Project
        </Link>
      </div>
    </AnimatedGlassCard>
  );
}

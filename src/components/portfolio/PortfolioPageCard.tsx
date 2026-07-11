"use client";

import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { PortfolioMediaPlayer } from "@/components/shared/PortfolioMediaPlayer";
import type { PortfolioItem } from "@/lib/data/portfolio";

type PortfolioPageCardProps = {
  item: PortfolioItem;
};

export function PortfolioPageCard({ item }: PortfolioPageCardProps) {
  const eyebrow = item.clientType ?? item.eyebrow ?? item.industry ?? item.client ?? "Selected Work";

  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      className="group h-full overflow-hidden"
      bodyClassName="flex h-full flex-col overflow-hidden p-0"
    >
      <div className="bg-black/35 p-4">
        <div className="mx-auto w-full max-w-[300px]">
          <PortfolioMediaPlayer item={item} compact />
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-400">{eyebrow}</p>
        <h3 className="mt-3 font-display text-2xl font-black tracking-[-0.04em] text-white">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
        )}
        <Link
          href={item.href}
          className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:border-sky-400 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          View Project
        </Link>
      </div>
    </AnimatedGlassCard>
  );
}

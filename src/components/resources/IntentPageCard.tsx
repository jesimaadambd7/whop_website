"use client";

import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { IntentPage } from "@/lib/data/resources";

type IntentPageCardProps = {
  page: IntentPage;
};

export function IntentPageCard({ page }: IntentPageCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      stretch
      className="h-full w-full"
      bodyClassName="resource-intent-card__body p-6"
    >
      <Link href={page.href} className="relative z-[1] block h-full">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
          {page.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
          {page.title}
        </h2>
      </Link>
    </AnimatedGlassCard>
  );
}

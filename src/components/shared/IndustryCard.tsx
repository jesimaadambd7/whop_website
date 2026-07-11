"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type IndustryCardProps = {
  index: number;
  title: string;
};

export function IndustryCard({ index, title }: IndustryCardProps) {
  return (
    <AnimatedGlassCard
      variant="chip"
      rounded="rounded-[1.75rem]"
      stretch
      className="h-full w-full"
      bodyClassName="industry-card__body flex-col bg-black/45 p-5"
    >
      <p className="relative z-[1] shrink-0 text-xs font-black uppercase tracking-[0.24em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="relative z-[1] mt-4 min-h-[4.75rem] flex-1 font-display text-2xl font-black leading-tight tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50 sm:min-h-[5.25rem]">
        {title}
      </h3>
    </AnimatedGlassCard>
  );
}

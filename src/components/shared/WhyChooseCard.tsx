"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type WhyChooseCardProps = {
  index: number;
  title: string;
};

export function WhyChooseCard({ index, title }: WhyChooseCardProps) {
  return (
    <AnimatedGlassCard
      variant="card"
      rounded="rounded-[2rem]"
      stretch
      className="h-full w-full"
      bodyClassName="p-7"
    >
      <p className="relative z-[1] shrink-0 text-sm font-black text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="relative z-[1] mt-4 min-h-[4rem] flex-1 font-display text-2xl font-black leading-tight tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50 sm:min-h-[4.5rem]">
        {title}
      </h3>
    </AnimatedGlassCard>
  );
}

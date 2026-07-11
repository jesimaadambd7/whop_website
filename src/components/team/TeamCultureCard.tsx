"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type TeamCultureCardProps = {
  title: string;
  description: string;
};

export function TeamCultureCard({ title, description }: TeamCultureCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      stretch
      className="h-full w-full"
      bodyClassName="team-culture-card__body flex h-full flex-col p-7"
    >
      <h3 className="relative z-[1] font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
        {title}
      </h3>
      <p className="relative z-[1] mt-4 flex-1 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
        {description}
      </p>
    </AnimatedGlassCard>
  );
}

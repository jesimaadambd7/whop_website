"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type CreatorBenefitCardProps = {
  step: string;
  title: string;
  description: string;
};

export function CreatorBenefitCard({ step, title, description }: CreatorBenefitCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      stretch
      className="h-full w-full"
      bodyClassName="creator-benefit-card__body flex h-full flex-col p-7"
    >
      <p className="relative z-[1] text-sm font-black text-sky-300 transition duration-400 group-hover/glass:text-sky-200">
        {step}
      </p>
      <h2 className="relative z-[1] mt-4 font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
        {title}
      </h2>
      <p className="relative z-[1] mt-4 flex-1 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
        {description}
      </p>
    </AnimatedGlassCard>
  );
}

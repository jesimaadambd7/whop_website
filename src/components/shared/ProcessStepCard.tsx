"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type ProcessStepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function ProcessStepCard({ step, title, description }: ProcessStepCardProps) {
  return (
    <AnimatedGlassCard
      variant="card"
      rounded="rounded-[2rem]"
      stretch
      className="h-full w-full"
      bodyClassName="p-7"
    >
      <span className="relative z-[1] text-xs font-black uppercase tracking-[0.28em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
        {step}
      </span>
      <h3 className="relative z-[1] mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-50">
        {title}
      </h3>
      <p className="relative z-[1] mt-4 flex-1 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
        {description}
      </p>
    </AnimatedGlassCard>
  );
}

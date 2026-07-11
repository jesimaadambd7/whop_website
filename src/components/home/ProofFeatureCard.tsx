"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type ProofFeatureCardProps = {
  num: string;
  title: string;
  description: string;
};

export function ProofFeatureCard({ num, title, description }: ProofFeatureCardProps) {
  return (
    <AnimatedGlassCard
      variant="chip"
      bodyClassName="flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6"
    >
      <span className="proof-feature-num relative z-[1] shrink-0">
        {num}
      </span>
      <div className="relative z-[1] min-w-0">
        <h3 className="font-display text-lg font-semibold text-white transition duration-400 group-hover/glass:text-sky-100">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
          {description}
        </p>
      </div>
    </AnimatedGlassCard>
  );
}

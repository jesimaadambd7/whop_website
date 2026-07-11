"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { CountUp } from "@/components/ui/CountUp";

export function ProofStatCard({ value, label }: { value: string; label: string }) {
  return (
    <AnimatedGlassCard variant="card" bodyClassName="p-4 sm:p-5">
      <p className="relative z-[1] font-display text-2xl font-bold tracking-tight text-white transition duration-400 group-hover/glass:text-sky-100 sm:text-3xl">
        {value.match(/^\d/) ? <CountUp value={value} /> : value}
      </p>
      <p className="relative z-[1] mt-3 text-xs leading-relaxed text-zinc-500 transition duration-400 group-hover/glass:text-zinc-400">
        {label}
      </p>
    </AnimatedGlassCard>
  );
}

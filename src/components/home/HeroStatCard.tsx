"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { CountUp } from "@/components/ui/CountUp";

export function HeroStatCard({ value, label }: { value: string; label: string }) {
  return (
    <AnimatedGlassCard
      variant="card"
      className="min-h-[7.25rem] sm:min-h-[7.5rem]"
      bodyClassName="p-4"
    >
      <p className="hero-stat-value relative z-[1] font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-100">
        <CountUp value={value} />
      </p>
      <p className="relative z-[1] mt-auto pt-3 text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-zinc-500 transition duration-400 group-hover/glass:text-zinc-400 sm:text-xs sm:tracking-[0.16em]">
        {label}
      </p>
    </AnimatedGlassCard>
  );
}

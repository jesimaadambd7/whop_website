"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { guideInsightParagraphs, type FeaturedGuide } from "@/lib/data/resources";

type FeaturedGuideCardProps = {
  guide: FeaturedGuide;
};

export function FeaturedGuideCard({ guide }: FeaturedGuideCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2.25rem]"
      stretch
      className="h-full w-full"
      bodyClassName="resource-guide-card__body p-6 sm:p-8"
    >
      <article id={guide.id} className="relative z-[1]">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
          {guide.category} / {guide.number}
        </p>
        <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-50 sm:text-4xl">
          {guide.title}
        </h2>
        <p className="mt-5 text-base leading-8 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
          {guide.description}
        </p>
        <div className="mt-7 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/35 p-4 text-sm leading-7 text-zinc-300">
          {guideInsightParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </AnimatedGlassCard>
  );
}

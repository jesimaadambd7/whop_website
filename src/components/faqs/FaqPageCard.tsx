"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";

type FaqPageCardProps = {
  index: number;
  question: string;
  answer: string;
};

export function FaqPageCard({ index, question, answer }: FaqPageCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[1.75rem]"
      className="w-full"
      bodyClassName="faq-page-card__body p-5 sm:p-7"
    >
      <article className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:gap-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-sky-400/25 bg-sky-400/10 font-display text-lg font-black text-sky-300 transition duration-400 group-hover/glass:border-sky-400/50 group-hover/glass:bg-sky-400/20">
          {number}
        </span>
        <div>
          <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
            {question}
          </h3>
          <p className="mt-4 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300 sm:text-base sm:leading-8">
            {answer}
          </p>
        </div>
      </article>
    </AnimatedGlassCard>
  );
}

"use client";

import { useState } from "react";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import {
  carouselVideos,
  dashboardCuts,
  type ShowreelVideo,
} from "@/lib/data/showreel-media";
import { ShowreelCarousel } from "@/components/ui/ShowreelVideo";

function cutSubtitle(
  cut: (typeof dashboardCuts)[number],
  activeTitle: string,
): string {
  return typeof cut.subtitle === "function" ? cut.subtitle(activeTitle) : cut.subtitle;
}

export function ShowreelCommandCenter({
  videos = carouselVideos,
}: {
  videos?: ShowreelVideo[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTitle = videos[activeIndex]?.title ?? videos[0].title;

  return (
    <div className="showreel-shell group/showreel relative pb-12 sm:pb-14">
      <div className="aurora-orb absolute -inset-10 rounded-full bg-sky-400/20 blur-3xl" />

      <AnimatedGlassCard
        variant="panel"
        className="showreel-dashboard shadow-2xl shadow-sky-950/40"
        bodyClassName="p-4 sm:p-5"
      >
        <div className="absolute right-5 top-5 z-20 h-20 w-20 rounded-full bg-sky-400/20 blur-2xl" />

        <div className="overflow-hidden rounded-[2rem] border border-sky-400/20 bg-black/80 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
                Showreel command
              </p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.05em] text-white">
                Shoot to Sales
              </h2>
            </div>
            <div className="rounded-full border border-sky-400/30 bg-sky-400 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(0,168,255,0.45)]">
              Live
            </div>
          </div>

          <ShowreelCarousel
            videos={videos}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          <div className="mt-4 grid gap-3">
            {dashboardCuts.map((cut) => (
              <AnimatedGlassCard
                key={cut.id}
                variant="chip"
                bodyClassName="flex-row items-center gap-3 p-3"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sm font-black text-sky-300 transition duration-500 group-hover/glass:border-sky-300/40 group-hover/glass:bg-sky-400/20 group-hover/glass:shadow-[0_0_20px_rgba(0,168,255,0.25)]">
                  {cut.id}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white">{cut.label}</p>
                  <p className="truncate text-sm text-zinc-500">{cutSubtitle(cut, activeTitle)}</p>
                </div>
                <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(0,168,255,0.7)]" />
              </AnimatedGlassCard>
            ))}
          </div>
        </div>
      </AnimatedGlassCard>

      <div className="absolute -bottom-1 left-0 z-20 rounded-3xl border border-white/20 bg-white/95 p-5 text-black shadow-2xl backdrop-blur-xl transition duration-500 ease-out group-hover/showreel:-translate-y-1.5 group-hover/showreel:border-sky-300/60 group-hover/showreel:shadow-[0_24px_60px_rgba(0,168,255,0.28)] sm:-left-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
          Built for
        </p>
        <p className="mt-1 font-display text-2xl font-black tracking-[-0.05em]">
          Campaign scale
        </p>
      </div>
    </div>
  );
}

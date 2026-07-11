"use client";

import { useState } from "react";
import {
  neazPortfolio,
  neazPortfolioFilters,
  type NeazPortfolioFilter,
} from "@/lib/data/creator-portfolio";
import { PortfolioVideoTile } from "@/components/portfolio/PortfolioVideoTile";
import { cn } from "@/lib/utils";

export function CreatorPortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<NeazPortfolioFilter>("All");

  const filtered =
    activeFilter === "All"
      ? neazPortfolio.videos
      : neazPortfolio.videos.filter((video) => video.filter === activeFilter);

  return (
    <>
      <div
        className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur"
        aria-label="Filter Neaz Mahmud portfolio videos"
      >
        <div className="flex gap-2 overflow-x-auto pb-1">
          {neazPortfolioFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition",
                activeFilter === filter
                  ? "border-sky-300 bg-sky-400 text-black shadow-[0_0_28px_rgba(56,189,248,0.28)]"
                  : "border-white/10 bg-black/30 text-zinc-400 hover:border-sky-300/45 hover:text-white",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((video) => (
          <div
            key={video.id}
            className="premium-panel glow-card overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-3 transition duration-300 hover:-translate-y-1 hover:border-sky-400/45"
          >
            <PortfolioVideoTile
              title={video.title}
              aspect={video.aspect}
              videoSrc={video.videoSrc}
              posterSrc={video.posterSrc}
            />
          </div>
        ))}
      </div>
    </>
  );
}

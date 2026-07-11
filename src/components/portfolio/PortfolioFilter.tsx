"use client";

import { useState } from "react";
import { PortfolioPageCard } from "@/components/portfolio/PortfolioPageCard";
import { Reveal } from "@/components/ui/Reveal";
import { portfolioCategories } from "@/lib/data/portfolio";
import type { PortfolioItem } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

type PortfolioFilterProps = {
  items: PortfolioItem[];
};

export function PortfolioFilter({ items }: PortfolioFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <Reveal>
      <div className="mb-10 flex flex-wrap gap-3">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              activeCategory === cat
                ? "border-sky-400 bg-sky-400 text-black shadow-[0_0_28px_rgba(0,168,255,0.18)]"
                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-white",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <PortfolioPageCard key={item.id} item={item} />
        ))}
      </div>
    </Reveal>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { ShowreelCarousel } from "@/components/ui/ShowreelVideo";
import { carouselSlides, carouselVideos } from "@/lib/data/showreel-media";
import { cn } from "@/lib/utils";

export function ShowreelSection() {
  const [activeCut, setActiveCut] = useState(0);

  return (
    <SectionShell withGrid>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Showreel command"
            title="Live campaign creative, ready to test and scale."
            description="Every cut is built for paid social — hook pacing, proof beats, captions, and CTA variants included."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-sky-400/20 bg-[#0a1628]/60 shadow-[0_0_60px_rgba(0,188,254,0.1)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Live", color: "bg-emerald-400" },
                    { label: "18 Ad cuts" },
                    { label: "4:5 Frame" },
                    { label: "UGC Format" },
                  ].map((badge) => (
                    <span key={badge.label} className="tag-pill">
                      {badge.color && (
                        <span className={cn("h-1.5 w-1.5 rounded-full", badge.color)} />
                      )}
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px] lg:items-start">
                <ShowreelCarousel
                  videos={carouselVideos}
                  activeIndex={activeCut}
                  onSelect={setActiveCut}
                />

                <div className="flex flex-col gap-2">
                  {carouselSlides.map((cut, i) => (
                    <button
                      key={cut.id}
                      type="button"
                      onClick={() => setActiveCut(i)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                        activeCut === i
                          ? "border-sky-400/40 bg-sky-400/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20",
                      )}
                    >
                      <span className="font-mono text-xs text-zinc-600">{cut.id}</span>
                      <div className="flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-sky-400">
                          {cut.label}
                        </p>
                        <p className="text-sm font-medium text-white">{cut.subtitle}</p>
                      </div>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          activeCut === i
                            ? "bg-sky-400 shadow-[0_0_8px_rgba(0,188,254,0.8)]"
                            : "bg-zinc-700",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionShell>
  );
}

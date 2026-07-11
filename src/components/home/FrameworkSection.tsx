"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { winningFrameworkVideoSrc } from "@/lib/data/showreel-media";
import { cn } from "@/lib/utils";

type FrameworkBeat = {
  id: string;
  step: string;
  label: string;
  tag: string;
  headline: string;
  description: string;
  seekRatio: number;
};

const frameworkBeats: FrameworkBeat[] = [
  {
    id: "hook",
    step: "01",
    label: "Hook",
    tag: "Scroll stop",
    headline: "Own the first three seconds.",
    description: "Open with tension, curiosity, or a visual pattern interrupt that makes the thumb pause.",
    seekRatio: 0,
  },
  {
    id: "problem",
    step: "02",
    label: "Problem",
    tag: "Pain mirror",
    headline: "Name the pain they already feel.",
    description: "Reflect the buyer's frustration in plain language so the ad feels written for them.",
    seekRatio: 0.1,
  },
  {
    id: "failed-sol",
    step: "03",
    label: "Failed Sol",
    tag: "Pattern break",
    headline: "Show what did not work.",
    description: "Call out failed alternatives so your product feels like the smarter next move.",
    seekRatio: 0.2,
  },
  {
    id: "intro",
    step: "04",
    label: "Intro",
    tag: "Product entry",
    headline: "Introduce the better path.",
    description: "Bring the product in as the answer without rushing the story or losing credibility.",
    seekRatio: 0.32,
  },
  {
    id: "usp",
    step: "05",
    label: "USP",
    tag: "Mechanism",
    headline: "Reveal the unique mechanism.",
    description: "Highlight what makes this offer different from every other option in the feed.",
    seekRatio: 0.44,
  },
  {
    id: "proof",
    step: "06",
    label: "Proof",
    tag: "Trust layer",
    headline: "Back the claim with evidence.",
    description: "Use demos, reviews, results, or creator credibility to make the promise believable.",
    seekRatio: 0.56,
  },
  {
    id: "benefits",
    step: "07",
    label: "Benefits",
    tag: "Outcome stack",
    headline: "Stack outcomes buyers want.",
    description: "Translate features into emotional and practical wins the audience can picture.",
    seekRatio: 0.68,
  },
  {
    id: "der",
    step: "08",
    label: "D E R",
    tag: "Offer frame",
    headline: "Deliver, explain, reinforce.",
    description: "Walk through the offer clearly so price, value, and urgency land in sequence.",
    seekRatio: 0.8,
  },
  {
    id: "cta",
    step: "09",
    label: "CTA",
    tag: "Close",
    headline: "Drive the next step.",
    description: "End with one unmistakable action: shop now, claim the offer, or tap through.",
    seekRatio: 0.92,
  },
];

function formatTimestamp(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function FrameworkSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeBeat, setActiveBeat] = useState(frameworkBeats[0].id);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const current =
    frameworkBeats.find((beat) => beat.id === activeBeat) ?? frameworkBeats[0];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekToBeat = useCallback((beat: FrameworkBeat) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = video.duration * beat.seekRatio;
    void video.play().catch(() => undefined);
  }, []);

  const handleBeatSelect = useCallback(
    (beat: FrameworkBeat) => {
      setActiveBeat(beat.id);
      seekToBeat(beat);
    },
    [seekToBeat],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setDuration(video.duration || 0);
      seekToBeat(frameworkBeats[0]);
    };
    const onTimeUpdate = () => setCurrentTime(video.currentTime || 0);

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);

    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [seekToBeat]);

  return (
    <SectionShell withGrid withOrb>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Leverage our creative library of"
            title="Winning Frameworks"
            description="Every framework stage is tied to the video itself. Select Hook, Problem, USP, Proof, or CTA to jump the creative example to that beat and see how structure changes the message."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="framework-studio group/framework relative">
            <div className="aurora-orb absolute -inset-8 rounded-full bg-sky-400/15 blur-3xl" />

            <AnimatedGlassCard
              variant="panel"
              className="framework-studio__panel shadow-2xl shadow-sky-950/35"
              bodyClassName="overflow-hidden p-4 sm:p-5 lg:p-6"
            >
              <div className="overflow-hidden rounded-[2rem] border border-sky-400/20 bg-black/80 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
                      Framework studio
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
                      Direct-response ad structure
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                      {current.step} / 09
                    </span>
                    <span className="rounded-full border border-sky-400/30 bg-sky-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(0,168,255,0.45)]">
                      Interactive
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,300px)]">
                  <div className="framework-studio__beats hidden xl:block">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                      Beat map
                    </p>
                    <div className="space-y-2">
                      {frameworkBeats.map((beat) => {
                        const isActive = beat.id === activeBeat;
                        return (
                          <button
                            key={beat.id}
                            type="button"
                            onClick={() => handleBeatSelect(beat)}
                            className={cn(
                              "framework-studio__beat group/beat flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition duration-300",
                              isActive
                                ? "border-sky-400/40 bg-sky-400/10 shadow-[0_0_24px_rgba(0,168,255,0.18)]"
                                : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]",
                            )}
                          >
                            <span
                              className={cn(
                                "grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-xs font-black transition duration-300",
                                isActive
                                  ? "border-sky-300/40 bg-sky-400/20 text-sky-200"
                                  : "border-white/10 bg-black/40 text-zinc-500 group-hover/beat:text-zinc-300",
                              )}
                            >
                              {beat.step}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block text-sm font-bold transition-colors",
                                  isActive ? "text-white" : "text-zinc-400 group-hover/beat:text-zinc-200",
                                )}
                              >
                                {beat.label}
                              </span>
                              <span className="block truncate text-[11px] text-zinc-500">{beat.tag}</span>
                            </span>
                            {isActive && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(0,168,255,0.8)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(0,168,255,0.28),transparent_34%),linear-gradient(145deg,#020617,#082f49_52%,#00a8ff)] p-4 sm:p-5">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_36%,rgba(0,0,0,0.45))]" />

                      <div className="relative z-[1] mx-auto max-w-[300px]">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] border border-white/15 bg-black shadow-[0_26px_70px_rgba(0,0,0,0.45)]">
                          <video
                            ref={videoRef}
                            src={winningFrameworkVideoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controlsList="nodownload noplaybackrate noremoteplayback"
                            disablePictureInPicture
                            preload="metadata"
                            aria-label="Winning framework example"
                            className="absolute inset-0 h-full w-full object-cover"
                          />

                          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent p-4">
                            <div className="flex items-center justify-between gap-3">
                              <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                                {current.label}
                              </span>
                              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-sky-200 backdrop-blur">
                                {formatTimestamp(currentTime)}
                              </span>
                            </div>
                          </div>

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                              {current.tag}
                            </p>
                            <p className="mt-1 font-display text-lg font-bold leading-tight text-white">
                              {current.headline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-[1] mt-5">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                          <span>Timeline</span>
                          <span>{duration > 0 ? formatTimestamp(duration) : "0:00"}</span>
                        </div>
                        <div className="relative h-2.5 overflow-hidden rounded-full bg-black/50 ring-1 ring-white/10">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 to-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.65)]"
                            style={{ width: `${progress}%` }}
                            layout
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                          />
                          {frameworkBeats.map((beat) => (
                            <button
                              key={beat.id}
                              type="button"
                              aria-label={`Jump to ${beat.label}`}
                              onClick={() => handleBeatSelect(beat)}
                              className="absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/70 transition duration-300 hover:scale-125"
                              style={{
                                left: `${beat.seekRatio * 100}%`,
                                backgroundColor:
                                  beat.id === activeBeat ? "rgb(125 211 252)" : "rgba(255,255,255,0.45)",
                                boxShadow:
                                  beat.id === activeBeat
                                    ? "0 0 12px rgba(125,211,252,0.85)"
                                    : undefined,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="framework-studio__beats mt-4 xl:hidden">
                      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {frameworkBeats.map((beat) => {
                          const isActive = beat.id === activeBeat;
                          return (
                            <button
                              key={beat.id}
                              type="button"
                              onClick={() => handleBeatSelect(beat)}
                              className={cn(
                                "shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-300",
                                isActive
                                  ? "border-sky-400/50 bg-sky-400/15 text-sky-200 shadow-[0_0_20px_rgba(0,168,255,0.2)]"
                                  : "border-white/10 bg-white/5 text-zinc-400",
                              )}
                            >
                              {beat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-300">
                          <Play size={14} fill="currentColor" />
                        </span>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                            Creative note
                          </p>
                          <p className="text-xs font-bold text-white">VidCarry framework read</p>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeBeat}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-5"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-400">
                            {current.tag}
                          </p>
                          <h4 className="mt-2 font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-[1.75rem]">
                            {current.headline}
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                            {current.description}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[
                          { value: "9", label: "Beats" },
                          { value: "DR", label: "Format" },
                          { value: "UGC", label: "Style" },
                        ].map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-2xl border border-white/10 bg-black/35 p-3 text-center backdrop-blur"
                          >
                            <p className="font-display text-xl font-black tracking-[-0.05em] text-white">
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
                      <Button href="/portfolio" variant="secondary" size="sm" className="glass-hover-btn">
                        See More Video Ads
                      </Button>
                      <Button href="/contact" size="sm">
                        Build This Flow
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGlassCard>

            <div className="absolute -bottom-2 left-4 z-20 hidden rounded-3xl border border-white/20 bg-white/95 p-4 text-black shadow-2xl backdrop-blur-xl transition duration-500 ease-out group-hover/framework:-translate-y-1.5 group-hover/framework:border-sky-300/60 group-hover/framework:shadow-[0_24px_60px_rgba(0,168,255,0.28)] sm:block lg:left-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                Active beat
              </p>
              <p className="mt-1 font-display text-xl font-black tracking-[-0.05em]">
                {current.label}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionShell>
  );
}

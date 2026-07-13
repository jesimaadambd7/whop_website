"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

function formatScrollTimecode(progress: number): string {
  const totalFrames = Math.floor(progress * 24 * 60);
  const minutes = Math.floor(totalFrames / (24 * 60));
  const seconds = Math.floor((totalFrames % (24 * 60)) / 24);
  const frames = totalFrames % 24;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

export function ScrollTimelineProgress() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-20 z-[45] hidden sm:block"
      aria-hidden="true"
    >
      <div className="relative h-[3px] bg-white/[0.04]">
        <div
          className="cine-scroll-progress absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="cine-scroll-playhead absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-amber-200 bg-amber-300 shadow-[0_0_8px_rgba(253,224,71,0.8)]"
          style={{ left: `calc(${progress * 100}% - 5px)` }}
        />
      </div>
      <div className="absolute right-4 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
        {formatScrollTimecode(progress)}
      </div>
    </div>
  );
}

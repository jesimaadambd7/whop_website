"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function formatScrollTimecode(progress: number): string {
  const totalFrames = Math.floor(progress * 24 * 60);
  const minutes = Math.floor(totalFrames / (24 * 60));
  const seconds = Math.floor((totalFrames % (24 * 60)) / 24);
  const frames = totalFrames % 24;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

/** Scroll-linked NLE bar driven with rAF + CSS vars (no React setState on scroll). */
export function ScrollTimelineProgress() {
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const pendingRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function paint() {
      pendingRef.current = false;
      const progress = progressRef.current;
      const pct = `${(progress * 100).toFixed(2)}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (playheadRef.current) playheadRef.current.style.left = pct;
      if (timecodeRef.current) {
        timecodeRef.current.textContent = formatScrollTimecode(progress);
      }
    }

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      progressRef.current = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (!pendingRef.current) {
        pendingRef.current = true;
        rafRef.current = requestAnimationFrame(paint);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-20 z-[45] hidden sm:block"
      aria-hidden="true"
    >
      <div className="relative h-[2px] overflow-hidden bg-white/[0.04]">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
        <div
          ref={playheadRef}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-amber-200 bg-amber-300 will-change-[left]"
          style={{ left: "0%" }}
        />
      </div>
      <div
        ref={timecodeRef}
        className="absolute right-4 top-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600"
      >
        00:00:00
      </div>
    </div>
  );
}

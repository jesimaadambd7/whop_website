"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const CLIPS = [
  { label: "Hook", width: "18%", color: "bg-sky-400/70", track: 0 },
  { label: "UGC", width: "22%", color: "bg-cyan-300/60", track: 0 },
  { label: "Product", width: "16%", color: "bg-sky-500/55", track: 0 },
  { label: "VO", width: "28%", color: "bg-violet-400/45", track: 1 },
  { label: "SFX", width: "20%", color: "bg-emerald-400/40", track: 1 },
  { label: "Lower Third", width: "24%", color: "bg-amber-300/50", track: 2 },
  { label: "Color", width: "14%", color: "bg-rose-400/40", track: 2 },
];

const TRACKS = ["V1", "A1", "GFX"];

function formatTimecode(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const f = Math.floor((totalSeconds % 1) * 24);
  return [h, m, s, f]
    .map((v, i) => (i === 0 ? String(v) : String(v).padStart(2, "0")))
    .join(":");
}

type VideoTimelineStripProps = {
  className?: string;
};

export function VideoTimelineStrip({ className }: VideoTimelineStripProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const [playhead, setPlayhead] = useState(12);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !visible) return;

    const start = Date.now();
    // 5fps is enough for timecode UI — was 24fps React updates forever
    const id = window.setInterval(() => {
      const secs = ((Date.now() - start) / 1000) % 48;
      setElapsed(secs);
      setPlayhead(8 + (secs / 48) * 84);
    }, 200);

    return () => clearInterval(id);
  }, [prefersReducedMotion, visible]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "cine-timeline overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {visible && !prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-50" />
              )}
              <span className="relative h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-400">
              Rec
            </span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:inline">
            Edit session
          </span>
        </div>
        <span className="font-mono text-[11px] tabular-nums tracking-wider text-sky-300/90">
          {formatTimecode(elapsed)}
        </span>
      </div>

      <div className="relative px-4 py-3">
        <div className="grid grid-cols-[1.75rem_1fr] gap-x-2 gap-y-1.5">
          {TRACKS.map((track, trackIndex) => (
            <Fragment key={track}>
              <span className="flex items-center text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                {track}
              </span>
              <div className="relative h-7 min-w-0 overflow-hidden rounded-md border border-white/[0.06] bg-white/[0.02]">
                {CLIPS.filter((c) => c.track === trackIndex).map((clip, i) => (
                  <div
                    key={clip.label}
                    className={cn(
                      "cine-clip absolute top-1 bottom-1 flex items-center overflow-hidden rounded px-2",
                      clip.color,
                    )}
                    style={{
                      left: `${8 + i * 24}%`,
                      width: clip.width,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    <span className="truncate text-[9px] font-semibold text-black/80">
                      {clip.label}
                    </span>
                  </div>
                ))}
                {trackIndex === 1 && (
                  <div className="cine-waveform absolute inset-x-[8%] inset-y-2 opacity-30" />
                )}
              </div>
            </Fragment>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-3 left-[calc(1rem+1.75rem+0.5rem)] right-4 top-3">
          <div
            className="cine-playhead absolute bottom-0 top-0 w-px bg-amber-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]"
            style={{ left: `${playhead}%` }}
          >
            <div className="absolute -left-1.5 -top-1 h-3 w-3 rotate-45 border border-amber-200 bg-amber-300 shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

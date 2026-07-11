"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PortfolioVideoTileProps = {
  title: string;
  aspect?: "9:16" | "4:5" | "16:9";
  videoSrc?: string;
  posterSrc?: string;
  gradient?: string;
  format?: string;
  duration?: string;
  compact?: boolean;
  showMeta?: boolean;
  className?: string;
};

function aspectClass(aspect: PortfolioVideoTileProps["aspect"]) {
  if (aspect === "4:5") return "aspect-[4/5]";
  if (aspect === "16:9") return "aspect-video";
  return "aspect-[9/16]";
}

function MediaPlaceholder() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden bg-[radial-gradient(circle_at_26%_18%,rgba(0,168,255,0.42),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(145deg,#020617,#07111f_52%,#000)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/20 bg-sky-300/10 blur-2xl" />
      <div className="absolute inset-x-5 bottom-5 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full bg-sky-300/70" />
      </div>
    </div>
  );
}

export function PortfolioVideoTile({
  title,
  aspect = "9:16",
  videoSrc,
  posterSrc,
  gradient = "linear-gradient(135deg,#020617 0%,#0369a1 52%,#00a8ff 100%)",
  format,
  duration,
  compact = false,
  showMeta = false,
  className,
}: PortfolioVideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(videoSrc);
  const showPlaceholder = !videoSrc && !posterSrc;

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => undefined);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black",
        aspectClass(aspect),
        className,
      )}
      style={{ background: gradient }}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          poster={posterSrc}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          playsInline
          preload="none"
          aria-label={title}
          draggable={false}
          className="absolute inset-0 h-full w-full bg-black object-cover"
          src={videoSrc}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={posterSrc}
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
      ) : null}

      {showPlaceholder && <MediaPlaceholder />}

      {canPlay && !playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 z-20 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
          aria-label={`Play ${title}`}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/35 bg-black/55 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_0_45px_rgba(0,168,255,0.24)] backdrop-blur transition hover:scale-110 hover:border-sky-300 hover:bg-sky-400 hover:text-black">
            Play
          </span>
        </button>
      )}

      {showMeta && (
        <>
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          {duration && (
            <div className="pointer-events-none absolute left-3 top-3 z-30 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur">
              {duration}
            </div>
          )}
          <div className="pointer-events-none absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur">
            {aspect}
          </div>
          {format && (
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-30">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-100">
                {format}
              </p>
            </div>
          )}
        </>
      )}

      {!showMeta && (
        <span className="pointer-events-none absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur">
          {aspect}
        </span>
      )}

      {!compact && !showMeta && null}
    </div>
  );
}

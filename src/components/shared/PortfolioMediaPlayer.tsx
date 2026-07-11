"use client";

import { useCallback, useRef, useState } from "react";
import type { PortfolioItem } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

const mediaGradient =
  "linear-gradient(135deg, rgb(2, 6, 23) 0%, rgb(3, 105, 161) 52%, rgb(0, 168, 255) 100%)";

type PortfolioMediaPlayerProps = {
  item: PortfolioItem;
  compact?: boolean;
};

function aspectClass(aspect: PortfolioItem["aspect"]) {
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

export function PortfolioMediaPlayer({ item, compact = false }: PortfolioMediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasMedia = Boolean(item.videoSrc || item.posterSrc);

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
        "scanline-overlay relative overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.42)]",
        aspectClass(item.aspect),
      )}
      style={{ background: mediaGradient }}
    >
      {item.videoSrc ? (
        <video
          ref={videoRef}
          poster={item.posterSrc}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          playsInline
          preload="none"
          aria-label={item.title}
          draggable={false}
          className="absolute inset-0 h-full w-full bg-black object-cover"
          src={item.videoSrc}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : item.posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={item.posterSrc}
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
      ) : (
        <MediaPlaceholder />
      )}

      {hasMedia && !playing && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 z-20 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
          aria-label={`Play ${item.title}`}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/35 bg-black/55 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_0_45px_rgba(0,168,255,0.24)] backdrop-blur transition hover:scale-110 hover:border-sky-300 hover:bg-sky-400 hover:text-black">
            Play
          </span>
        </button>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20"
      />

      <div
        className={cn(
          "pointer-events-none absolute z-30 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur",
          compact ? "left-4 top-4" : "left-5 top-5",
        )}
      >
        {item.category}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute z-30 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur",
          compact ? "right-4 top-4" : "right-5 top-5",
        )}
      >
        {item.aspect}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div className="h-full w-2/3 bg-sky-300 transition duration-500 group-hover/glass:w-full group-hover:w-full" />
      </div>
    </div>
  );
}

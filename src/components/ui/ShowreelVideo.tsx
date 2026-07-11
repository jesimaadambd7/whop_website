"use client";

import { type ShowreelVideo, heroShowreelVideo } from "@/lib/data/showreel-media";
import { cn } from "@/lib/utils";

type CardPosition = "left" | "center" | "right";

const positionStyles: Record<
  CardPosition,
  { transform: string; origin: string; zIndex: number }
> = {
  left: {
    transform: "translateX(-44%) translateY(16px) translateZ(-150px) scale(0.78) rotateY(22deg)",
    origin: "right center",
    zIndex: 5,
  },
  center: {
    transform: "translateX(0px) translateY(0px) translateZ(90px) scale(1) rotateY(0deg)",
    origin: "center center",
    zIndex: 60,
  },
  right: {
    transform: "translateX(44%) translateY(16px) translateZ(-150px) scale(0.78) rotateY(-22deg)",
    origin: "left center",
    zIndex: 5,
  },
};

function getPosition(slideIndex: number, activeIndex: number, total: number): CardPosition {
  if (slideIndex === activeIndex) return "center";
  const leftIndex = (activeIndex + 1) % total;
  const rightIndex = (activeIndex - 1 + total) % total;
  if (slideIndex === leftIndex) return "left";
  if (slideIndex === rightIndex) return "right";
  return "center";
}

function CarouselCard({
  slide,
  position,
  onSelect,
}: {
  slide: ShowreelVideo;
  position: CardPosition;
  onSelect: () => void;
}) {
  const isCenter = position === "center";
  const isSide = !isCenter;

  const frameClass = cn(
    "relative mx-auto block overflow-hidden rounded-[1.45rem] border border-white/15 bg-black shadow-[0_26px_70px_rgba(0,0,0,0.42)]",
    isCenter ? "aspect-[4/5] w-full max-w-[300px]" : "aspect-[9/16] w-full max-w-[230px]",
    isSide && "cursor-pointer opacity-80 transition hover:opacity-100",
  );

  const content = isCenter ? (
    <span className={cn(frameClass, "pointer-events-auto")} aria-current="true">
      <video
        key={slide.videoSrc}
        src={slide.videoSrc}
        poster={slide.posterSrc}
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        preload="metadata"
        aria-label={slide.title}
        draggable={false}
        className="absolute inset-0 h-full w-full bg-black object-cover"
      />
    </span>
  ) : (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Bring ${slide.title} to front`}
      className={frameClass}
    >
      <div className="pointer-events-none relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.posterSrc}
          alt={`${slide.title} poster`}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 rounded-[1.45rem] bg-black/30" />
        <div
          className={cn(
            "absolute top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-sky-300/25 bg-sky-300/10 blur-xl",
            position === "left" ? "-right-5" : "-left-5",
          )}
        />
      </div>
    </button>
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 mx-auto flex h-full items-start justify-center transition-all duration-500 ease-out",
        isSide && "pointer-events-auto",
      )}
      style={{
        transform: positionStyles[position].transform,
        transformOrigin: positionStyles[position].origin,
        zIndex: positionStyles[position].zIndex,
      }}
    >
      {content}
    </div>
  );
}

export function ShowreelCarousel({
  videos,
  activeIndex,
  onSelect,
}: {
  videos: ShowreelVideo[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative mt-5 overflow-visible rounded-[1.75rem] border border-white/10 p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_25%_15%,rgba(0,168,255,0.35),transparent_32%),linear-gradient(135deg,#020617,#082f49_48%,#00a8ff)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_38%,rgba(0,0,0,0.55))]" />

      <div className="relative z-[1] grid gap-3">
        <div
          className="relative isolate mx-auto h-[min(380px,72vw)] w-full max-w-[430px] sm:h-[390px]"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {videos.map((slide, i) => (
              <CarouselCard
                key={slide.videoSrc}
                slide={slide}
                position={getPosition(i, activeIndex, videos.length)}
                onSelect={() => onSelect(i)}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 mt-1 h-2.5 overflow-hidden rounded-full bg-black/50 shadow-inner ring-1 ring-white/10">
          <div className="timeline-sweep h-full rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.65)]" />
        </div>

        <div className="relative z-20 grid grid-cols-3 gap-2">
          {[
            { value: "18", label: "Ad cuts" },
            { value: "4:5", label: "Frame" },
            { value: "UGC", label: "Format" },
          ].map((box) => (
            <div
              key={box.label}
              className="showreel-metric-tile flex min-h-[4.5rem] flex-col justify-center rounded-2xl border border-white/15 bg-black/35 p-3 backdrop-blur"
            >
              <p className="font-display text-2xl font-black tracking-[-0.05em] text-white">
                {box.value}
              </p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-sky-100">
                {box.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShowreelVideo({
  className,
  label,
  autoPlay = true,
  loop = true,
  muted = true,
  videoSrc,
  posterSrc,
}: {
  className?: string;
  label?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  videoSrc?: string;
  posterSrc?: string;
}) {
  const src = videoSrc ?? heroShowreelVideo.videoSrc;
  const poster = posterSrc ?? heroShowreelVideo.posterSrc;

  return (
    <div className={cn("w-full", className)}>
      <span className="relative pointer-events-auto mx-auto block aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[1.45rem] border border-white/15 bg-black shadow-[0_26px_70px_rgba(0,0,0,0.42)]">
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          preload="metadata"
          aria-label={label ?? "Showreel"}
          draggable={false}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      </span>
    </div>
  );
}

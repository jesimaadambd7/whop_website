"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HoverVideoPreviewProps = {
  posterSrc?: string;
  fallbackSrc: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  children?: React.ReactNode;
};

export function HoverVideoPreview({
  posterSrc,
  fallbackSrc,
  videoSrc,
  alt,
  className,
  imageClassName,
  eager = false,
  children,
}: HoverVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleEnter = useCallback(() => {
    setHovering(true);
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.currentTime = 0;
    video.play().catch(() => undefined);
  }, [videoSrc]);

  const handleLeave = useCallback(() => {
    setHovering(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  const showVideo = Boolean(videoSrc) && hovering && videoReady;

  return (
    <div
      className={cn("relative overflow-hidden bg-black", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        src={posterSrc ?? fallbackSrc}
        loading={eager ? "eager" : "lazy"}
        className={cn(
          "h-full w-full object-cover transition duration-500",
          showVideo ? "scale-105 opacity-0" : "scale-100 opacity-100",
          imageClassName,
        )}
      />

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition duration-500",
            showVideo ? "scale-100 opacity-100" : "scale-105 opacity-0",
          )}
          onCanPlay={() => setVideoReady(true)}
        />
      )}

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition duration-300",
          showVideo ? "opacity-80" : "opacity-100",
        )}
      />

      {children}

      {videoSrc && !showVideo && (
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
          Preview
        </div>
      )}
    </div>
  );
}

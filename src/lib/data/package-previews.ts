"use client";

import { showreelVideos } from "@/lib/data/showreel-media";

export const packagePreviewVideos: Record<
  string,
  { videoSrc: string; posterSrc: string }
> = {
  "ugc-ad-sprint": {
    videoSrc: showreelVideos[0].videoSrc,
    posterSrc: showreelVideos[0].posterSrc,
  },
  "editing-sprint": {
    videoSrc: showreelVideos[1].videoSrc,
    posterSrc: showreelVideos[1].posterSrc,
  },
  "shoot-to-sales-sprint": {
    videoSrc: showreelVideos[2].videoSrc,
    posterSrc: showreelVideos[2].posterSrc,
  },
  "paid-ads-sprint": {
    videoSrc: showreelVideos[3].videoSrc,
    posterSrc: showreelVideos[3].posterSrc,
  },
};

export function getPackagePreviewVideo(slug: string) {
  return packagePreviewVideos[slug];
}

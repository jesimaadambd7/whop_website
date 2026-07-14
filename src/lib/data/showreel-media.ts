import { mediaPath } from "@/lib/media/ugcviss-media";

export type ShowreelVideo = {
  title: string;
  client?: string;
  category?: string;
  videoSrc: string;
  posterSrc: string;
  ratio: "4/5" | "9/16";
};

/** Pool passed to the hero showreel carousel (matches ugcviss.com). */
export const showreelVideos: ShowreelVideo[] = [
  {
    title: "UGC Ad Edit 11",
    client: "Selected Work",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project_viscap_youe2tzd9h"),
    posterSrc: mediaPath("portfolio", "project_viscap_youe2tzd9h", "poster"),
    ratio: "4/5",
  },
  {
    title: "UGC Ad Edit 10",
    client: "Selected Work",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project_viscap_x6u7z8x5qb"),
    posterSrc: mediaPath("portfolio", "project_viscap_x6u7z8x5qb", "poster"),
    ratio: "9/16",
  },
  {
    title: "DR-UGC-RYZE-MUSHROOM-HOT-COCOA",
    client: "RYZE",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project-1782061472881-83272c43"),
    posterSrc: mediaPath("portfolio", "project-1782061472881-83272c43", "poster"),
    ratio: "9/16",
  },
  {
    title: "UGC Ad Edit 12",
    client: "Selected Work",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project_viscap_9s8vlpttar"),
    posterSrc: mediaPath("portfolio", "project_viscap_9s8vlpttar", "poster"),
    ratio: "4/5",
  },
  {
    title: "UGC Ad Edit 01",
    client: "Selected Work",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln"),
    posterSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln", "poster"),
    ratio: "9/16",
  },
  {
    title: "MA_26_A_DR-UGC_(17)_D6",
    client: "Ryze",
    category: "UGC Ads",
    videoSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac"),
    posterSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac", "poster"),
    ratio: "9/16",
  },
];

/** Default 3-up carousel: center, left, right when index 0 is active. */
export const carouselVideos = [
  showreelVideos[0],
  showreelVideos[2],
  showreelVideos[1],
];

export type DashboardCut = {
  id: string;
  label: string;
  subtitle: string | ((activeTitle: string) => string);
};

export const dashboardCuts: DashboardCut[] = [
  { id: "01", label: "Selected cut", subtitle: (title) => title },
  { id: "02", label: "Hook system", subtitle: "10 hooks + 2 CTAs" },
  { id: "03", label: "Launch fit", subtitle: "UGC Ads / 4:5" },
];

export const winningFrameworkVideoSrc = mediaPath("winning-framework");

/** @deprecated Use showreelVideos */
export const carouselSlides = carouselVideos.map((v, i) => ({
  id: dashboardCuts[i]?.id ?? String(i + 1).padStart(2, "0"),
  label: dashboardCuts[i]?.label ?? v.title,
  title: v.title,
  subtitle:
    typeof dashboardCuts[i]?.subtitle === "function"
      ? v.title
      : (dashboardCuts[i]?.subtitle as string) ?? v.title,
  caption: "",
  src: v.videoSrc,
  poster: v.posterSrc,
  aspect: v.ratio,
}));

export const heroShowreelVideo = showreelVideos[0];

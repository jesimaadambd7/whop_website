import { mediaPath } from "@/lib/media/vidcarry-media";

export type CreatorPortfolioVideo = {
  id: string;
  title: string;
  aspect: "9:16" | "4:5";
  filter: "Selected Work" | "Ryze" | "AI Generated";
  videoSrc?: string;
  posterSrc?: string;
};

export const neazPortfolioFilters = [
  "All",
  "Selected Work",
  "Ryze",
  "AI Generated",
] as const;

export type NeazPortfolioFilter = (typeof neazPortfolioFilters)[number];

export const neazPortfolio = {
  slug: "neaz-mahmud",
  name: "Neaz Mahmud",
  role: "Founder & CEO",
  eyebrow: "Selected video editing work",
  title: "Portfolio of Neaz Mahmud",
  bio: "I have edited 10,000+ videos, including performance creative for RYZE, WOW Skin Science, SHINE Armor, Woxer, Javy, and Blissal. My editing work has helped brands scale creative output, strengthen campaign performance, and drive meaningful growth.",
  videos: [
    {
      id: "ugc-01",
      title: "UGC Ad Edit 01",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln"),
      posterSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln", "poster"),
    },
    {
      id: "ryze-17",
      title: "MA_26_A_DR-UGC_(17)_D6",
      aspect: "9:16",
      filter: "Ryze",
      videoSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac"),
      posterSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac", "poster"),
    },
    {
      id: "ryze-cocoa",
      title: "DR-UGC-RYZE-MUSHROOM-HOT-COCOA",
      aspect: "9:16",
      filter: "Ryze",
      videoSrc: mediaPath("portfolio", "project-1782061472881-83272c43"),
      posterSrc: mediaPath("portfolio", "project-1782061472881-83272c43", "poster"),
    },
    {
      id: "ryze-menopause",
      title: "RYZE-DR-UGC-MENOPAUSE-MEMORY",
      aspect: "9:16",
      filter: "Ryze",
      videoSrc: mediaPath("portfolio", "project-1782061615389-bee3b0f0"),
      posterSrc: mediaPath("portfolio", "project-1782061615389-bee3b0f0", "poster"),
    },
    {
      id: "ugc-02",
      title: "UGC Ad Edit 02",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_i01jxhloj7"),
      posterSrc: mediaPath("portfolio", "project_viscap_i01jxhloj7", "poster"),
    },
    {
      id: "ugc-03",
      title: "UGC Ad Edit 03",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_1bex1elrrc"),
      posterSrc: mediaPath("portfolio", "project_viscap_1bex1elrrc", "poster"),
    },
    {
      id: "ugc-04",
      title: "UGC Ad Edit 04",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_wygrtygrxq"),
      posterSrc: mediaPath("portfolio", "project_viscap_wygrtygrxq", "poster"),
    },
    {
      id: "ugc-05",
      title: "UGC Ad Edit 05",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_9cgejdfiz2"),
      posterSrc: mediaPath("portfolio", "project_viscap_9cgejdfiz2", "poster"),
    },
    {
      id: "ugc-06",
      title: "UGC Ad Edit 06",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_30ctolj7vv"),
      posterSrc: mediaPath("portfolio", "project_viscap_30ctolj7vv", "poster"),
    },
    {
      id: "ugc-07",
      title: "UGC Ad Edit 07",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_qtg17iqtme"),
      posterSrc: mediaPath("portfolio", "project_viscap_qtg17iqtme", "poster"),
    },
    {
      id: "ugc-08",
      title: "UGC Ad Edit 08",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_xeg9rijjsp"),
      posterSrc: mediaPath("portfolio", "project_viscap_xeg9rijjsp", "poster"),
    },
    {
      id: "ugc-09",
      title: "UGC Ad Edit 09",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_fnpkr8zi8y"),
      posterSrc: mediaPath("portfolio", "project_viscap_fnpkr8zi8y", "poster"),
    },
    {
      id: "ugc-10",
      title: "UGC Ad Edit 10",
      aspect: "9:16",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_x6u7z8x5qb"),
      posterSrc: mediaPath("portfolio", "project_viscap_x6u7z8x5qb", "poster"),
    },
    {
      id: "ugc-11",
      title: "UGC Ad Edit 11",
      aspect: "4:5",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_youe2tzd9h"),
      posterSrc: mediaPath("portfolio", "project_viscap_youe2tzd9h", "poster"),
    },
    {
      id: "ugc-12",
      title: "UGC Ad Edit 12",
      aspect: "4:5",
      filter: "Selected Work",
      videoSrc: mediaPath("portfolio", "project_viscap_9s8vlpttar"),
      posterSrc: mediaPath("portfolio", "project_viscap_9s8vlpttar", "poster"),
    },
  ] satisfies CreatorPortfolioVideo[],
};

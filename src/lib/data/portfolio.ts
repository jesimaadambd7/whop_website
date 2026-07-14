import { mediaPath } from "@/lib/media/ugcviss-media";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  aspect: "9:16" | "4:5" | "16:9";
  client?: string;
  industry?: string;
  eyebrow?: string;
  clientType?: string;
  description?: string;
  href: string;
  featured?: boolean;
  videoSrc?: string;
  posterSrc?: string;
};

export const portfolioCategories = [
  "All",
  "UGC Ads",
  "Ecommerce Ads",
  "YouTube Videos",
  "Motion Graphics",
  "Short Form Content",
  "AI Generated",
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ugc-01",
    title: "UGC Ad Edit 01",
    category: "UGC Ads",
    aspect: "9:16",
    eyebrow: "Selected Work",
    description: "Selected performance ad edit created by Neaz Mahmud.",
    href: "/portfolio/neaz-mahmud#viscap-media-ugc-ad-edit-01",
    featured: true,
    videoSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln"),
    posterSrc: mediaPath("portfolio", "project_viscap_9ijov1rqln", "poster"),
  },
  {
    id: "blissal-shower",
    title: "BLISSAL _Shower_Routine",
    category: "UGC Ads",
    aspect: "9:16",
    client: "Blissal",
    eyebrow: "Body care",
    description: "UGCViss backend-managed portfolio video.",
    href: "/portfolio/blissal#blissal-shower-routine",
    featured: true,
    videoSrc: mediaPath("portfolio", "project-1782313958588-5a0622e1"),
  },
  {
    id: "ryze-ugc-17",
    title: "MA_26_A_DR-UGC_(17)_D6",
    category: "UGC Ads",
    aspect: "9:16",
    client: "RYZE",
    eyebrow: "Ryze",
    description: "UGCViss backend-managed portfolio video.",
    href: "/portfolio/ryze#ma-26-a-dr-ugc-17-d6",
    featured: true,
    videoSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac"),
    posterSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac", "poster"),
  },
  {
    id: "wow-skin",
    title: "WOW Skin Science Texture Demo Ads",
    category: "UGC Ads",
    aspect: "9:16",
    client: "WOW Skin Science",
    industry: "Beauty and skincare",
    description:
      "Model-led beauty routines, texture shots, benefit captions, and UGC cutdowns for paid social.",
    href: "/portfolio/wow-skin-science",
  },
  {
    id: "woxer-lifestyle",
    title: "Woxer Lifestyle Apparel Campaign",
    category: "Ecommerce Ads",
    aspect: "9:16",
    client: "Woxer",
    industry: "DTC apparel",
    description:
      "Lifestyle footage, comfort-led hooks, product detail cuts, and launch creatives for social campaigns.",
    href: "/portfolio/woxer",
  },
  {
    id: "shine-armor",
    title: "SHINE Armor Before-After Ads",
    category: "Ecommerce Ads",
    aspect: "9:16",
    client: "SHINE Armor",
    industry: "Auto care",
    description:
      "High-contrast product demos, shine reveals, offer explainers, and warm-audience proof clips.",
    href: "/portfolio/shine-armor",
  },
];

export const clientLibraries = [
  {
    name: "RYZE",
    slug: "ryze",
    category: "Functional coffee",
    videoCount: 5,
    tags: ["UGC ads", "Paid social edits", "Product storytelling"],
    videos: [
      "MA_26_A_DR-UGC_(17)_D6",
      "DR-UGC-RYZE-MUSHROOM-HOT-COCOA",
      "RYZE-DR-UGC-MENOPAUSE-MEMORY",
    ],
  },
  {
    name: "WOW Skin Science",
    slug: "wow-skin-science",
    category: "Beauty and skincare",
    videoCount: 1,
    tags: ["Beauty UGC", "Product demos", "Social ad cutdowns"],
    videos: ["WOW Skin Science Texture Demo Ads"],
  },
  {
    name: "SHINE Armor",
    slug: "shine-armor",
    category: "Auto care",
    videoCount: 1,
    tags: ["Demo ads", "Offer creatives", "Before-after edits"],
    videos: ["SHINE Armor Before-After Ads"],
  },
  {
    name: "Woxer",
    slug: "woxer",
    category: "DTC apparel",
    videoCount: 2,
    tags: ["UGC ads", "Lifestyle edits", "Short-form content"],
    videos: [
      "Woxer Lifestyle Apparel Campaign",
      "Woxer Creator Testimonial Cuts",
    ],
  },
  {
    name: "Javy",
    slug: "javy",
    category: "Coffee and beverages",
    videoCount: 1,
    tags: ["Product ads", "Recipe-style edits", "Performance creatives"],
    videos: ["Javy Recipe-Style Video System"],
  },
  {
    name: "Blissal",
    slug: "blissal",
    category: "Body care",
    videoCount: 2,
    tags: ["UGC ads", "Problem-solution edits", "Product demos"],
    videos: ["BLISSAL _Shower_Routine", "Blissal Body Care Short-Form Ads"],
  },
];

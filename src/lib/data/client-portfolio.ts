import { mediaPath } from "@/lib/media/vidcarry-media";

const videoGradient =
  "linear-gradient(135deg,#020617 0%,#0369a1 52%,#00a8ff 100%)";

export type ClientPortfolioVideo = {
  title: string;
  format: string;
  duration: string;
  ratio: "9:16" | "4:5" | "16:9";
  funnelStage: string;
  hook: string;
  result: string;
  description: string;
  gradient: string;
  videoSrc?: string;
  posterSrc?: string;
};

export type ClientPortfolio = {
  name: string;
  slug: string;
  industry: string;
  website: string;
  videoCount: number;
  tags: string[];
  logo: string;
  logoBg: "zinc-950" | "white";
  videos: ClientPortfolioVideo[];
};

export const clientPortfolios: ClientPortfolio[] = [
  {
    name: "Blissal",
    slug: "blissal",
    industry: "Body care",
    website: "https://blissal.com/",
    videoCount: 2,
    tags: ["UGC ads", "Problem-solution edits", "Product demos"],
    logo: "/assets/clients/blissal.png",
    logoBg: "white",
    videos: [
      {
        title: "BLISSAL _Shower_Routine",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Backend-uploaded VidCarry portfolio video.",
        result: "Uploaded from the VidCarry portfolio control panel.",
        description: "A VidCarry backend-managed portfolio video.",
        gradient: videoGradient,
        videoSrc: mediaPath("portfolio", "project-1782313958588-5a0622e1"),
      },
      {
        title: "Blissal Body Care Short-Form Ads",
        format: "AI Generated",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook:
          "Problem-solution edits, product usage closeups, caption rhythm, and offer-ready social cuts.",
        result:
          "Problem-solution edits, product usage closeups, caption rhythm, and offer-ready social cuts.",
        description:
          "Body care short-form assets built around usage closeups, problem-solution framing, and CTA-ready pacing.",
        gradient: videoGradient,
      },
    ],
  },
  {
    name: "RYZE",
    slug: "ryze",
    industry: "Functional coffee",
    website: "https://www.ryzesuperfoods.com/",
    videoCount: 5,
    tags: ["UGC ads", "Paid social edits", "Product storytelling"],
    logo: "/assets/clients/ryze.svg",
    logoBg: "zinc-950",
    videos: [
      {
        title: "MA_26_A_DR-UGC_(17)_D6",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Backend-uploaded VidCarry portfolio video.",
        result: "Uploaded from the VidCarry portfolio control panel.",
        description: "A VidCarry backend-managed portfolio video.",
        gradient: videoGradient,
        videoSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac"),
        posterSrc: mediaPath("portfolio", "project-1781894350462-2943e0ac", "poster"),
      },
      {
        title: "DR-UGC-RYZE-MUSHROOM-HOT-COCOA",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Backend-uploaded VidCarry portfolio video.",
        result: "Uploaded from the VidCarry portfolio control panel.",
        description: "A VidCarry backend-managed portfolio video.",
        gradient: videoGradient,
        videoSrc: mediaPath("portfolio", "project-1782061472881-83272c43"),
        posterSrc: mediaPath("portfolio", "project-1782061472881-83272c43", "poster"),
      },
      {
        title: "RYZE-DR-UGC-MENOPAUSE-MEMORY",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Backend-uploaded VidCarry portfolio video.",
        result: "Uploaded from the VidCarry portfolio control panel.",
        description: "A VidCarry backend-managed portfolio video.",
        gradient: videoGradient,
        videoSrc: mediaPath("portfolio", "project-1782061615389-bee3b0f0"),
        posterSrc: mediaPath("portfolio", "project-1782061615389-bee3b0f0", "poster"),
      },
      {
        title: "RYZE Paid Social Hook Library",
        format: "Motion Graphics",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook:
          "UGC hooks, animated product callouts, routine edits, and retargeting cuts for performance testing.",
        result:
          "UGC hooks, animated product callouts, routine edits, and retargeting cuts for performance testing.",
        description:
          "Performance creative library with hook variants, product callouts, routine edits, and retargeting cuts.",
        gradient: videoGradient,
      },
      {
        title: "RYZE Morning Routine UGC Ads",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook:
          "Creator-led morning hooks, product prep footage, benefit captions, and paid social variants.",
        result:
          "Creator-led morning hooks, product prep footage, benefit captions, and paid social variants.",
        description:
          "Morning routine creative using creator-led hooks, product prep, benefit captions, and paid social variants.",
        gradient: videoGradient,
      },
    ],
  },
  {
    name: "WOW Skin Science",
    slug: "wow-skin-science",
    industry: "Beauty and skincare",
    website: "https://www.wowskinscience.com/",
    videoCount: 1,
    tags: ["Beauty UGC", "Product demos", "Social ad cutdowns"],
    logo: "/assets/clients/wow-skin-science.png",
    logoBg: "white",
    videos: [
      {
        title: "WOW Skin Science Texture Demo Ads",
        format: "UGC Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Model-led beauty routines, texture shots, and benefit captions.",
        result: "UGC cutdowns built for paid social testing.",
        description:
          "Model-led beauty routines, texture shots, benefit captions, and UGC cutdowns for paid social.",
        gradient: videoGradient,
      },
    ],
  },
  {
    name: "SHINE Armor",
    slug: "shine-armor",
    industry: "Auto care",
    website: "https://shinearmor.com/",
    videoCount: 1,
    tags: ["Demo ads", "Offer creatives", "Before-after edits"],
    logo: "/assets/clients/shine-armor.png",
    logoBg: "zinc-950",
    videos: [
      {
        title: "SHINE Armor Before-After Ads",
        format: "Ecommerce Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "High-contrast product demos and shine reveals.",
        result: "Offer explainers and warm-audience proof clips.",
        description:
          "High-contrast product demos, shine reveals, offer explainers, and warm-audience proof clips.",
        gradient: videoGradient,
      },
    ],
  },
  {
    name: "Woxer",
    slug: "woxer",
    industry: "DTC apparel",
    website: "https://woxer.com/",
    videoCount: 2,
    tags: ["UGC ads", "Lifestyle edits", "Short-form content"],
    logo: "/assets/clients/woxer.svg",
    logoBg: "white",
    videos: [
      {
        title: "Woxer Lifestyle Apparel Campaign",
        format: "Ecommerce Ads",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Comfort-led hooks and product detail cuts.",
        result: "Launch creatives for social campaigns.",
        description:
          "Lifestyle footage, comfort-led hooks, product detail cuts, and launch creatives for social campaigns.",
        gradient: videoGradient,
      },
      {
        title: "Woxer Creator Testimonial Cuts",
        format: "Short Form Content",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Creator reads and social proof pacing.",
        result: "Retention-focused caption systems.",
        description:
          "Creator reads, social proof pacing, lifestyle frames, and retention-focused caption systems.",
        gradient: videoGradient,
      },
    ],
  },
  {
    name: "Javy",
    slug: "javy",
    industry: "Coffee and beverages",
    website: "https://javycoffee.com/",
    videoCount: 1,
    tags: ["Product ads", "Recipe-style edits", "Performance creatives"],
    logo: "/assets/clients/javy.svg",
    logoBg: "white",
    videos: [
      {
        title: "Javy Recipe-Style Video System",
        format: "YouTube Videos",
        duration: "00:30",
        ratio: "9:16",
        funnelStage: "Portfolio upload",
        hook: "Recipe edits and product closeups.",
        result: "Short-form cutdowns for beverage buyers.",
        description:
          "Recipe edits, product closeups, creator taste tests, and short-form cutdowns for beverage buyers.",
        gradient: videoGradient,
      },
    ],
  },
];

export function getClientPortfolio(slug: string): ClientPortfolio | undefined {
  return clientPortfolios.find((client) => client.slug === slug);
}

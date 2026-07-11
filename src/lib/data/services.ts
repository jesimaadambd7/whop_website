export type Service = {
  id: string;
  abbr: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  image: string;
};

const serviceImage = (id: string) => `/assets/services/${id}.png`;

export const services: Service[] = [
  {
    id: "ugc-ads",
    abbr: "UA",
    title: "UGC Ads Production",
    description:
      "Creator and model-led performance ads that feel native to TikTok, Meta, and Reels while staying sharply on brief.",
    deliverables: ["Concept angles", "Creator scripts", "Model or creator footage", "Edited ad variants"],
    idealFor: "DTC and ecommerce brands that need authentic social proof and sales-focused ad volume.",
    image: serviceImage("ugc-ads"),
  },
  {
    id: "model-shoots",
    abbr: "M&",
    title: "Model & Product Shoot Production",
    description:
      "End-to-end shoot support with on-camera models, product setups, creative direction, and footage planned for ads.",
    deliverables: ["Model casting", "Shoot planning", "Product demo footage", "Lifestyle and studio clips"],
    idealFor: "Brands that need fresh footage, polished product demos, and human-led content without building an in-house crew.",
    image: serviceImage("model-shoots"),
  },
  {
    id: "paid-ads",
    abbr: "PA",
    title: "Paid Ads Management",
    description:
      "Campaign setup, creative testing, optimization, and reporting across paid social with a clear focus on sales growth.",
    deliverables: ["Campaign setup", "Ad testing plan", "Performance monitoring", "Optimization notes"],
    idealFor: "Brands that want VidCarry to produce the ads and help run them toward revenue goals.",
    image: serviceImage("paid-ads"),
  },
  {
    id: "video-editing",
    abbr: "VE",
    title: "Video Editing",
    description:
      "Premium edits for ads, launches, product explainers, and social campaigns with pacing built for retention.",
    deliverables: ["Narrative edit", "Color and sound polish", "Captions", "Platform exports"],
    idealFor: "Brands and agencies with footage that needs a stronger story and finish.",
    image: serviceImage("video-editing"),
  },
  {
    id: "motion-graphics",
    abbr: "MG",
    title: "Motion Graphics",
    description:
      "Sharp animated graphics, overlays, kinetic type, and product callouts that make videos feel expensive.",
    deliverables: ["Animated titles", "Product callouts", "Logo reveals", "Social motion templates"],
    idealFor: "Campaigns that need visual clarity, polish, and scroll-stopping movement.",
    image: serviceImage("motion-graphics"),
  },
  {
    id: "paid-social",
    abbr: "PS",
    title: "Paid Social Ad Creatives",
    description:
      "Creative packages designed for testing hooks, offers, audiences, and landing-page promises across paid social.",
    deliverables: ["Hook variations", "Static and video ads", "Primary text prompts", "Testing matrix"],
    idealFor: "Performance teams that need fresh creative volume for campaigns we can also help launch and optimize.",
    image: serviceImage("paid-social"),
  },
  {
    id: "youtube-editing",
    abbr: "YV",
    title: "YouTube Video Editing",
    description:
      "Long-form and short-form YouTube edits with strong intros, chapter flow, retention beats, and branded polish.",
    deliverables: ["Full-length edit", "Shorts cutdowns", "Thumbnail direction", "Audio cleanup"],
    idealFor: "Founders, creators, educators, and brands building authority on YouTube.",
    image: serviceImage("youtube-editing"),
  },
  {
    id: "short-form",
    abbr: "SF",
    title: "Short Form Content",
    description:
      "High-tempo Reels, Shorts, and TikToks designed to package ideas quickly and keep audiences watching.",
    deliverables: ["15-60 second edits", "Caption styling", "Trend adaptation", "Multi-platform exports"],
    idealFor: "Teams that need consistent social output from existing footage, podcasts, or shoots.",
    image: serviceImage("short-form"),
  },
  {
    id: "creative-strategy",
    abbr: "CS",
    title: "Creative Strategy",
    description:
      "Messaging, hooks, angles, and content systems built from customer pains, objections, buying triggers, and ad data.",
    deliverables: ["Creative brief", "Ad angle map", "Hook bank", "Production and testing roadmap"],
    idealFor: "Brands that know they need more than pretty videos to unlock profitable ad campaigns.",
    image: serviceImage("creative-strategy"),
  },
  {
    id: "creator-sourcing",
    abbr: "CS",
    title: "Creator Sourcing",
    description:
      "UGC creator discovery, shortlisting, briefing, and production support for credible on-camera content.",
    deliverables: ["Creator shortlist", "Outreach support", "Briefing docs", "Production coordination"],
    idealFor: "Global ecommerce and DTC brands that need reliable creator-led production support.",
    image: serviceImage("creator-sourcing"),
  },
  {
    id: "global-talent",
    abbr: "GT",
    title: "Global Talent & Celebrity Production",
    description:
      "Remote production coordination with actors, creators, influencers, and celebrity talent when the campaign fit, budget, and usage rights align.",
    deliverables: ["Talent shortlisting", "Actor and creator briefs", "Influencer coordination", "Usage and production planning"],
    idealFor: "Brands that need recognizable faces, local-market talent, or higher-trust creator-led campaigns without managing the talent pipeline alone.",
    image: serviceImage("global-talent"),
  },
];

export const serviceBottlenecks = [
  {
    title: "Need fresh product footage?",
    description: "Start with Model & Product Shoot Production plus UGC Ads Production.",
  },
  {
    title: "Need sharper assets from existing footage?",
    description: "Start with Video Editing, YouTube Editing, Motion Graphics, or Short Form Content.",
  },
  {
    title: "Need sales-focused launch support?",
    description: "Start with Paid Ads Management plus Paid Social Ad Creatives and Creative Strategy.",
  },
  {
    title: "Need the right face for the campaign?",
    description: "Start with Creator Sourcing or Global Talent Production for vetted on-camera talent and campaign-ready usage planning.",
  },
];

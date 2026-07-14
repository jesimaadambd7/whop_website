export const siteConfig = {
  name: "UGCViss",
  tagline: "UGC Ads, Video Editing & Paid Social Creative",
  description:
    "UGCViss is a performance video creative agency for ecommerce and DTC brands. We produce UGC ads, product shoots, video editing, motion graphics, and paid social creatives built to drive sales.",
  url: "https://www.ugcviss.com",
  email: "support@ugcviss.com",
};

/** Public support address. Ignores stale Gmail EMAIL_REPLY_TO overrides. */
export function getSupportEmail() {
  const fromEnv = process.env.EMAIL_REPLY_TO?.trim();
  if (fromEnv && /@ugcviss\.com$/i.test(fromEnv)) {
    return fromEnv;
  }
  return siteConfig.email;
}

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Creators", href: "/creator-portfolios" },
  { label: "Team", href: "/team" },
  { label: "FAQs", href: "/faqs" },
  { label: "Resources", href: "/resources" },
];

export const footerLinks = {
  services: [
    { label: "UGC Ads Production", href: "/services#ugc-ads" },
    { label: "Video Editing", href: "/services#video-editing" },
    { label: "Model & Product Shoots", href: "/services#model-shoots" },
    { label: "Paid Social Creatives", href: "/services#paid-social" },
    { label: "Motion Graphics", href: "/services#motion-graphics" },
    { label: "Paid Ads Management", href: "/services#paid-ads" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "FAQs", href: "/faqs" },
    { label: "Resources", href: "/resources" },
    { label: "Creator Portfolios", href: "/creator-portfolios" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export const stats = [
  { value: "10+", label: "Remote editors and creatives" },
  { value: "50+", label: "Actors, creators, influencers, and talent options" },
  { value: "6+", label: "Countries in our remote production network" },
];

export const industries = [
  "Beauty and skincare",
  "Apparel and fashion",
  "Coffee and beverages",
  "Supplements and wellness",
  "Auto care and accessories",
  "Body care and personal care",
  "Creator-led products",
  "Agency and white-label support",
];

export const talentPool = [
  "Remote editors",
  "Creative strategists",
  "Actors",
  "UGC creators",
  "Influencers",
  "Celebrities",
  "Models",
  "Production support",
];

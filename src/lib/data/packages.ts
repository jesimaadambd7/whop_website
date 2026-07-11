export type Package = {
  id: string;
  slug: string;
  sprint: string;
  badge: string;
  price: string;
  priceAmount: number;
  priceNote: string;
  originalPrice?: string;
  title: string;
  description: string;
  heroDescription: string;
  delivery: string;
  revisions: string;
  revisionsLabel: string;
  features: string[];
  included: string[];
  benefits: string[];
  workflowSteps: string[];
  href: string;
  thumbnail: string;
  variantId?: string;
};

export const packages: Package[] = [
  {
    id: "01",
    slug: "ugc-ad-sprint",
    sprint: "Sprint 01",
    badge: "Fast creative testing",
    price: "$550",
    priceAmount: 550,
    priceNote: "One-time payment",
    originalPrice: "$1,500",
    title: "UGC Ad Sprint",
    description:
      "A focused sprint that turns product angles, creator footage, and social proof into paid-social-ready UGC ad variants.",
    heroDescription:
      "A focused sprint that turns product angles, creator footage, and social proof into paid-social-ready UGC ad variants.",
    delivery: "10 business days",
    revisions: "2 revisions",
    revisionsLabel: "2 rounds",
    features: [
      "Creative angle map",
      "Creator or model brief",
      "4-8 edited ad variants",
    ],
    included: [
      "Research and angle planning",
      "Hook and script direction",
      "Editing, captions, sound, and exports",
      "One organized delivery hub",
    ],
    benefits: [
      "Launch more creative tests without coordinating multiple vendors",
      "Turn one footage set into multiple useful ad angles",
      "Keep strategy, production, and editing aligned",
    ],
    workflowSteps: [
      "Complete checkout and short brief",
      "Share footage or request production support",
      "VidCarry confirms kickoff and delivery date",
      "Review, revise, and download final assets",
    ],
    href: "/packages/ugc-ad-sprint",
    thumbnail: "/assets/thumbnails/packages/ugc-ad-sprint.svg",
    variantId: "4199ba6c-1d98-407e-9721-c4accab9db2b",
  },
  {
    id: "02",
    slug: "editing-sprint",
    sprint: "Sprint 02",
    badge: "Production support",
    price: "$170",
    priceAmount: 170,
    priceNote: "One-time payment",
    originalPrice: "$900",
    title: "Editing Sprint",
    description:
      "A structured editing sprint for turning raw footage into polished, retention-focused social assets with clear feedback rounds.",
    heroDescription:
      "A structured editing sprint for turning raw footage into polished, retention-focused social assets with clear feedback rounds.",
    delivery: "2 business days",
    revisions: "2 revisions",
    revisionsLabel: "2 rounds",
    features: [
      "Footage review",
      "6-12 edited assets",
      "Captions and sound design",
    ],
    included: [
      "Editorial direction and footage selects",
      "Pacing, captions, sound design, and polish",
      "Requested aspect-ratio exports",
      "Organized review and delivery",
    ],
    benefits: [
      "Clear a footage backlog quickly",
      "Create consistent quality across a campaign",
      "Use a predictable revision process",
    ],
    workflowSteps: [
      "Upload footage and references",
      "VidCarry confirms edit map",
      "First cuts move into client review",
      "Revisions are completed and finals delivered",
    ],
    href: "/packages/editing-sprint",
    thumbnail: "/assets/thumbnails/packages/editing-sprint.svg",
    variantId: "551e4d34-a24c-4f3a-9e38-6c24b33ad3dd",
  },
  {
    id: "03",
    slug: "shoot-to-sales-sprint",
    sprint: "Sprint 03",
    badge: "Full production",
    price: "$950",
    priceAmount: 950,
    priceNote: "One-time payment",
    originalPrice: "$3,500",
    title: "Shoot-to-Sales Sprint",
    description:
      "An end-to-end production sprint covering creative strategy, creator or model production, editing, and launch-ready performance assets.",
    heroDescription:
      "An end-to-end production sprint covering creative strategy, creator or model production, editing, and launch-ready performance assets.",
    delivery: "20 business days",
    revisions: "2 revisions",
    revisionsLabel: "2 rounds",
    features: [
      "Creative strategy workshop",
      "Talent sourcing and production brief",
      "Managed product shoot",
    ],
    included: [
      "Audience and offer research",
      "Concepts, scripts, casting, and shoot plan",
      "Production coordination",
      "Editing, variations, and delivery",
    ],
    benefits: [
      "Move from product to campaign with one accountable team",
      "Capture footage designed for testing, not only aesthetics",
      "Build a reusable creative library from one sprint",
    ],
    workflowSteps: [
      "Align on goals, product, and offer",
      "Approve concepts and talent direction",
      "Complete production and first edits",
      "Review, revise, and prepare launch assets",
    ],
    href: "/packages/shoot-to-sales-sprint",
    thumbnail: "/assets/thumbnails/packages/shoot-to-sales-sprint.svg",
    variantId: "b489203a-92c5-41a2-b19f-31e30edb74ae",
  },
  {
    id: "04",
    slug: "paid-ads-sprint",
    sprint: "Sprint 04",
    badge: "Ongoing growth",
    price: "$700",
    priceAmount: 700,
    priceNote: "Billed monthly",
    originalPrice: "$2,000",
    title: "Paid Ads Sprint",
    description:
      "A monthly creative and media support system for structured testing, performance learning, and faster iteration.",
    heroDescription:
      "A monthly creative and media support system for structured testing, performance learning, and faster iteration.",
    delivery: "10 business days",
    revisions: "2 revisions",
    revisionsLabel: "2 rounds",
    features: [
      "Monthly creative testing plan",
      "Fresh ad variants and cutdowns",
      "Performance review",
    ],
    included: [
      "Monthly creative priorities",
      "Creative production and editing allocation",
      "Paid-social launch support",
      "Performance summary and next tests",
    ],
    benefits: [
      "Connect creative output to campaign learning",
      "Maintain a dependable monthly testing cadence",
      "Reduce time lost between insight and iteration",
    ],
    workflowSteps: [
      "Confirm monthly priorities",
      "Prepare and launch creative tests",
      "Review performance signals",
      "Build the next iteration cycle",
    ],
    href: "/packages/paid-ads-sprint",
    thumbnail: "/assets/thumbnails/packages/paid-ads-sprint.svg",
    variantId: "5230bf75-b977-4fbf-9cba-3b0ab6b7928a",
  },
];

export function getPackageBySlug(slug: string) {
  return packages.find((pkg) => pkg.slug === slug);
}

export async function loadPackages() {
  const { listAdminPackages } = await import("@/lib/admin/package-store");
  const { toPublicPackages } = await import("@/lib/admin/package-mapper");
  const records = await listAdminPackages();
  return toPublicPackages(records);
}

export async function loadPackageBySlug(slug: string) {
  const { listAdminPackages } = await import("@/lib/admin/package-store");
  const { toPublicPackage } = await import("@/lib/admin/package-mapper");
  const records = await listAdminPackages();
  const record = records.find((pkg) => pkg.slug === slug);
  return record ? toPublicPackage(record) : undefined;
}

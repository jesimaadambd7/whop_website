export type PackageStatus = "published" | "draft" | "archived";
export type BillingType = "one_time" | "monthly";
export type AddOnBilling = "one_time" | "recurring";

export type PackageVariant = {
  id: string;
  name: string;
  billingType: BillingType;
  regularPrice: number;
  offerPrice: number | null;
  offerStarts: string | null;
  offerEnds: string | null;
  currency: string;
  deliveryDays: number;
  revisionRounds: number;
  active: boolean;
  description: string;
  sortOrder: number;
};

export type PackageAddOn = {
  id: string;
  title: string;
  description: string;
  price: number;
  billingBehavior: AddOnBilling;
  deliveryDaysDelta: number | null;
  extraRevisions: number | null;
  sortOrder: number;
};

export type AdminPackage = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  thumbnailLabel: string;
  thumbnailGradient: string;
  bestFor: string;
  timelineLabel: string;
  status: PackageStatus;
  sortOrder: number;
  summary: string;
  deliverables: string[];
  includedItems: string[];
  benefits: string[];
  processSteps: string[];
  thumbnail: string;
  variants: PackageVariant[];
  addOns: PackageAddOn[];
};

export type CreatorPricing = {
  regularPrice: number;
  offerPrice: number;
  offerStarts: string | null;
  offerEnds: string | null;
  currency: string;
  ctaLabel: string;
  available: boolean;
  features: string[];
};

export type PackageStoreData = {
  packages: AdminPackage[];
  creatorPricing: CreatorPricing;
};

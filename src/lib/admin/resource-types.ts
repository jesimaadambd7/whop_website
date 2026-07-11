export const RESOURCE_CATEGORY_OPTIONS = [
  "AI UGC",
  "AI Production",
  "Creative Strategy",
  "Research",
  "Editing",
  "Video Production",
  "Paid Social",
  "Portfolio Pack",
  "Template",
  "Tutorial",
] as const;

export const RESOURCE_FORMAT_OPTIONS = [
  "Prompt pack",
  "SOP + checklist",
  "Framework deck",
  "Template",
  "Checklist",
  "Video tutorial",
  "Portfolio pack",
  "Research file",
  "AI workflow",
  "Notion template",
  "ZIP bundle",
] as const;

export const RESOURCE_AUDIENCE_OPTIONS = [
  "Editors",
  "Creative strategists",
  "Designers",
  "AI video creators",
  "UGC producers",
  "Media buyers",
  "Agencies",
  "Founders",
  "Motion designers",
  "Production teams",
  "AI operators",
  "UGC editors",
] as const;

export const RESOURCE_CURRENCY_OPTIONS = ["usd", "eur", "gbp", "cad", "aud"] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORY_OPTIONS)[number];
export type ResourceFormat = (typeof RESOURCE_FORMAT_OPTIONS)[number];
export type ResourceStatus = "draft" | "published" | "archived";
export type ResourceCurrency = (typeof RESOURCE_CURRENCY_OPTIONS)[number];

export type AdminResource = {
  id: string;
  slug: string;
  title: string;
  category: ResourceCategory;
  format: ResourceFormat;
  price: number;
  currency: ResourceCurrency;
  status: ResourceStatus;
  sortOrder: number;
  audience: string[];
  benefit: string;
  description: string;
  detailIntro: string;
  purchaseReason: string;
  benefits: string[];
  includedItems: string[];
  socialPostAngle: string;
  previewContent: string;
  lockedContent: string;
  thumbnail: string | null;
  filePath: string | null;
  isPaid: boolean;
};

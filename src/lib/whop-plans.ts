// Client-safe: reads NEXT_PUBLIC_WHOP_PLAN_* and checkout URL env vars,
// with production plan defaults for packages + resources.

function isConfiguredPlanId(value?: string): value is string {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  if (!normalized.startsWith("plan_")) return false;
  if (normalized.includes("xxxx")) return false;
  if (normalized === "plan_xxxxxxxx") return false;
  return true;
}

/** Live Whop plan IDs — env vars override these when set. */
const DEFAULT_WHOP_PLAN_IDS: Record<string, string> = {
  // Packages
  "ugc-ad-sprint": "plan_JqrQdwnkcl0a5",
  "editing-sprint": "plan_3wRyivT4fTXUK",
  "shoot-to-sales-sprint": "plan_97ZCwLZkadp6O",
  "paid-ads-sprint": "plan_rTLdndqRzj3uB",
  // Resources
  "100-ai-ugc-prompt-vault": "plan_fzI4tLxdfMcxU",
  "ai-product-video-workflow-sop": "plan_pSiyPmQp3nCvP",
  "winning-video-ad-hook-framework-deck": "plan_MKQJQlUyXCRME",
  "creative-strategy-research-template": "plan_NuAOviuUfIRCL",
  "retention-editing-checklist-for-paid-social": "plan_0CbEUbCS4oyaZ",
};

export function getPublicWhopPlanId(slug: string): string | undefined {
  const envKey = `NEXT_PUBLIC_WHOP_PLAN_${slug.toUpperCase().replace(/-/g, "_")}`;
  const fromEnv = process.env[envKey];
  if (isConfiguredPlanId(fromEnv)) return fromEnv.trim();

  const fallback = DEFAULT_WHOP_PLAN_IDS[slug];
  return isConfiguredPlanId(fallback) ? fallback : undefined;
}

export function getPublicWhopCheckoutUrl(slug: string): string | undefined {
  const envKey = `NEXT_PUBLIC_WHOP_CHECKOUT_URL_${slug.toUpperCase().replace(/-/g, "_")}`;
  const value = process.env[envKey]?.trim();
  return value || undefined;
}

export function hasWhopCheckout(slug: string): boolean {
  return Boolean(getPublicWhopPlanId(slug) || getPublicWhopCheckoutUrl(slug));
}

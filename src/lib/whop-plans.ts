// Client-safe: reads NEXT_PUBLIC_WHOP_PLAN_* and checkout URL env vars

function isConfiguredPlanId(value?: string): value is string {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  if (!normalized.startsWith("plan_")) return false;
  if (normalized.includes("xxxx")) return false;
  if (normalized === "plan_xxxxxxxx") return false;
  return true;
}

export function getPublicWhopPlanId(slug: string): string | undefined {
  const envKey = `NEXT_PUBLIC_WHOP_PLAN_${slug.toUpperCase().replace(/-/g, "_")}`;
  const value = process.env[envKey];
  return isConfiguredPlanId(value) ? value : undefined;
}

export function getPublicWhopCheckoutUrl(slug: string): string | undefined {
  const envKey = `NEXT_PUBLIC_WHOP_CHECKOUT_URL_${slug.toUpperCase().replace(/-/g, "_")}`;
  const value = process.env[envKey]?.trim();
  return value || undefined;
}

export function hasWhopCheckout(slug: string): boolean {
  return Boolean(getPublicWhopPlanId(slug) || getPublicWhopCheckoutUrl(slug));
}

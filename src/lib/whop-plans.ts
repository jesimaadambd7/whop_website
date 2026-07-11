// Client-safe: reads NEXT_PUBLIC_WHOP_PLAN_* env vars
export function getPublicWhopPlanId(slug: string): string | undefined {
  const envKey = `NEXT_PUBLIC_WHOP_PLAN_${slug.toUpperCase().replace(/-/g, "_")}`;
  return process.env[envKey];
}

import { toPublicCreatorPricing } from "@/lib/admin/creator-pricing-utils";

export type { PublicCreatorPricing } from "@/lib/admin/creator-pricing-utils";
export { isCreatorOfferActive, toPublicCreatorPricing } from "@/lib/admin/creator-pricing-utils";

export async function loadCreatorPricing() {
  const { getCreatorPricing } = await import("@/lib/admin/package-store");
  const pricing = await getCreatorPricing();
  return toPublicCreatorPricing(pricing);
}

import type { CreatorPricing } from "@/lib/admin/package-types";
import { formatMoney } from "@/lib/admin/package-utils";

export type PublicCreatorPricing = {
  publicPrice: number;
  regularPrice: number;
  publicPriceLabel: string;
  regularPriceLabel?: string;
  headline: string;
  subheadline: string;
  offerActive: boolean;
  ctaLabel: string;
  available: boolean;
  features: string[];
  comparisonPriceLabel: string;
};

export function isCreatorOfferActive(pricing: CreatorPricing) {
  const now = Date.now();
  const start = pricing.offerStarts ? new Date(pricing.offerStarts).getTime() : null;
  const end = pricing.offerEnds ? new Date(pricing.offerEnds).getTime() : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return pricing.offerPrice > 0 && pricing.offerPrice < pricing.regularPrice;
}

export function toPublicCreatorPricing(pricing: CreatorPricing): PublicCreatorPricing {
  const offerActive = isCreatorOfferActive(pricing);
  const publicPrice = offerActive ? pricing.offerPrice : pricing.regularPrice;
  const publicPriceLabel = formatMoney(publicPrice, pricing.currency);
  const regularPriceLabel =
    offerActive && pricing.regularPrice > publicPrice
      ? formatMoney(pricing.regularPrice, pricing.currency)
      : undefined;

  return {
    publicPrice,
    regularPrice: pricing.regularPrice,
    publicPriceLabel,
    regularPriceLabel,
    headline: `${publicPriceLabel} once. Build it, publish it, keep using it.`,
    subheadline: `${publicPriceLabel} once. One profile. No recurring VidCarry platform fee within included limits.`,
    offerActive,
    ctaLabel: pricing.ctaLabel || "Start building",
    available: pricing.available,
    features: pricing.features,
    comparisonPriceLabel: `${publicPriceLabel} one time within limits`,
  };
}

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
  const safePricing: CreatorPricing = {
    regularPrice: Number(pricing?.regularPrice ?? 79),
    offerPrice: Number(pricing?.offerPrice ?? pricing?.regularPrice ?? 79),
    offerStarts: pricing?.offerStarts ?? null,
    offerEnds: pricing?.offerEnds ?? null,
    currency: pricing?.currency ?? "usd",
    ctaLabel: pricing?.ctaLabel ?? "Start building",
    available: pricing?.available ?? true,
    features: Array.isArray(pricing?.features) ? pricing.features : [],
  };

  const offerActive = isCreatorOfferActive(safePricing);
  const publicPrice = offerActive ? safePricing.offerPrice : safePricing.regularPrice;
  const publicPriceLabel = formatMoney(publicPrice, safePricing.currency);
  const regularPriceLabel =
    offerActive && safePricing.regularPrice > publicPrice
      ? formatMoney(safePricing.regularPrice, safePricing.currency)
      : undefined;

  return {
    publicPrice,
    regularPrice: safePricing.regularPrice,
    publicPriceLabel,
    regularPriceLabel,
    headline: `${publicPriceLabel} once. Build it, publish it, keep using it.`,
    subheadline: `${publicPriceLabel} once. One profile. No recurring UGCViss platform fee within included limits.`,
    offerActive,
    ctaLabel: safePricing.ctaLabel || "Start building",
    available: safePricing.available,
    features: safePricing.features,
    comparisonPriceLabel: `${publicPriceLabel} one time within limits`,
  };
}

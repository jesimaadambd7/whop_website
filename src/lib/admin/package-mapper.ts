import type { AdminPackage, PackageVariant } from "@/lib/admin/package-types";
import type { Package } from "@/lib/data/packages";
import { formatMoney } from "@/lib/admin/package-utils";

function isOfferActive(variant: PackageVariant) {
  if (variant.offerPrice == null) return false;
  const now = Date.now();
  const start = variant.offerStarts
    ? new Date(variant.offerStarts).getTime()
    : null;
  const end = variant.offerEnds ? new Date(variant.offerEnds).getTime() : null;
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

function primaryVariant(pkg: AdminPackage) {
  return (
    pkg.variants
      .filter((variant) => variant.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)[0] ??
    pkg.variants.sort((a, b) => a.sortOrder - b.sortOrder)[0]
  );
}

export function toPublicPackage(pkg: AdminPackage): Package {
  const variant = primaryVariant(pkg);
  const offerActive = variant ? isOfferActive(variant) : false;
  const publicPrice = variant
    ? offerActive
      ? variant.offerPrice!
      : variant.regularPrice
    : 0;
  const regularPrice = variant?.regularPrice ?? 0;
  const revisionRounds = variant?.revisionRounds ?? 2;

  return {
    id: pkg.id,
    slug: pkg.slug,
    title: pkg.title,
    sprint: pkg.eyebrow,
    thumbnailLabel: pkg.thumbnailLabel,
    badge: pkg.eyebrow,
    price: formatMoney(publicPrice, variant?.currency ?? "usd"),
    priceAmount: publicPrice,
    priceNote:
      variant?.billingType === "monthly" ? "Billed monthly" : "One-time payment",
    originalPrice:
      offerActive && regularPrice > publicPrice
        ? formatMoney(regularPrice, variant?.currency ?? "usd")
        : undefined,
    description: pkg.bestFor || pkg.summary,
    heroDescription: pkg.summary,
    delivery: pkg.timelineLabel,
    revisions: `${revisionRounds} revision${revisionRounds === 1 ? "" : "s"}`,
    revisionsLabel: `${revisionRounds} round${revisionRounds === 1 ? "" : "s"}`,
    features: pkg.deliverables.slice(0, 3),
    included: pkg.includedItems,
    benefits: pkg.benefits,
    workflowSteps: pkg.processSteps,
    href: `/packages/${pkg.slug}`,
    thumbnail: pkg.thumbnail,
    variantId: variant?.id,
  };
}

export function toPublicPackages(packages: AdminPackage[]) {
  return packages
    .filter((pkg) => pkg.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toPublicPackage);
}

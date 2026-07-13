export function getCheckoutOrigin(fallbackSiteUrl = "") {
  if (typeof window !== "undefined") return window.location.origin;
  return fallbackSiteUrl.replace(/\/$/, "");
}

export function buildCheckoutCompletePath(slug: string, orderId: string) {
  const params = new URLSearchParams({
    orderId,
    status: "success",
  });
  return `/checkout/${slug}/complete?${params.toString()}`;
}

export function buildCheckoutCompleteUrl(
  slug: string,
  orderId: string,
  fallbackSiteUrl = "",
) {
  return `${getCheckoutOrigin(fallbackSiteUrl)}${buildCheckoutCompletePath(slug, orderId)}`;
}

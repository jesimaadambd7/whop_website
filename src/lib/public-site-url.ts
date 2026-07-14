import { siteConfig } from "@/lib/data/site";

function normalizeOrigin(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/** Reject localhost and ephemeral Vercel hosts — emails/portals should use the brand domain. */
function isBrandPublicUrl(url: string) {
  try {
    const host = new URL(normalizeOrigin(url)).hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".localhost")) return false;
    if (host.endsWith(".vercel.app")) return false;
    return true;
  } catch {
    return false;
  }
}

/** Canonical public site origin for links shown to customers (emails, portals, etc.). */
export function getPublicSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv && isBrandPublicUrl(fromEnv)) {
    return normalizeOrigin(fromEnv);
  }
  return siteConfig.url.replace(/\/$/, "");
}

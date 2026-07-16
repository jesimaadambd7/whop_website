import { siteConfig } from "@/lib/data/site";
import { getPublicSiteUrl } from "@/lib/public-site-url";

function normalizeOrigin(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/** Host used for images inside emails (must be a public HTTPS origin). */
export function getEmailAssetBaseUrl() {
  const explicit =
    process.env.EMAIL_ASSET_BASE_URL?.trim() ||
    process.env.EMAIL_LOGO_BASE_URL?.trim();
  if (explicit) return normalizeOrigin(explicit);

  const siteUrl = getPublicSiteUrl();
  if (siteUrl) return siteUrl;

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return normalizeOrigin(vercelProd);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalizeOrigin(vercelUrl);

  return siteConfig.url.replace(/\/$/, "");
}

export function escapeEmailHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getEmailLogoUrl() {
  const custom = process.env.EMAIL_LOGO_URL?.trim();
  if (custom) return custom;

  const base = getEmailAssetBaseUrl();
  // Served from /brand (not /assets) so the vidcarry asset rewrite never proxies it away.
  return `${base}/brand/ugcviss-logo-email.png`;
}

/** Brand header used across customer emails. Logo + text so something shows if images are blocked. */
export function renderEmailBrandHeader() {
  const logoUrl = getEmailLogoUrl();
  const siteUrl = getPublicSiteUrl();

  return `<a href="${escapeEmailHtml(siteUrl)}" style="text-decoration:none;display:inline-block;">
      <img
        src="${escapeEmailHtml(logoUrl)}"
        width="180"
        height="38"
        alt="${escapeEmailHtml(siteConfig.name)}"
        style="display:block;margin:0 auto 10px auto;border:0;outline:none;text-decoration:none;max-width:180px;height:auto;"
      />
      <div style="font-size:12px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#38bdf8;text-align:center;">
        ${escapeEmailHtml(siteConfig.name)}
      </div>
    </a>`;
}

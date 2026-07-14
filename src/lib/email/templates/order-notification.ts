import { siteConfig } from "@/lib/data/site";

export type OrderEmailTemplateInput = {
  customerName: string;
  orderNumber: string;
  packageTitle: string;
  body: string;
  portalUrl: string;
  kind: "delivery" | "message" | "status" | "confirmation";
  amountLabel?: string;
};

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || siteConfig.url;
}

function normalizeOrigin(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/** Host used for images inside emails (must be a public HTTPS origin). */
function getEmailAssetBaseUrl() {
  const explicit =
    process.env.EMAIL_ASSET_BASE_URL?.trim() ||
    process.env.EMAIL_LOGO_BASE_URL?.trim();
  if (explicit) return normalizeOrigin(explicit);

  // Prefer the Vercel deployment host — custom domains may not be live yet.
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return normalizeOrigin(vercelProd);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalizeOrigin(vercelUrl);

  const siteUrl = getSiteUrl();
  if (siteUrl && !siteUrl.includes("localhost")) return siteUrl;

  return null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkifyText(text: string) {
  const urlPattern = /(https?:\/\/[^\s<]+)/g;
  const parts = text.split(urlPattern);

  return parts
    .map((part) => {
      if (/^https?:\/\//.test(part)) {
        const safeUrl = escapeHtml(part);
        return `<a href="${safeUrl}" style="color:#38bdf8;text-decoration:underline;word-break:break-all;">${safeUrl}</a>`;
      }

      return escapeHtml(part)
        .split("\n")
        .join("<br />");
    })
    .join("");
}

function getLogoUrl() {
  const custom = process.env.EMAIL_LOGO_URL?.trim();
  if (custom) return custom;

  const base = getEmailAssetBaseUrl();
  if (!base) return null;

  // Served from /brand (not /assets) so the vidcarry asset rewrite never proxies it away.
  return `${base}/brand/ugcviss-logo-email.png`;
}

function renderBrandHeader() {
  const logoUrl = getLogoUrl();

  if (logoUrl) {
    return `<a href="${getSiteUrl()}" style="text-decoration:none;display:inline-block;">
      <img
        src="${escapeHtml(logoUrl)}"
        width="180"
        height="48"
        alt="${escapeHtml(siteConfig.name)}"
        style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;max-width:180px;height:auto;border-radius:10px;"
      />
    </a>`;
  }

  return `<a href="${getSiteUrl()}" style="text-decoration:none;display:inline-block;">
    <div style="font-size:34px;line-height:1;font-weight:800;letter-spacing:-0.04em;color:#38bdf8;">
      ${escapeHtml(siteConfig.name)}
    </div>
    <div style="margin-top:8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#71717a;">
      Creative Production Agency
    </div>
  </a>`;
}

function getKindMeta(kind: OrderEmailTemplateInput["kind"]) {
  if (kind === "confirmation") {
    return {
      badge: "Order confirmed",
      headline: "Thanks for your order",
      intro: "We've received your payment and your UGCViss order is confirmed.",
      preheader: "Your UGCViss order is confirmed.",
      cta: "View order",
    };
  }

  if (kind === "delivery") {
    return {
      badge: "Delivery ready",
      headline: "Your creative delivery is ready",
      intro: "We've completed your order and shared the final files below.",
      preheader: "Your UGCViss delivery is ready to review.",
      cta: "View delivery",
    };
  }

  if (kind === "status") {
    return {
      badge: "Order update",
      headline: "Your order status has been updated",
      intro: "Here's the latest update on your UGCViss project.",
      preheader: "New update on your UGCViss order.",
      cta: "View order",
    };
  }

  return {
    badge: "New message",
    headline: "You have a new message",
    intro: "Our team sent you an update about your project.",
    preheader: "New message from the UGCViss team.",
    cta: "View message",
  };
}

export function buildOrderEmailHtml(input: OrderEmailTemplateInput) {
  const siteUrl = getSiteUrl();
  const meta = getKindMeta(input.kind);
  const greeting = input.customerName.trim()
    ? `Hi ${escapeHtml(input.customerName)},`
    : "Hi there,";
  const supportEmail = process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>${escapeHtml(meta.headline)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0d12;font-family:Arial,Helvetica,sans-serif;color:#e4e4e7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(meta.preheader)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0b0d12;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tr>
              <td style="padding:0 0 24px 0;text-align:center;">
                ${renderBrandHeader()}
              </td>
            </tr>
            <tr>
              <td style="background-color:#12151d;border:1px solid #272a33;border-radius:24px;padding:32px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom:20px;">
                      <span style="display:inline-block;background-color:rgba(56,189,248,0.12);color:#38bdf8;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:8px 12px;border-radius:999px;">
                        ${escapeHtml(meta.badge)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:10px;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">
                      ${escapeHtml(meta.headline)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:24px;font-size:15px;line-height:1.7;color:#a1a1aa;">
                      ${greeting}<br /><br />
                      ${escapeHtml(meta.intro)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0b0d12;border:1px solid #272a33;border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;padding-bottom:8px;">
                              Order details
                            </div>
                            <div style="font-size:15px;line-height:1.6;color:#ffffff;font-weight:700;padding-bottom:4px;">
                              ${escapeHtml(input.packageTitle)}
                            </div>
                            <div style="font-size:13px;line-height:1.6;color:#a1a1aa;">
                              Order ${escapeHtml(input.orderNumber)}
                            </div>
                            ${
                              input.amountLabel
                                ? `<div style="font-size:13px;line-height:1.6;color:#38bdf8;font-weight:700;padding-top:8px;">
                              ${escapeHtml(input.amountLabel)}
                            </div>`
                                : ""
                            }
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:28px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0b0d12;border:1px solid #272a33;border-radius:16px;">
                        <tr>
                          <td style="padding:20px;font-size:15px;line-height:1.8;color:#d4d4d8;">
                            ${linkifyText(input.body.trim())}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <a
                        href="${escapeHtml(input.portalUrl)}"
                        style="display:inline-block;background-color:#38bdf8;color:#041018;text-decoration:none;font-size:15px;font-weight:700;padding:14px 28px;border-radius:999px;"
                      >
                        ${escapeHtml(meta.cta)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 8px 0;text-align:center;font-size:12px;line-height:1.7;color:#71717a;">
                <p style="margin:0 0 8px 0;">
                  ${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.tagline)}
                </p>
                <p style="margin:0 0 8px 0;">
                  Questions? Reply to this email or contact
                  <a href="mailto:${escapeHtml(supportEmail)}" style="color:#38bdf8;text-decoration:underline;">
                    ${escapeHtml(supportEmail)}
                  </a>
                </p>
                <p style="margin:0;">
                  <a href="${siteUrl}" style="color:#71717a;text-decoration:underline;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
                  · © ${year} ${escapeHtml(siteConfig.name)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildOrderEmailPlainText(input: OrderEmailTemplateInput) {
  const meta = getKindMeta(input.kind);
  const greeting = input.customerName.trim() ? `Hi ${input.customerName},` : "Hi there,";
  const supportEmail = process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email;

  return [
    greeting,
    "",
    meta.intro,
    "",
    `Order: ${input.packageTitle}`,
    `Reference: ${input.orderNumber}`,
    ...(input.amountLabel ? [`Amount: ${input.amountLabel}`] : []),
    "",
    input.body.trim(),
    "",
    `${meta.cta}: ${input.portalUrl}`,
    "",
    `${siteConfig.name}`,
    `Support: ${supportEmail}`,
    siteConfig.url,
  ].join("\n");
}

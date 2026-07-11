export const contactServiceOptions = [
  "UGC Ads Production",
  "Model & Product Shoot Production",
  "Paid Ads Management",
  "Video Editing",
  "Motion Graphics",
  "Paid Social Ad Creatives",
  "YouTube Video Editing",
  "Short Form Content",
  "Creative Strategy",
  "Creator Sourcing",
  "Global Talent & Celebrity Production",
] as const;

export const contactBudgetOptions = [
  "$1k - $3k",
  "$3k - $7k",
  "$7k - $15k",
  "$15k+",
  "Not sure yet",
] as const;

/** Public booking page (open in new tab). */
export const calendlyUrl = "https://calendly.com/nadimmahmudytd/30min";

/** Direct scheduling link from Calendly (fallback if embed fails). */
export const calendlySchedulingUrl =
  "https://calendly.com/d/dvzd-8xf-4bw/30-minute-meeting";

const calendlyEventPath = "https://calendly.com/nadimmahmudytd/30min";

type CalendlyEmbedOptions = {
  date?: string;
  embedDomain?: string;
};

export function getCalendlyEmbedUrl(options: CalendlyEmbedOptions = {}) {
  const params = new URLSearchParams({
    embed_type: "Inline",
    hide_gdpr_banner: "1",
  });

  if (options.date) params.set("date", options.date);
  if (options.embedDomain) params.set("embed_domain", options.embedDomain);

  return `${calendlyEventPath}?${params.toString()}`;
}

export function getCalendlyPopupUrl(date?: string) {
  const base = `${calendlyUrl}?hide_gdpr_banner=1`;
  if (!date) return base;
  return `${base}&date=${date}`;
}

export function formatCalendlyDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDefaultBookingDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export const callNextSteps = [
  "Review your offer, audience, and current sales bottleneck.",
  "Recommend the best mix of shoot, editing, creative, and ads support.",
  "Define clear next steps before production or campaign launch.",
] as const;

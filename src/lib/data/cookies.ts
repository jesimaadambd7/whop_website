import type { LegalSection } from "@/lib/data/legal-page";

export const cookieLastUpdated = "June 20, 2026";

export const cookieSections: LegalSection[] = [
  {
    id: "what-cookies-are",
    number: "01",
    title: "What cookies are",
    navLabel: "What cookies are",
    paragraphs: [
      "Cookies are small files or browser storage items placed on your device when you visit a website. They help websites remember choices, support security, understand traffic, and improve the browsing experience.",
      "Similar technologies may include local storage, pixels, tags, and scripts.",
    ],
  },
  {
    id: "essential-cookies",
    number: "02",
    title: "Essential cookies",
    navLabel: "Essential cookies",
    paragraphs: [
      "Essential cookies are required for the website to work properly. They may support security, page loading, consent storage, and core website functionality.",
      "UGCViss uses essential consent storage so the cookie banner does not show repeatedly after you accept, decline, or save preferences.",
    ],
  },
  {
    id: "experience-cookies",
    number: "03",
    title: "Experience cookies",
    navLabel: "Experience cookies",
    paragraphs: [
      "With your consent, experience cookies may help remember preferences and improve how the website feels during future visits.",
      "If you decline non-essential cookies, core website functionality should still work.",
    ],
  },
  {
    id: "analytics-cookies",
    number: "04",
    title: "Analytics cookies",
    navLabel: "Analytics cookies",
    paragraphs: [
      "With your consent, analytics cookies, pixels, and tags may help UGCViss understand website traffic, popular pages, referral sources, campaign performance, and general visitor behavior.",
      "Optional tools may include Google Tag Manager to manage consent-gated tags, Google Analytics 4 for traffic and conversion analytics, Microsoft Clarity for heatmaps and session insights, Meta Pixel for advertising measurement, and LinkedIn Insight Tag for campaign attribution.",
      "Analytics information helps improve page content, navigation, creative resources, and conversion-focused website experiences.",
    ],
  },
  {
    id: "third-party-cookies-and-tools",
    number: "05",
    title: "Third-party cookies and tools",
    navLabel: "Third-party cookies and tools",
    paragraphs: [
      "Some embedded tools, links, analytics providers, advertising platforms, or scheduling tools such as Calendly may use cookies or similar technologies according to their own policies.",
      "UGCViss does not control third-party cookies once you interact with another platform or open an external link.",
    ],
  },
  {
    id: "managing-preferences",
    number: "06",
    title: "Managing preferences",
    navLabel: "Managing preferences",
    paragraphs: [
      "When the cookie banner appears, you can accept, decline, or choose preferences. After you save a choice, the banner stays hidden on future visits unless browser storage is cleared or the consent setting expires.",
      "You can also manage or delete cookies through your browser settings. Blocking some cookies may affect website functionality.",
    ],
  },
  {
    id: "updates-and-contact",
    number: "07",
    title: "Updates and contact",
    navLabel: "Updates and contact",
    paragraphs: [
      "UGCViss may update this Cookie Policy as the website, tools, and services change. The latest version will be posted on this page.",
      "For cookie questions, contact UGCViss through the contact page.",
    ],
  },
];

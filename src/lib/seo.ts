import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — UGC ads, video editing, and paid social creative`,
} as const;

export const defaultKeywords = [
  "UGC ads",
  "UGC video agency",
  "ecommerce video ads",
  "DTC video creative",
  "paid social creatives",
  "video editing agency",
  "product video shoots",
  "performance video creative",
  "UGCViss",
] as const;

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  noIndex?: boolean;
};

function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Build consistent title, description, canonical, Open Graph, and Twitter metadata. */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? {
        url: image.url.startsWith("http") ? image.url : absoluteUrl(image.url),
        width: image.width ?? 1200,
        height: image.height ?? 630,
        alt: image.alt ?? title,
      }
    : {
        url: absoluteUrl(DEFAULT_OG_IMAGE.url),
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: DEFAULT_OG_IMAGE.alt,
      };

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const keywordList = Array.from(
    new Set([...keywords, ...defaultKeywords].map((item) => item.trim()).filter(Boolean)),
  );

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: keywordList,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    logo: `${siteConfig.url}/brand/ugcviss-logo-transparent.png`,
    sameAs: [],
    areaServed: "Worldwide",
    knowsAbout: [
      "UGC ads",
      "Video editing",
      "Paid social creatives",
      "Ecommerce video production",
      "Motion graphics",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
}

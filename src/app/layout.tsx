import { Manrope, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { CookieNotice } from "@/components/cookies/CookieNotice";
import { CookiePreferencesDialog } from "@/components/cookies/CookiePreferencesDialog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteScrollManager } from "@/components/layout/RouteScrollManager";
import { ScrollTimelineProgress } from "@/components/effects/cinematic/ScrollTimelineProgress";
import { GlobalAmbientBackground } from "@/components/effects/cinematic/GlobalAmbientBackground";
import { siteConfig } from "@/lib/data/site";
import {
  defaultKeywords,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const homeTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...defaultKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "marketing",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: homeTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#030308] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CookieConsentProvider>
          <RouteScrollManager />
          <GlobalAmbientBackground />
          <ScrollTimelineProgress />
          <div className="pointer-events-none fixed inset-0 z-[1] bg-grid opacity-[0.12] max-md:opacity-[0.06]" />
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <CookieNotice />
          <CookiePreferencesDialog />
        </CookieConsentProvider>
      </body>
    </html>
  );
}

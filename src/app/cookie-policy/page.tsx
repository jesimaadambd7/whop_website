import type { Metadata } from "next";
import { LegalSectionCard } from "@/components/legal/LegalSectionCard";
import { LegalSidebar } from "@/components/legal/LegalSidebar";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { cookieLastUpdated, cookieSections } from "@/lib/data/cookies";
import { siteConfig } from "@/lib/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "Learn how UGCViss uses essential and optional cookies to support website experience, preferences, and analytics.",
  path: "/cookie-policy",
  keywords: ["UGCViss cookie policy"],
});

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/cookie-policy#webpage`,
  url: `${siteConfig.url}/cookie-policy`,
  name: "Cookie Policy - UGCViss",
  description:
    "Read the UGCViss cookie policy and learn how essential and optional cookies support the website experience.",
  inLanguage: "en",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cookie Policy",
      item: `${siteConfig.url}/cookie-policy`,
    },
  ],
};

export default function CookiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Cookie Policy"
        title="How UGCViss uses cookies and consent preferences."
        description="This policy explains the cookie categories used by this website and how visitors can manage consent preferences."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,168,255,0.1),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(255,255,255,0.05),transparent_24%)]"
        />

        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <LegalSidebar
              lastUpdated={cookieLastUpdated}
              sections={cookieSections}
              ariaLabel="Cookie Policy sections"
            />

            <div className="grid gap-5">
              {cookieSections.map((section) => (
                <LegalSectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

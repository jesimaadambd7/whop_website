import type { Metadata } from "next";
import { LegalSectionCard } from "@/components/legal/LegalSectionCard";
import { LegalSidebar } from "@/components/legal/LegalSidebar";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site";
import { termsLastUpdated, termsSections } from "@/lib/data/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions - UGCViss",
  description:
    "Read the UGCViss terms and conditions for website use, creative services, project scope, payments, revisions, asset usage, and paid ads support.",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/terms-conditions#webpage`,
  url: `${siteConfig.url}/terms-conditions`,
  name: "Terms & Conditions - UGCViss",
  description:
    "Read the UGCViss terms and conditions for website use, creative services, project scope, payments, revisions, asset usage, and paid ads support.",
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
      name: "Terms & Conditions",
      item: `${siteConfig.url}/terms-conditions`,
    },
  ],
};

export default function TermsPage() {
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
        eyebrow="Terms & Conditions"
        title="Terms for using UGCViss services and website."
        description="These terms explain how UGCViss works with clients, handles creative services, and governs use of this website."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,168,255,0.1),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(255,255,255,0.05),transparent_24%)]"
        />

        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <LegalSidebar
              lastUpdated={termsLastUpdated}
              sections={termsSections}
              ariaLabel="Terms & Conditions sections"
            />

            <div className="grid gap-5">
              {termsSections.map((section) => (
                <LegalSectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

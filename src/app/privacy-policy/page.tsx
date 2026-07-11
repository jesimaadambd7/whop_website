import type { Metadata } from "next";
import { LegalSectionCard } from "@/components/legal/LegalSectionCard";
import { LegalSidebar } from "@/components/legal/LegalSidebar";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/data/site";
import { privacyLastUpdated, privacySections } from "@/lib/data/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy - VidCarry",
  description:
    "Read the VidCarry privacy policy and learn how VidCarry may collect, use, retain, and protect website, inquiry, booking, and client communication information.",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/privacy-policy#webpage`,
  url: `${siteConfig.url}/privacy-policy`,
  name: "Privacy Policy - VidCarry",
  description:
    "Read the VidCarry privacy policy and learn how VidCarry may collect, use, retain, and protect website, inquiry, booking, and client communication information.",
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
      name: "Privacy Policy",
      item: `${siteConfig.url}/privacy-policy`,
    },
  ],
};

export default function PrivacyPage() {
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
        eyebrow="Privacy Policy"
        title="How VidCarry collects, uses, and protects information."
        description="This policy explains what information VidCarry may collect through the website, inquiry forms, Calendly bookings, and client communications."
      />

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,168,255,0.1),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(255,255,255,0.05),transparent_24%)]"
        />

        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <LegalSidebar
              lastUpdated={privacyLastUpdated}
              sections={privacySections}
              ariaLabel="Privacy Policy sections"
            />

            <div className="grid gap-5">
              {privacySections.map((section) => (
                <LegalSectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

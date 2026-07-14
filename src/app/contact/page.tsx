import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactInquirySection } from "@/components/contact/ContactInquirySection";
import { ContactScheduleSection } from "@/components/contact/ContactScheduleSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Call — UGC Ads & Video Creative Strategy",
  description:
    "Book a UGCViss strategy call or send a brief for your next UGC ad batch, product shoot, video editing sprint, motion package, or paid social campaign.",
  path: "/contact",
  keywords: [
    "book UGC agency call",
    "hire video creative agency",
    "UGC ads consultation",
    "ecommerce video production inquiry",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a call or send us the brief."
        description="Share the campaign you want to build first, then choose a call time if you want to move quickly. We will help shape the right creative sprint across strategy, production, editing, motion, and paid social execution."
      />

      <ContactInquirySection />
      <ContactScheduleSection />
    </>
  );
}

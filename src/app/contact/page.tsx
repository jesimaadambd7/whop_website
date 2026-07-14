import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactInquirySection } from "@/components/contact/ContactInquirySection";
import { ContactScheduleSection } from "@/components/contact/ContactScheduleSection";

export const metadata: Metadata = {
  title: "Book a Call - UGCViss Creative & Paid Ads Agency",
  description:
    "Book a UGCViss strategy call through Calendly or send a project brief for your next model shoot, UGC ad batch, video editing sprint, or paid ads campaign.",
};

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

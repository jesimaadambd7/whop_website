import type { Metadata } from "next";
import { FounderJourneyPage } from "@/components/team/FounderJourneyPage";
import { neazMahmudJourney } from "@/lib/data/founder-journey";
import { siteConfig } from "@/lib/data/site";

const { member } = neazMahmudJourney;
const title = `${member.name} - ${member.role} of VidCarry`;
const description = `Read ${member.name}'s founder journey from video editing and production to building VidCarry as a shoot-to-sales creative agency.`;
const canonical = `${siteConfig.url}/team/neaz-mahmud`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    member.name,
    "VidCarry founder",
    "creative agency founder",
    "video production journey",
    "UGC ads agency",
    "paid social ads",
    "DTC creative agency",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "VidCarry",
    locale: "en_US",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${member.name} - Founder journey at VidCarry`,
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function NeazMahmudJourneyPage() {
  return <FounderJourneyPage journey={neazMahmudJourney} />;
}

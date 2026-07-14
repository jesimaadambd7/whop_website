import type { Metadata } from "next";
import { FounderJourneyPage } from "@/components/team/FounderJourneyPage";
import { neazMahmudJourney } from "@/lib/data/founder-journey";
import { buildPageMetadata } from "@/lib/seo";

const { member } = neazMahmudJourney;

export const metadata: Metadata = buildPageMetadata({
  title: `${member.name} — ${member.role} of UGCViss`,
  description: `Read ${member.name}'s founder journey from video editing and production to building UGCViss as a shoot-to-sales creative agency.`,
  path: "/team/neaz-mahmud",
  keywords: [
    member.name,
    "UGCViss founder",
    "creative agency founder",
    "video production journey",
    "UGC ads agency",
  ],
});

export default function NeazMahmudJourneyPage() {
  return <FounderJourneyPage journey={neazMahmudJourney} />;
}

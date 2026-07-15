import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FounderJourneyPage } from "@/components/team/FounderJourneyPage";
import {
  buildFounderJourney,
  neazMahmudJourneyContent,
} from "@/lib/data/founder-journey";
import { loadTeamMemberBySlug, teamMembers } from "@/lib/data/team";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK_SLUG = "neaz-mahmud";

async function resolveFounderMember() {
  const fromStore = await loadTeamMemberBySlug(FALLBACK_SLUG);
  if (fromStore) return fromStore;
  return teamMembers.find((member) => member.slug === FALLBACK_SLUG);
}

export async function generateMetadata(): Promise<Metadata> {
  const member = await resolveFounderMember();
  if (!member) return { title: "Founder" };

  return buildPageMetadata({
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
}

export default async function NeazMahmudJourneyPage() {
  const member = await resolveFounderMember();
  if (!member) notFound();

  return (
    <FounderJourneyPage
      journey={buildFounderJourney(member, neazMahmudJourneyContent)}
    />
  );
}

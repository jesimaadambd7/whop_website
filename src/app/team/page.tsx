import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { FounderTeamCard } from "@/components/shared/FounderTeamCard";
import { MemberTeamCard } from "@/components/shared/MemberTeamCard";
import { TeamCultureCard } from "@/components/team/TeamCultureCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  isFounderMember,
  loadTeamMembers,
  sortTeamWithFounderFirst,
  teamCulture,
} from "@/lib/data/team";

export const metadata: Metadata = {
  title: "VidCarry Team - Production, UGC Editing & Paid Ads",
  description:
    "Meet the VidCarry team across model shoot production, UGC editing, performance ads, creative strategy, and web systems.",
};

export default async function TeamPage() {
  const teamMembers = sortTeamWithFounderFirst(await loadTeamMembers());

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Meet the people carrying VidCarry's shoot-to-sales production."
        description="Our team brings together model shoot production, performance video ads, UGC editing, paid ad thinking, creative strategy, and the systems needed to keep growth work moving."
      />

      <SectionShell>
        <Container>
          <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.slug} className="h-full overflow-visible">
                {isFounderMember(member) ? (
                  <FounderTeamCard member={member} />
                ) : (
                  <MemberTeamCard member={member} variant="page" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Culture
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Small team energy, senior-level taste, shoot-to-launch discipline.
            </h2>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-5 lg:grid-cols-3">
            {teamCulture.map((item) => (
              <TeamCultureCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <CtaBanner title="Need a shoot, creative, and ads team without hiring one?" />
    </>
  );
}

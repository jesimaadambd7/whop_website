import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { MemberTeamCard } from "@/components/shared/MemberTeamCard";
import { FounderTeamCard } from "@/components/shared/FounderTeamCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  isFounderMember,
  sortTeamWithFounderFirst,
  type TeamMember,
} from "@/lib/data/team";

export function TeamSection({ members }: { members: TeamMember[] }) {
  const sorted = sortTeamWithFounderFirst(members);

  return (
    <SectionShell withGrid cinematic tone="elevated">
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <CinematicSectionHeading
            eyebrow="Team"
            title="A lean creative crew with production, editing, ads, and growth depth."
          />
        </Reveal>

        <Stagger
          className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
          stagger={0.1}
        >
          {sorted.map((member) => (
            <StaggerItem key={member.slug} className="h-full overflow-visible">
              {isFounderMember(member) ? (
                <FounderTeamCard member={member} />
              ) : (
                <MemberTeamCard member={member} />
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

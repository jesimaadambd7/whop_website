import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/shared/TeamCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { loadTeamMembers } from "@/lib/data/team";
import type { TeamMember } from "@/lib/data/team";

export function TeamSection({ members }: { members: TeamMember[] }) {
  return (
    <SectionShell withGrid>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Team
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            A lean creative crew with production, editing, ads, and growth depth.
          </h2>
        </Reveal>

        <Stagger
          className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
          stagger={0.1}
        >
          {members.map((member) => (
            <StaggerItem key={member.slug} className="h-full">
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

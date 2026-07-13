import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { WhyChooseCard } from "@/components/shared/WhyChooseCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const reasons = [
  "Performance-first creative, not just pretty video",
  "Global remote crew, creators, actors, and influencers under one workflow",
  "Global production quality with performance fluency",
  "Fast creative sprints built for testing and sales",
];

export function WhyChooseSection() {
  return (
    <SectionShell withGrid withOrb cinematic>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <CinematicSectionHeading
            eyebrow="Why choose us"
            title="A production and growth partner for teams that cannot wait on slow creative."
          />
        </Reveal>

        <Stagger className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2" stagger={0.1}>
          {reasons.map((reason, i) => (
            <StaggerItem key={reason} className="h-full">
              <WhyChooseCard index={i} title={reason} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

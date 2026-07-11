import { Container } from "@/components/ui/Container";
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
    <SectionShell withGrid withOrb>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Why choose us
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            A production and growth partner for teams that cannot wait on slow creative.
          </h2>
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

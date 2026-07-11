import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { ProofClientCard } from "@/components/home/ProofClientCard";
import { ProofStatCard } from "@/components/home/ProofStatCard";
import { ProofFeatureCard } from "@/components/home/ProofFeatureCard";

const proofItems = [
  {
    num: "01",
    title: "Client work libraries",
    description:
      "Each featured brand can hold its own video library, campaign notes, angles, and deliverables so prospects can review work by client instead of scrolling through loose cards.",
  },
  {
    num: "02",
    title: "Shoot-to-sales workflow",
    description:
      "VidCarry connects model shoots, creator footage, editing, motion polish, paid social creative, and campaign learning into one sprint instead of one-off asset delivery.",
  },
  {
    num: "03",
    title: "Global talent network",
    description:
      "The site now supports actors, creators, influencers, celebrity talent, remote editors, production operators, careers applications, and talent video submissions.",
  },
];

const proofStats = [
  { value: "18+", label: "ad variants planned per sprint when the brief needs creative testing depth" },
  { value: "3", label: "core funnel stages covered: cold traffic, consideration, and retargeting" },
  { value: "9:16", label: "default video system for social-first mobile campaigns" },
];

export function ProofSection() {
  return (
    <SectionShell withGrid>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Proof system"
                title="Real client libraries, production signals, and sales-focused output."
                description="VidCarry's strongest proof layer is the work system: brand libraries, campaign formats, structured deliverables, and repeatable creative testing assets."
              />
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <ProofClientCard />
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            <Stagger className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-3" stagger={0.08}>
              {proofStats.map((stat) => (
                <StaggerItem key={stat.label} className="h-full">
                  <ProofStatCard value={stat.value} label={stat.label} />
                </StaggerItem>
              ))}
            </Stagger>

            <Stagger className="space-y-3" stagger={0.1}>
              {proofItems.map((item) => (
                <StaggerItem key={item.num}>
                  <ProofFeatureCard
                    num={item.num}
                    title={item.title}
                    description={item.description}
                  />
                </StaggerItem>
              ))}

              <StaggerItem>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    href="/portfolio"
                    variant="secondary"
                    size="sm"
                    className="glass-hover-btn"
                  >
                    View Client Libraries
                  </Button>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}

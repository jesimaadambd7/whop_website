import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const processSteps = [
  {
    num: "01",
    title: "Creative brief",
    description:
      "We turn product, audience, offer, objections, and ad data into a clear creative direction before production starts.",
  },
  {
    num: "02",
    title: "Talent and shoot prep",
    description:
      "Models, creators, actors, influencers, props, shot lists, and product demo beats are planned around the ad structure.",
  },
  {
    num: "03",
    title: "Edit and motion system",
    description:
      "Raw footage becomes 9:16 ads with hook pacing, captions, product proof, motion callouts, and CTA variants.",
  },
  {
    num: "04",
    title: "Launch feedback loop",
    description:
      "The next creative batch is shaped by what buyers respond to, not by guesswork alone.",
  },
];

export function ProcessSection() {
  return (
    <SectionShell withGrid>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Production process"
            title="From brief to launch-ready ads in four clear stages."
            description="Every sprint follows a structured workflow so your team always knows what is happening, what is next, and when assets are ready to test."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.12}>
          {processSteps.map((step) => (
            <StaggerItem key={step.num}>
              <AnimatedCard className="shine-border">
                <div className="flex gap-6">
                  <span className="font-mono text-sm text-sky-400/60">{step.num}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-sky-300">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { ProcessStepCard } from "@/components/shared/ProcessStepCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const clientSteps = [
  {
    step: "Step 01",
    title: "Map the sales angle",
    description:
      "We unpack your offer, audience, objections, product proof, and ad goals before a single shoot or edit starts.",
  },
  {
    step: "Step 02",
    title: "Shoot and build the batch",
    description:
      "Our team turns the strategy into model casting, creator briefs, shoot plans, edits, motion systems, and ad variants.",
  },
  {
    step: "Step 03",
    title: "Launch, optimize, scale",
    description:
      "You get assets ready for launch, plus paid ads support to test, learn, and improve the next sales-focused sprint.",
  },
];

export function ClientProcessSection() {
  return (
    <SectionShell withGrid cinematic>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <CinematicSectionHeading
            eyebrow="Client process"
            title="A simple sprint system from product shoot to paid ads."
          />
        </Reveal>

        <Stagger className="grid auto-rows-fr items-stretch gap-5 lg:grid-cols-3" stagger={0.12}>
          {clientSteps.map((item) => (
            <StaggerItem key={item.step} className="h-full">
              <ProcessStepCard
                step={item.step}
                title={item.title}
                description={item.description}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

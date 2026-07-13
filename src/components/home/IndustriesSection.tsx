import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { industries } from "@/lib/data/site";

type IndustriesSectionProps = {
  showDescription?: boolean;
  bordered?: boolean;
};

export function IndustriesSection({
  showDescription = true,
  bordered = false,
}: IndustriesSectionProps) {
  return (
    <SectionShell withGrid={false} bordered={bordered} cinematic>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <CinematicSectionHeading
            eyebrow="Industries"
            title="Built for product-led brands and agency teams."
            description={
              showDescription
                ? "The creative system works best when a brand has a product, an offer, a buyer problem, and a need for stronger video assets."
                : undefined
            }
          />
        </Reveal>

        <Stagger className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {industries.map((industry, i) => (
            <StaggerItem key={industry} className="h-full">
              <IndustryCard index={i} title={industry} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

import { Container } from "@/components/ui/Container";
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
    <SectionShell withGrid={false} bordered={bordered}>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Industries
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Built for product-led brands and agency teams.
          </h2>
          {showDescription && (
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              The creative system works best when a brand has a product, an offer, a buyer
              problem, and a need for stronger video assets.
            </p>
          )}
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

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/lib/data/services";

export function ServicesSection() {
  return (
    <SectionShell withGrid cinematic>
      <Container>
        <Reveal className="mb-10 sm:mb-14">
          <CinematicSectionHeading
            eyebrow="Services"
            title="Creative production built for launch, testing, and scale."
            description="From strategy and production planning to UGC edits, motion polish, paid social assets, and launch support, VidCarry covers the creative layer brands need to move faster."
          />
        </Reveal>

        <Stagger className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.map((service, i) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} eager={i < 3} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/services"
            className="glass-hover-btn inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold tracking-tight text-white transition duration-300 hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-6"
          >
            Explore Services
          </Link>
        </Reveal>
      </Container>
    </SectionShell>
  );
}

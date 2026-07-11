import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { PackageCard } from "@/components/shared/PackageCard";
import type { Package } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

export function PackageGrid({
  packages,
  showHeading = true,
  withOrb = false,
}: {
  packages: Package[];
  showHeading?: boolean;
  withOrb?: boolean;
}) {
  return (
    <SectionShell id="packages" withGrid={false} withOrb={withOrb}>
      <Container>
        {showHeading && (
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Direct-purchase packages
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Choose a sprint, pay securely, and start without waiting for a sales call.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Every package has a clear scope, delivery estimate, included revision rounds,
              and a private client workspace after payment.
            </p>
          </Reveal>
        )}

        <Stagger
          className={cn(
            "grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4",
            !showHeading && "mt-0",
          )}
          stagger={0.1}
        >
          {packages.map((pkg, i) => (
            <StaggerItem key={pkg.id} className="h-full">
              <PackageCard pkg={pkg} eager={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>

        {showHeading && (
          <Reveal className="mt-8" delay={0.2}>
            <Link
              href="/contact#book-call"
              className="glass-hover-btn inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold tracking-tight text-white transition duration-300 hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-6"
            >
              Scope a Custom Sprint
            </Link>
          </Reveal>
        )}
      </Container>
    </SectionShell>
  );
}

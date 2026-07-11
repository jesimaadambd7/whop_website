import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { packages } from "@/lib/data/packages";

export function PackagesSection() {
  return (
    <section id="packages" className="border-b border-white/5 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Direct-purchase packages"
          title="Choose a sprint, pay securely, and start without waiting for a sales call."
          description="Every package has a clear scope, delivery estimate, included revision rounds, and a private client workspace after payment."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-sky-400/30 hover:bg-sky-400/5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-600">{pkg.sprint}</span>
                <Link
                  href={pkg.href}
                  className="text-xs text-sky-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  View
                </Link>
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-amber-400">
                {pkg.badge}
              </p>
              <p className="mt-4 font-display text-3xl font-bold text-white">
                {pkg.price}
              </p>
              {pkg.originalPrice && (
                <p className="text-sm text-zinc-600 line-through">
                  {pkg.originalPrice}
                </p>
              )}
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {pkg.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500">{pkg.description}</p>
              <p className="mt-4 text-xs text-zinc-600">
                {pkg.delivery} / {pkg.revisions}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-zinc-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <Button href={pkg.href} variant="secondary" size="sm" className="w-full">
                  View Details
                </Button>
                <Button href={`/checkout/${pkg.slug}`} size="sm" className="w-full">
                  Purchase Package
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/contact" variant="outline">
            Scope a Custom Sprint
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}

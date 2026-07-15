import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AuditForm } from "@/components/shared/AuditForm";
import { ServiceDetailCard } from "@/components/shared/ServiceDetailCard";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { loadPackages } from "@/lib/data/packages";
import { services, serviceBottlenecks } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "UGC Ads, Video Editing & Paid Social Services",
  description:
    "Explore UGCViss services for UGC ads, video editing, motion graphics, paid social creatives, creator sourcing, product shoots, and performance ad support for DTC brands.",
  path: "/services",
  keywords: [
    "UGC ads services",
    "video editing services",
    "paid social creative services",
    "product shoot production",
    "motion graphics for ads",
  ],
});

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}

function ServicesItemListJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UGCViss Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteConfig.url}/services/${service.id}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ServicesPage() {
  const packages = await loadPackages();

  return (
    <>
      <ServicesItemListJsonLd />
      <PageHero
        eyebrow="Services"
        title="Production and paid ads services for brands that need more than a single edit."
        description="Choose a focused service or build a complete sprint around creative strategy, production planning, UGC, editing, motion, paid social assets, and launch support."
      />

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={0.04 * (i + 1)}>
                <ServiceDetailCard service={service} eager={i < 2} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PackageGrid packages={packages} />

      <IndustriesSection bordered />

      <section className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="How to choose"
            title="Not sure which service fits? Start with the bottleneck."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceBottlenecks.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * (i + 1)}>
                <AnimatedGlassCard
                  stretch
                  rounded="rounded-[2rem]"
                  bodyClassName="bg-black/40 p-7"
                >
                  <h3 className="relative z-[1] font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-100">
                    {item.title}
                  </h3>
                  <p className="relative z-[1] mt-4 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
                    {item.description}
                  </p>
                </AnimatedGlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AuditForm bordered />

      <CtaBanner title="Build a custom creative production sprint with us." />
    </>
  );
}

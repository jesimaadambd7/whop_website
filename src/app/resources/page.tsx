import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ResourceVaultCard } from "@/components/resources/ResourceVaultCard";
import { FeaturedGuideCard } from "@/components/resources/FeaturedGuideCard";
import { IntentPageCard } from "@/components/resources/IntentPageCard";
import { ResourcesAuditCta } from "@/components/resources/ResourcesAuditCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { featuredGuides, intentPages } from "@/lib/data/resources";
import { loadPublishedVaultResources } from "@/lib/data/load-resources";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources — UGC Ads, Video Production & Creative Testing Guides",
  description:
    "Practical UGCViss resources on UGC ads, ecommerce video production, paid social creative testing, product shoots, editing systems, and performance creative workflows.",
  path: "/resources",
  keywords: [
    "UGC ads guides",
    "video creative resources",
    "paid social testing frameworks",
    "ecommerce video production tips",
  ],
});

export default async function ResourcesPage() {
  const vaultResources = await loadPublishedVaultResources();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides for better ecommerce video creative."
        description="Practical notes on UGC ads, product video shoots, paid social creative testing, video editing, and building a repeatable shoot-to-sales creative system."
      />

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Locked resource vault
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Prompt packs, research, AI UGC workflows, tutorials, and production resources.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Built for editors, creative strategists, designers, AI video operators, and creators
              who want UGCViss&apos;s internal systems, prompts, and production thinking.
            </p>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-6 lg:grid-cols-2">
            {vaultResources.map((resource) => (
              <ResourceVaultCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Featured guides
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Start with the creative bottleneck you are solving.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              These resources are written for ecommerce, DTC, and agency teams that need more useful
              ad creative, not just prettier assets.
            </p>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-6 lg:grid-cols-2">
            {featuredGuides.map((guide) => (
              <FeaturedGuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              High-intent pages
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Explore service guides by search intent.
            </h2>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {intentPages.map((page) => (
              <IntentPageCard key={page.href} page={page} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <ResourcesAuditCta />
        </Container>
      </SectionShell>
    </>
  );
}

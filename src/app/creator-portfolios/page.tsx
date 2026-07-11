import type { Metadata } from "next";
import Link from "next/link";
import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorBenefitCard } from "@/components/creators/CreatorBenefitCard";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { loadCreatorPricing } from "@/lib/data/creator-pricing";
import {
  creatorBenefits,
  creatorRoles,
  creatorSteps,
  creatorComparisonRows,
  creatorTerms,
  creatorFaqs,
} from "@/lib/data/creator-portfolios";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creator Portfolio Hosting - VidCarry",
  description:
    "Build a premium creator portfolio with mixed-media hosting, directory discovery, analytics, inquiries, and lifetime VidCarry resource access for one payment.",
};

export default async function CreatorPortfoliosPage() {
  const pricing = await loadCreatorPricing();
  const comparisonRows = creatorComparisonRows.map((row) =>
    row.label === "Cost model"
      ? { ...row, vidcarry: pricing.comparisonPriceLabel }
      : row,
  );

  return (
    <>
      <CreatorHero pricing={pricing} />

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Why VidCarry
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Portfolio infrastructure without becoming your own web team.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Built for working creatives who need a credible home for their work, not another
              complicated website project.
            </p>
          </Reveal>

          <div className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {creatorBenefits.map((benefit) => (
              <CreatorBenefitCard key={benefit.step} {...benefit} />
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              For the creative industry
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Not only for editors.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {creatorRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm font-bold text-zinc-300"
                >
                  {role}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              One clear price
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {pricing.headline}
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              The base package is sized for a strong professional portfolio. Unlimited embeds
              let you expand without consuming hosted storage.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto max-w-4xl">
            <article className="rounded-[2.5rem] border border-sky-400/30 bg-[radial-gradient(circle_at_10%_10%,rgba(0,168,255,0.2),transparent_35%),rgba(255,255,255,0.04)] p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                  Creator lifetime
                </p>
                {pricing.offerActive && (
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-200">
                    Offer active
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                {pricing.regularPriceLabel && (
                  <span className="pb-3 font-display text-3xl font-black tracking-[-0.06em] text-zinc-600 line-through">
                    {pricing.regularPriceLabel}
                  </span>
                )}
                <span className="font-display text-7xl font-black tracking-[-0.08em] text-white">
                  {pricing.publicPriceLabel}
                </span>
                <span className="pb-3 text-zinc-500">one time</span>
              </div>
              <ul className="mt-7 grid gap-3 text-sm leading-6 text-zinc-300">
                {pricing.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-sky-300">+</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/creator/signup"
                className="mt-8 inline-flex rounded-full bg-sky-400 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                {pricing.ctaLabel}
              </Link>
            </article>
          </Reveal>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              How it works
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              From account to reviewed portfolio in four steps.
            </h2>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-4">
            {creatorSteps.map((step) => (
              <Reveal key={step.step}>
                <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
                  <p className="font-black text-sky-300">{step.step}</p>
                  <h2 className="mt-4 font-display text-2xl font-black text-white">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              A cleaner tradeoff
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              A portfolio platform instead of another website project.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] border border-white/10">
            <div className="grid grid-cols-3 border-b border-white/10 bg-black/70 px-5 py-4 text-xs font-black uppercase tracking-[0.15em] text-zinc-500">
              <span>What matters</span>
              <span>DIY website</span>
              <span className="text-sky-300">VidCarry</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-4 border-b border-white/10 px-5 py-5 text-sm last:border-0"
              >
                <strong className="text-white">{row.label}</strong>
                <span className="text-zinc-500">{row.diy}</span>
                <span className="text-zinc-200">{row.vidcarry}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Important terms
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Professional freedom with clear safeguards.
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {creatorTerms.map((term) => (
              <Reveal key={term.title}>
                <article className="h-full rounded-[2rem] border border-white/10 bg-black/40 p-6">
                  <h2 className="font-display text-2xl font-black text-white">{term.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{term.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Creator portfolio FAQs
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Clear answers before you build.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion
              items={creatorFaqs.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              }))}
              defaultOpen={null}
            />
          </Reveal>
        </Container>
      </SectionShell>
    </>
  );
}

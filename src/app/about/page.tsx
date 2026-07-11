import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stats, talentPool } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About VidCarry - Creative Production & Paid Ads Team",
  description:
    "Learn how VidCarry combines strategy, production planning, UGC creative, video editing, motion design, and paid social execution for sales-focused brand growth.",
};

const missionParagraphs = [
  "Brands do not lose because they lack ideas. They lose because production, editing, and paid ads get slow, scattered, or disconnected from sales goals.",
  "VidCarry exists to carry that production and growth load. We help ecommerce brands, DTC teams, and partner agencies turn offers, footage, talent, and strategy into clean ads ready to launch.",
  "Our network includes remote creative specialists and vetted on-camera talent, giving campaigns the right mix of voice, trust, polish, and market fit without slowing the production cycle.",
  "We also use AI tools where they help with research, scripting, storyboard planning, and faster creative preparation.",
  "The result is a studio workflow that feels premium, direct, and practical: strong angles, clean production, crisp edits, motion polish, and campaigns your team can run toward sales.",
];

const networkCards = [
  {
    title: "Remote creative crew",
    description:
      "A distributed production workflow with remote editors, creative operators, strategists, and support talent across multiple countries.",
  },
  {
    title: "Actors and creators",
    description:
      "Access to on-camera talent for UGC ads, product demos, testimonials, lifestyle scenes, and social-first campaign content.",
  },
  {
    title: "Influencer and celebrity coordination",
    description:
      "For the right campaign, budget, and usage terms, we can coordinate influencer or celebrity-led creative that adds recognition and trust.",
  },
];

const differentiators = [
  {
    title: "Performance-first creative, not just pretty video",
    description:
      "We keep the workflow focused on clear messaging, fast delivery, shoot-ready production, and ads that can actually support growth campaigns.",
  },
  {
    title: "Global remote crew, creators, actors, and influencers under one workflow",
    description:
      "We keep the workflow focused on clear messaging, fast delivery, shoot-ready production, and ads that can actually support growth campaigns.",
  },
  {
    title: "Global production quality with performance fluency",
    description:
      "We keep the workflow focused on clear messaging, fast delivery, shoot-ready production, and ads that can actually support growth campaigns.",
  },
  {
    title: "Fast creative sprints built for testing and sales",
    description:
      "We keep the workflow focused on clear messaging, fast delivery, shoot-ready production, and ads that can actually support growth campaigns.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Map the sales angle",
    description:
      "We unpack your offer, audience, objections, product proof, and ad goals before a single shoot or edit starts.",
  },
  {
    num: "02",
    title: "Shoot and build the batch",
    description:
      "Our team turns the strategy into model casting, creator briefs, shoot plans, edits, motion systems, and ad variants.",
  },
  {
    num: "03",
    title: "Launch, optimize, scale",
    description:
      "You get assets ready for launch, plus paid ads support to test, learn, and improve the next sales-focused sprint.",
  },
];

function SectionIntro({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About VidCarry"
        title="A modern production and growth studio built for creative velocity."
        description="VidCarry helps brands build a faster, cleaner creative engine for performance video, from strategy and production planning to editing, motion, and campaign-ready delivery."
      />

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="premium-panel glow-card rounded-[2.5rem] border border-sky-400/25 bg-sky-400 p-8 text-black sm:p-10">
                <p className="text-xs font-black uppercase tracking-[0.3em]">Our mission</p>
                <h2 className="mt-5 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  Make premium video creative easier to shoot, launch, test, and scale.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="premium-panel space-y-6 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-7 text-lg leading-9 text-zinc-300 sm:p-9">
                {missionParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Global network"
            title="A distributed creative system with talent access beyond one market."
          />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="premium-panel glow-card rounded-[2rem] border border-white/10 bg-black/45 p-7">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
                  Talent access
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {talentPool.map((talent) => (
                    <span
                      key={talent}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-zinc-300"
                    >
                      {talent}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {networkCards.map((card, i) => (
                <Reveal key={card.title} delay={0.05 * (i + 1)}>
                  <AnimatedGlassCard
                    stretch
                    rounded="rounded-[2rem]"
                    bodyClassName="bg-white/[0.035] p-6"
                  >
                    <h3 className="relative z-[1] font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-100">
                      {card.title}
                    </h3>
                    <p className="relative z-[1] mt-4 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
                      {card.description}
                    </p>
                  </AnimatedGlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Positioning"
            title="Global production quality with performance fluency."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.05 * (i + 1)}>
                <AnimatedGlassCard
                  stretch
                  rounded="rounded-[2rem]"
                  bodyClassName="bg-black/40 p-7"
                >
                  <p className="relative z-[1] font-display text-5xl font-black tracking-[-0.06em] text-sky-400">
                    {stat.value}
                  </p>
                  <p className="relative z-[1] mt-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {stat.label}
                  </p>
                </AnimatedGlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="What makes us different"
            title="A creative partner designed around business outcomes."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * (i + 1)}>
                <AnimatedGlassCard
                  stretch
                  rounded="rounded-[2rem]"
                  bodyClassName="bg-white/[0.035] p-7"
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

      <section className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="How we work"
            title="Clear process, clean handoff, no creative fog."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={0.05 * (i + 1)}>
                <AnimatedGlassCard
                  stretch
                  rounded="rounded-[2rem]"
                  bodyClassName="bg-black/40 p-7"
                >
                  <p className="relative z-[1] text-xs font-black uppercase tracking-[0.24em] text-sky-400">
                    {step.num}
                  </p>
                  <h3 className="relative z-[1] mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-100">
                    {step.title}
                  </h3>
                  <p className="relative z-[1] mt-4 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
                    {step.description}
                  </p>
                </AnimatedGlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner title="Want VidCarry behind your next shoot-to-sales sprint?" />
    </>
  );
}

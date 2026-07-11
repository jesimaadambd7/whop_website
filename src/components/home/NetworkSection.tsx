import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { stats, talentPool } from "@/lib/data/site";

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

export function NetworkSection() {
  return (
    <SectionShell withGrid>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Global creative network
            </p>
            <h2 className="mt-5 font-display text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl">
              A distributed creative network for stronger campaign execution.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              VidCarry is not limited to one local production setup. We coordinate remote
              creative specialists and on-camera talent across markets, so brands can build
              ads with the right voice, pace, edit, and commercial context.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold tracking-tight text-white transition duration-300 hover:border-sky-400/80 hover:bg-sky-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
              >
                Explore Services
              </Link>
              <Link
                href="/contact#book-call"
                className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-5 py-3 text-sm font-bold tracking-tight text-black shadow-[0_0_32px_rgba(0,168,255,0.28)] transition duration-300 hover:border-white hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
              >
                Plan Talent Production
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="grid gap-5">
            <div className="premium-panel glow-card overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/55 p-5 sm:p-6">
              <div className="grid gap-3 md:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-sky-400/20 bg-sky-400/10 p-5"
                  >
                    <p className="font-display text-4xl font-black tracking-[-0.06em] text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-sky-100">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
                  Talent pool includes
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {talentPool.map((talent) => (
                    <span
                      key={talent}
                      className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-bold text-zinc-300"
                    >
                      {talent}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {networkCards.map((card) => (
                <AnimatedGlassCard
                  key={card.title}
                  stretch
                  rounded="rounded-[1.75rem]"
                  bodyClassName="p-5"
                >
                  <h3 className="relative z-[1] font-display text-xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-100">
                    {card.title}
                  </h3>
                  <p className="relative z-[1] mt-3 text-sm leading-6 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
                    {card.description}
                  </p>
                </AnimatedGlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

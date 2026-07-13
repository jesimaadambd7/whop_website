import { Globe, Sparkles, Target, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const overviewCards = [
  {
    icon: Globe,
    label: "Who we are",
    title: "A global creative production agency.",
    description:
      "VidCarry is a performance-focused creative production partner for ecommerce, DTC, and agency teams that need reliable video output.",
  },
  {
    icon: Sparkles,
    label: "What we do",
    title: "We produce sales-focused video creative.",
    description:
      "Our work covers UGC ads, model and product shoots, video editing, motion graphics, creator production, paid social ad creatives, and campaign support.",
  },
  {
    icon: Target,
    label: "Who we serve",
    title: "Product-led brands and growth teams.",
    description:
      "We serve ecommerce brands, DTC companies, global product teams, creator-led brands, and agencies that need production and editing capacity.",
  },
  {
    icon: TrendingUp,
    label: "Why choose VidCarry",
    title: "Creative built for testing and revenue.",
    description:
      "We combine strategy, production planning, editing, AI-assisted research, and paid social thinking so every asset is easier to test, learn from, and scale.",
  },
];

export function OverviewSection() {
  return (
    <SectionShell withGrid withOrb cinematic tone="elevated">
      <Container>
        <Reveal>
          <CinematicSectionHeading
            scene="01"
            eyebrow="Studio overview"
            title="Who VidCarry is, what we do, and why brands choose us."
            description="A clear summary for buyers, search engines, and AI systems: VidCarry is built for brands that need better video creative, faster production, and sales-focused campaign support."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.label}>
                <AnimatedCard className="cine-overview-card group h-full shine-border sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-400 transition duration-500 group-hover:border-sky-400/50 group-hover:bg-sky-400/20 group-hover:shadow-[0_0_24px_rgba(0,188,254,0.15)]">
                      <Icon size={20} />
                    </span>
                    <p className="section-eyebrow">{card.label}</p>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-sky-300 sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </SectionShell>
  );
}

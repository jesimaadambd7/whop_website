import { ArrowRight, Clapperboard, Film } from "lucide-react";
import { TypingHeadline } from "@/components/ui/TypingHeadline";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { HeroStatCard } from "@/components/home/HeroStatCard";
import { ShowreelCommandCenter } from "@/components/home/ShowreelCommandCenter";
import { CinematicHeroBackground } from "@/components/effects/cinematic/CinematicHeroBackground";
import { VideoTimelineStrip } from "@/components/effects/cinematic/VideoTimelineStrip";
import { ViewfinderFrame } from "@/components/effects/cinematic/ViewfinderFrame";
import { CinematicHeadlineShine } from "@/components/effects/cinematic/CinematicHeadlineShine";
import { stats } from "@/lib/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <CinematicHeroBackground />

      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_18%_15%,rgba(0,168,255,0.1),transparent_24%),radial-gradient(circle_at_78%_8%,rgba(255,210,54,0.06),transparent_20%)]" />

      <Container className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <FadeIn>
            <VideoTimelineStrip className="mb-6 max-w-xl" />
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className="cine-badge mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-sky-400 shadow-[0_0_40px_rgba(0,168,255,0.08)] backdrop-blur-md">
              <Film size={14} className="text-sky-400" />
              Performance video creative studio
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1
              className="max-w-5xl font-display text-6xl font-black leading-[0.9] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl"
              aria-label="We Create Ads That Drive Sales."
            >
              <CinematicHeadlineShine>
                <TypingHeadline text="We Create Ads That Drive Sales." />
              </CinematicHeadlineShine>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                <Clapperboard size={12} className="text-amber-300/80" />
                Creative direction · Edit · Motion · Paid social
              </span>
              UGCViss helps ecommerce and DTC brands turn product stories into
              conversion-focused video campaigns, from creative strategy and
              production to editing, motion, and paid social execution. We use
              AI-assisted research and scripting where it improves speed, clarity,
              and creative quality.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact#book-call" size="lg" className="cine-cta-glow">
                Book a Call
                <ArrowRight size={18} />
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">
                View Portfolio
              </Button>
            </div>
          </FadeIn>

          <Stagger
            className="mt-10 grid max-w-xl grid-cols-3 items-stretch gap-3"
            stagger={0.1}
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="h-full">
                <HeroStatCard value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn delay={0.2} className="relative min-w-0 lg:pt-2">
          <ViewfinderFrame>
            <ShowreelCommandCenter />
          </ViewfinderFrame>
        </FadeIn>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const processSteps = [
  {
    num: "01",
    title: "Creative brief",
    description:
      "We turn product, audience, offer, objections, and ad data into a clear creative direction before production starts.",
  },
  {
    num: "02",
    title: "Talent and shoot prep",
    description:
      "Models, creators, actors, influencers, props, shot lists, and product demo beats are planned around the ad structure.",
  },
  {
    num: "03",
    title: "Edit and motion system",
    description:
      "Raw footage becomes 9:16 ads with hook pacing, captions, product proof, motion callouts, and CTA variants.",
  },
  {
    num: "04",
    title: "Launch feedback loop",
    description:
      "The next creative batch is shaped by what buyers respond to, not by guesswork alone.",
  },
];

function StepBadge({ num }: { num: string }) {
  return (
    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sky-400/35 bg-[#030308] font-mono text-sm font-bold text-sky-300 shadow-[0_0_20px_rgba(0,188,254,0.12)] transition duration-500 group-hover:border-sky-400/55 group-hover:shadow-[0_0_24px_rgba(0,188,254,0.22)]">
      {num}
    </span>
  );
}

function StepCard({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <div className="cine-process-step group min-w-0 flex-1 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition duration-500 group-hover:border-sky-400/30 group-hover:bg-sky-400/[0.04] group-hover:shadow-[0_8px_40px_rgba(0,188,254,0.08)] sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
        Stage {step.num}
      </p>
      <h3 className="mt-2 font-display text-xl font-bold text-white transition-colors group-hover:text-sky-200">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{step.description}</p>
    </div>
  );
}

export function ProcessSection() {
  return (
    <SectionShell withGrid cinematic tone="deep">
      <Container>
        <Reveal>
          <CinematicSectionHeading
            eyebrow="Production process"
            title="From brief to launch-ready ads in four clear stages."
            description="Every sprint follows a structured workflow so your team always knows what is happening, what is next, and when assets are ready to test."
          />
        </Reveal>

        {/* Mobile + tablet: vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div
            className="pointer-events-none absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-sky-400/60 via-sky-400/30 to-sky-400/15"
            aria-hidden="true"
          />

          <Stagger className="relative flex flex-col gap-5" stagger={0.12}>
            {processSteps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="group flex gap-4 sm:gap-5">
                  <StepBadge num={step.num} />
                  <StepCard step={step} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-12 hidden lg:block">
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-6 h-px bg-gradient-to-r from-sky-400/20 via-sky-400/55 to-sky-400/20"
            aria-hidden="true"
          />

          <Stagger className="relative grid grid-cols-4 gap-4" stagger={0.12}>
            {processSteps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="group flex flex-col items-center gap-5">
                  <StepBadge num={step.num} />
                  <StepCard step={step} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </SectionShell>
  );
}

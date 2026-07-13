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

export function ProcessSection() {
  return (
    <SectionShell withGrid cinematic tone="deep">
      <Container>
        <Reveal>
          <CinematicSectionHeading
            scene="05"
            eyebrow="Production process"
            title="From brief to launch-ready ads in four clear stages."
            description="Every sprint follows a structured workflow so your team always knows what is happening, what is next, and when assets are ready to test."
          />
        </Reveal>

        <div className="relative mt-12">
          <div className="cine-process-line pointer-events-none absolute bottom-4 left-[1.65rem] top-4 hidden w-px sm:block" aria-hidden="true" />

          <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.12}>
            {processSteps.map((step, index) => (
              <StaggerItem key={step.num}>
                <div className="cine-process-step group relative flex gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:border-sky-400/30 hover:bg-sky-400/[0.04] hover:shadow-[0_8px_40px_rgba(0,188,254,0.08)] sm:p-7">
                  <div className="relative z-[1] flex flex-col items-center gap-2">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sky-400/30 bg-sky-400/10 font-mono text-sm font-bold text-sky-300 transition duration-500 group-hover:border-sky-400/50 group-hover:shadow-[0_0_20px_rgba(0,188,254,0.2)]">
                      {step.num}
                    </span>
                    {index < processSteps.length - 1 && (
                      <span className="hidden text-[9px] font-mono uppercase tracking-widest text-zinc-700 sm:block">
                        next
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                      Stage {step.num}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white transition-colors group-hover:text-sky-200 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </SectionShell>
  );
}

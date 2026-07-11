import { CalendlyBookingPanel } from "@/components/contact/CalendlyBookingPanel";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { callNextSteps } from "@/lib/data/contact";

export function ContactScheduleSection() {
  return (
    <SectionShell id="schedule-call">
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Book a call
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Pick a time after sending the brief.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            Use the live calendar to schedule a focused creative call about your product,
            audience, current bottleneck, and next shoot-to-sales sprint.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="premium-panel glow-card rounded-[2rem] border border-sky-400/25 bg-sky-400 p-6 text-black sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.3em]">What happens next</p>
              <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                A quick call to map the best creative sprint.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-black/70">
                We use the call to understand the product, sales goal, timeline, creative
                bottleneck, and the best mix of production, editing, talent, motion, and paid
                social support.
              </p>
              <div className="mt-5 space-y-3 rounded-[1.5rem] border border-black/10 bg-black/10 p-4">
                {callNextSteps.map((step) => (
                  <div key={step} className="flex gap-3 text-sm font-bold leading-6">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <AnimatedGlassCard
            variant="panel"
            rounded="rounded-[2rem]"
            className="w-full"
            bodyClassName="contact-calendly-panel__body p-2 sm:p-3"
          >
            <CalendlyBookingPanel />
          </AnimatedGlassCard>
        </div>
      </Container>
    </SectionShell>
  );
}

import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

export function ContactInquirySection() {
  return (
    <SectionShell id="book-call" bordered>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
            Project brief
          </p>
          <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Start with the details.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            Send your service needs, budget range, timeline, and product context. This keeps
            the first call focused and helps us recommend the right next step faster.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <AnimatedGlassCard
              variant="panel"
              rounded="rounded-[2.5rem]"
              className="w-full"
              bodyClassName="contact-inquiry-sidebar__body p-8 sm:p-10"
            >
              <p className="relative z-[1] text-xs font-black uppercase tracking-[0.3em] text-sky-400">
                Inquiry details
              </p>
              <h2 className="relative z-[1] mt-5 font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                Tell us what you want to launch, test, or scale.
              </h2>
              <p className="relative z-[1] mt-5 text-base leading-8 text-zinc-400">
                The more we know about your product, audience, creative bottleneck, and launch
                target, the faster we can shape the right workflow.
              </p>
              <div className="relative z-[1] mt-6 grid gap-3 rounded-[1.5rem] border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-7 text-sky-50">
                <p>
                  Use this form for creative production, editing, paid ad creative, UGC systems,
                  creator sourcing, and campaign support.
                </p>
                <p>
                  After reviewing your brief, we can reply by email or continue into a booked
                  call with a clearer plan.
                </p>
              </div>
            </AnimatedGlassCard>
          </aside>

          <Reveal delay={0.1}>
            <ContactInquiryForm />
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

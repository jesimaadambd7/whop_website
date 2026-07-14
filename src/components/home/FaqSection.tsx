import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CinematicSectionHeading } from "@/components/effects/cinematic/CinematicSectionHeading";
import { FaqAccordionList } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { homeFaqs } from "@/lib/data/faqs";

export function FaqSection() {
  return (
    <SectionShell withGrid cinematic tone="deep">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <CinematicSectionHeading
              eyebrow="FAQs"
              title="Questions before we build your next ad sprint?"
              description="Quick answers about pricing, shoots, paid ads, account access, and whether UGCViss is the right fit for your brand."
              size="large"
            />

            <div className="cine-faq-cta mt-8 max-w-xl overflow-hidden rounded-[2rem] border border-sky-400/25 bg-sky-400 p-6 text-black shadow-[0_0_48px_rgba(0,188,254,0.15)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/60">
                Best next step
              </p>
              <p className="mt-3 font-display text-2xl font-black tracking-[-0.04em]">
                Bring your product, offer, and current creative bottleneck.
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-black/70">
                We will help decide if you need a shoot, UGC batch, editing sprint, paid
                ads support, or a full creative system.
              </p>
              <div className="mt-5">
                <Link
                  href="/contact#book-call"
                  className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold tracking-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition duration-300 hover:border-zinc-900 hover:bg-zinc-900 sm:px-6"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <FaqAccordionList items={homeFaqs} />

            <div className="pt-6">
              <Link
                href="/faqs"
                className="glass-hover-btn inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold tracking-tight text-white transition duration-300 hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-6"
              >
                Read All FAQs
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

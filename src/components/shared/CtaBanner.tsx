import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function CtaBanner({
  eyebrow = "Start a shoot-to-sales sprint",
  title,
  description = "Tell us what you are launching, scaling, or fixing. We will help shape the shoot, creative, and paid ads sprint around your goals.",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-0 sm:pb-12">
      <Container>
        <Reveal>
          <div className="premium-panel glow-card relative overflow-hidden rounded-[2rem] border border-sky-400/25 bg-sky-400 px-6 pb-6 pt-4 text-black shadow-[0_0_70px_rgba(0,168,255,0.18)] sm:px-8 sm:pb-8 sm:pt-5 lg:px-10 lg:pb-9 lg:pt-6">
            <div
              aria-hidden
              className="aurora-orb absolute right-4 top-3 h-36 w-36 rounded-full bg-white/25 blur-2xl sm:h-44 sm:w-44"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.42),transparent_24%),linear-gradient(135deg,transparent,rgba(0,0,0,0.12))] lg:block"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.34em]">{eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                {title}
              </h2>
              {description && (
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/70 sm:text-base">
                  {description}
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#book-call"
                  className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold tracking-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition duration-300 hover:border-zinc-900 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
                >
                  Book a Call
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-bold tracking-tight text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition duration-300 hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,168,255,0.2),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="aurora-orb absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative">
        <Reveal
          className={
            align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"
          }
        >
          {eyebrow && (
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

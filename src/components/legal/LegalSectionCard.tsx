import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { LegalSection } from "@/lib/data/legal-page";

type LegalSectionCardProps = {
  section: LegalSection;
};

export function LegalSectionCard({ section }: LegalSectionCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      className="w-full scroll-mt-28"
      bodyClassName="legal-section-card__body p-6 sm:p-8"
    >
      <section id={section.id} aria-labelledby={`${section.id}-title`}>
        <p className="relative z-[1] text-xs font-black uppercase tracking-[0.24em] text-sky-400">
          {section.number}
        </p>
        <h2
          id={`${section.id}-title`}
          className="relative z-[1] mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white"
        >
          {section.title}
        </h2>
        <div className="relative z-[1] mt-5 space-y-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </AnimatedGlassCard>
  );
}

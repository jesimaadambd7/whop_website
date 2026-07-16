import { Info } from "lucide-react";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { LegalSection } from "@/lib/data/legal-page";

type LegalSectionCardProps = {
  section: LegalSection;
};

/** Renders plain legal text with optional **bold** markers. */
function LegalText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={`${part}-${index}`} className="font-semibold text-zinc-200">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

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
            <p key={paragraph}>
              <LegalText text={paragraph} />
            </p>
          ))}
        </div>

        {section.callout && (
          <div className="relative z-[1] mt-6 rounded-2xl border border-amber-400/25 bg-amber-400/[0.08] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-400 text-black">
                <Info size={14} strokeWidth={2.5} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-black tracking-[-0.02em] text-amber-200 sm:text-base">
                  {section.callout.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-300 sm:text-[15px] sm:leading-8">
                  <LegalText text={section.callout.body} />
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </AnimatedGlassCard>
  );
}

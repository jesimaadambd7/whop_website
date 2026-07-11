import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { LegalSection } from "@/lib/data/legal-page";

type LegalSidebarProps = {
  lastUpdated: string;
  sections: LegalSection[];
  ariaLabel: string;
};

export function LegalSidebar({ lastUpdated, sections, ariaLabel }: LegalSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <AnimatedGlassCard
        variant="panel"
        rounded="rounded-[2rem]"
        className="w-full"
        bodyClassName="legal-sidebar__body p-6"
      >
        <p className="relative z-[1] text-xs font-black uppercase tracking-[0.3em] text-sky-400">
          Last updated
        </p>
        <p className="relative z-[1] mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white">
          {lastUpdated}
        </p>
        <p className="relative z-[1] mt-5 text-sm leading-7 text-zinc-400">
          This page is provided for transparency and should be reviewed by qualified legal counsel
          for your specific business needs.
        </p>

        <nav className="relative z-[1] mt-7 grid gap-2" aria-label={ariaLabel}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-zinc-300 transition hover:border-sky-400/45 hover:bg-sky-400/10 hover:text-white"
            >
              {section.navLabel}
            </a>
          ))}
        </nav>
      </AnimatedGlassCard>
    </aside>
  );
}

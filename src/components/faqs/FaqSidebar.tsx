import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Button } from "@/components/ui/Button";
import type { FaqCategory } from "@/lib/data/faqs";

type FaqSidebarProps = {
  categories: FaqCategory[];
};

export function FaqSidebar({ categories }: FaqSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <AnimatedGlassCard
        variant="panel"
        rounded="rounded-[2rem]"
        className="w-full"
        bodyClassName="faq-sidebar__body p-6"
      >
        <p className="relative z-[1] text-xs font-black uppercase tracking-[0.3em] text-sky-400">
          FAQ categories
        </p>
        <h2 className="relative z-[1] mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white">
          Find the answer faster.
        </h2>

        <nav className="relative z-[1] mt-6 grid gap-2" aria-label="FAQ categories">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-zinc-300 transition hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-white"
            >
              <span>{category.title}</span>
              <span className="rounded-full bg-sky-400/10 px-2.5 py-1 text-xs text-sky-300">
                {category.items.length}
              </span>
            </a>
          ))}
        </nav>

        <div className="relative z-[1] mt-7 rounded-[1.5rem] border border-sky-400/20 bg-sky-400/10 p-5">
          <p className="text-sm font-bold leading-6 text-sky-100">
            Still not sure what you need? Bring the product, offer, and current creative problem to a
            call.
          </p>
          <div className="mt-5">
            <Button href="/contact#book-call" size="sm">
              Book a Call
            </Button>
          </div>
        </div>
      </AnimatedGlassCard>
    </aside>
  );
}

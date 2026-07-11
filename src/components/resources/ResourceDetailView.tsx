import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResourceUnlockForm } from "@/components/resources/ResourceUnlockForm";
import type { VaultResource } from "@/lib/data/resources";

type ResourceDetailViewProps = {
  resource: VaultResource;
};

function AudienceTags({ audiences }: { audiences: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {audiences.map((audience) => (
        <span
          key={audience}
          className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-bold text-zinc-300"
        >
          {audience}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-zinc-300"
        >
          <span className="mr-3 text-sky-300">+</span>
          {item}
        </div>
      ))}
    </div>
  );
}

function PurchasePanel({ resource }: { resource: VaultResource }) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="premium-panel glow-card rounded-[2rem] border border-sky-400/25 bg-white/[0.045] p-5 shadow-2xl shadow-sky-950/30 sm:p-6">
        <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,255,0.28),transparent_34%),linear-gradient(135deg,#020617,#082f49_52%,#111827)]">
          <Image
            src={resource.thumbnail}
            alt={resource.thumbnailAlt}
            width={640}
            height={360}
            unoptimized
            className="aspect-video w-full object-cover"
          />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Instant access</p>
        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Price</p>
          <p className="mt-2 font-display text-5xl font-black tracking-[-0.07em] text-white">
            {resource.price}
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            One-time digital resource purchase. Log in later with the same checkout email to reopen
            downloads and receipt history.
          </p>
        </div>
        <ResourceUnlockForm slug={resource.slug} price={resource.price} className="mt-5" />
        <div className="mt-6 grid gap-3 text-sm leading-6 text-zinc-400">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
            <strong className="text-white">Format:</strong> {resource.formatLabel}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
            <strong className="text-white">Category:</strong> {resource.categoryLabel}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function ResourceDetailView({ resource }: ResourceDetailViewProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-24 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,168,255,0.22),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(56,189,248,0.12),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <Container className="relative px-0">
          <Link
            href="/resources"
            className="text-xs font-black uppercase tracking-[0.24em] text-sky-300 hover:text-white"
          >
            Back to resources
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-sky-100">
                  {resource.categoryLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-300">
                  {resource.formatLabel}
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-black tracking-[-0.08em] text-white sm:text-7xl">
                {resource.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-zinc-300">
                {resource.heroDescription}
              </p>
              <div className="mt-7">
                <AudienceTags audiences={resource.audiences} />
              </div>
            </div>
            <PurchasePanel resource={resource} />
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-b border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="premium-panel rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">
                  Why purchase this
                </p>
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-100">
                  {resource.price}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white">
                Built to save creative time and improve output quality.
              </h2>
              <p className="mt-5 text-base leading-8 text-zinc-400">{resource.whyPurchase}</p>
            </div>
            <div className="grid gap-5">
              <div className="premium-panel rounded-[2rem] border border-white/10 bg-black/45 p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Best for</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {resource.audiences.map((audience) => (
                    <span
                      key={audience}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-zinc-300"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-sky-400/25 bg-sky-400/10 p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-200">
                  Social post angle
                </p>
                <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white">
                  Ready to promote from day one.
                </h2>
                <p className="mt-4 text-sm font-bold leading-7 text-sky-50">
                  {resource.socialPostAngle}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <div className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Inside the resource
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Everything is written for execution, not decoration.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Use the detail sections below as the public landing page copy when sharing this product
              from social media, ads, or direct messages.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="premium-panel rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Benefits</p>
              <div className="mt-6">
                <BulletList items={resource.benefits} />
              </div>
            </div>
            <div className="premium-panel rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">
                What you get
              </p>
              <div className="mt-6">
                <BulletList items={resource.whatYouGet} />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/45 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-300">Preview</p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-300">{resource.preview}</p>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <div className="premium-panel glow-card rounded-[2.5rem] border border-sky-400/25 bg-sky-400 p-7 text-black sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em]">Ready to unlock it?</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Turn this into your next faster, cleaner creative workflow.
            </h2>
            <div className="mt-7">
              <ResourceUnlockForm slug={resource.slug} price={resource.price} variant="cta" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Package } from "@/lib/data/packages";

type PackageDetailViewProps = {
  pkg: Package;
};

const workspaceNote =
  "After payment, your private workspace opens for the full brief, secure cloud upload, project messages, status updates, revisions, delivery, and receipts. We contact you immediately to confirm the workflow before kickoff.";

function checkoutHref(pkg: Package) {
  return pkg.variantId
    ? `/checkout/${pkg.slug}?variant=${pkg.variantId}`
    : `/checkout/${pkg.slug}`;
}

function BulletCards({ items }: { items: string[] }) {
  return (
    <div className="mt-6 grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-2xl border border-white/10 bg-black/35 p-4"
        >
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
          <p className="text-sm font-bold leading-6 text-zinc-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

function PurchasePanel({ pkg }: { pkg: Package }) {
  const deliveryDays = pkg.delivery.replace(" business days", "");

  return (
    <div className="premium-panel glow-card overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.035] p-4">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pkg.thumbnail}
          alt={`${pkg.title} thumbnail`}
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
      <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-black/60 p-6">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-300">
          Exact package price
        </p>
        <div className="mt-3 flex items-end gap-3">
          <p className="font-display text-5xl font-black tracking-[-0.08em] text-white">
            {pkg.price}
          </p>
          {pkg.originalPrice ? (
            <p className="pb-1 text-lg font-bold text-white/50 line-through">
              {pkg.originalPrice}
            </p>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-bold text-zinc-300">{pkg.priceNote}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase text-zinc-500">Delivery</p>
            <p className="mt-2 font-black text-white">{deliveryDays} business days</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase text-zinc-500">Revisions</p>
            <p className="mt-2 font-black text-white">{pkg.revisionsLabel}</p>
          </div>
        </div>
        <Link
          href={checkoutHref(pkg)}
          className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-sky-300"
        >
          Purchase Package
        </Link>
      </div>
    </div>
  );
}

export function PackageDetailView({ pkg }: PackageDetailViewProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,168,255,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.08),transparent_24%)]" />
        <Container className="relative px-5 sm:px-8 lg:px-10">
          <Link
            href="/#packages"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-white/20 hover:text-white"
          >
            Back to packages
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
                {pkg.badge}
              </p>
              <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-[-0.07em] text-white sm:text-7xl">
                {pkg.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                {pkg.heroDescription}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500">{workspaceNote}</p>
            </div>
            <PurchasePanel pkg={pkg} />
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="premium-panel glow-card rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <h2 className="font-display text-3xl font-black tracking-[-0.05em] text-white">
                What is included
              </h2>
              <BulletCards items={pkg.included} />
            </div>
            <div className="premium-panel glow-card rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <h2 className="font-display text-3xl font-black tracking-[-0.05em] text-white">
                Main benefits
              </h2>
              <BulletCards items={pkg.benefits} />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="motion-reveal mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Workflow
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              A clear route from payment to delivery.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {pkg.workflowSteps.map((step, index) => (
              <article
                key={step}
                className="rounded-[1.75rem] border border-white/10 bg-black/40 p-6"
              >
                <p className="text-sm font-black text-sky-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm font-bold leading-7 text-zinc-300">{step}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden pb-10 pt-0 sm:pb-12">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="premium-panel glow-card motion-reveal relative overflow-hidden rounded-[2rem] border border-sky-400/25 bg-sky-400 px-6 pb-6 pt-4 text-black shadow-[0_0_70px_rgba(0,168,255,0.18)] sm:px-8 sm:pb-8 sm:pt-5 lg:px-10 lg:pb-9 lg:pt-6">
            <div className="aurora-orb absolute right-4 top-3 h-36 w-36 rounded-full bg-white/25 blur-2xl sm:h-44 sm:w-44" />
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.42),transparent_24%),linear-gradient(135deg,transparent,rgba(0,0,0,0.12))] lg:block" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.34em]">
                Start a shoot-to-sales sprint
              </p>
              <h2 className="mt-3 font-display text-3xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                Ready to start {pkg.title}?
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-black/70 sm:text-base">
                Purchase securely now, then complete your full brief and upload footage inside your
                private client workspace.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={checkoutHref(pkg)}
                  className="inline-flex items-center justify-center rounded-full border border-black bg-black px-5 py-3 text-sm font-bold tracking-tight text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)] transition duration-300 hover:border-zinc-900 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
                >
                  Purchase Package
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-bold tracking-tight text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition duration-300 hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

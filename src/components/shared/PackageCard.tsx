"use client";

import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { HoverVideoPreview } from "@/components/effects/cinematic/HoverVideoPreview";
import { getPackagePreviewVideo } from "@/lib/data/package-previews";
import type { Package } from "@/lib/data/packages";

type PackageCardProps = {
  pkg: Package;
  eager?: boolean;
};

export function PackageCard({ pkg, eager = false }: PackageCardProps) {
  const checkoutHref = pkg.variantId
    ? `/checkout/${pkg.slug}?variant=${pkg.variantId}`
    : `/checkout/${pkg.slug}`;
  const preview = getPackagePreviewVideo(pkg.slug);

  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2rem]"
      className="h-full"
      bodyClassName="flex h-full flex-col p-4 sm:p-5"
    >
      <Link
        href={pkg.href}
        className="group/thumb relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.34)]"
      >
        <HoverVideoPreview
          alt={`${pkg.title} thumbnail`}
          fallbackSrc={pkg.thumbnail}
          posterSrc={preview?.posterSrc}
          videoSrc={preview?.videoSrc}
          eager={eager}
          className="aspect-[4/5] w-full"
          imageClassName="transition duration-700 group-hover/thumb:scale-[1.035]"
        >
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
              {pkg.thumbnailLabel}
            </span>
          </div>
        </HoverVideoPreview>
      </Link>

      <div className="relative z-[1] flex flex-1 flex-col p-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-400">
            {pkg.badge}
          </p>
          <span className="shrink-0 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-black text-sky-100">
            {pkg.price}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-50">
          {pkg.title}
        </h3>
        <p className="mt-3 text-sm font-bold leading-6 text-zinc-300">{pkg.description}</p>

        <p className="mt-4 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-xs font-black uppercase tracking-[0.13em] text-sky-200">
          {pkg.delivery} / {pkg.revisions}
        </p>

        <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-400">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-3 pt-6">
          <Link
            href={pkg.href}
            className="glass-hover-btn inline-flex justify-center rounded-full border border-white/15 px-4 py-3 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300"
          >
            View Details
          </Link>
          <Link
            href={checkoutHref}
            className="inline-flex justify-center rounded-full bg-sky-400 px-4 py-3 text-sm font-black text-black transition hover:bg-white"
          >
            Purchase Package
          </Link>
        </div>
      </div>
    </AnimatedGlassCard>
  );
}

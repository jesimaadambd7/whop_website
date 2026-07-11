"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { VaultResource } from "@/lib/data/resources";

const thumbFrameClass =
  "mb-6 block overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,255,0.28),transparent_32%),linear-gradient(135deg,#020617,#082f49_52%,#111827)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

type ResourceVaultCardProps = {
  resource: VaultResource;
};

export function ResourceVaultCard({ resource }: ResourceVaultCardProps) {
  const detailHref = `/resources/${resource.slug}`;

  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2.25rem]"
      stretch
      className="h-full w-full"
      bodyClassName="resource-vault-card__body flex h-full flex-col p-6 sm:p-8"
    >
      <article id={resource.slug} className="relative z-[1] flex h-full flex-col">
        <Link href={detailHref} className={thumbFrameClass}>
          <Image
            src={resource.thumbnail}
            alt={resource.thumbnailAlt}
            width={640}
            height={360}
            unoptimized
            className="aspect-video w-full object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-400">
              {resource.categoryLabel} / {resource.formatLabel}
            </p>
            <Link
              href={detailHref}
              className="mt-4 block font-display text-3xl font-black tracking-[-0.05em] text-white transition hover:text-sky-200 sm:text-4xl"
            >
              {resource.title}
            </Link>
          </div>

          <p className="mt-5 text-base leading-8 text-zinc-400">{resource.description}</p>

          <div className="mt-6 rounded-[1.5rem] border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-7 text-sky-50">
            <strong>Helpful for:</strong> {resource.helpfulFor}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {resource.audiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-zinc-300"
              >
                {audience}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/35 p-4 text-sm leading-7 text-zinc-300">
            {resource.preview}
          </div>

          <div className="mt-auto pt-7">
            <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-black/45 px-4 py-3">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
                Price
              </span>
              <span className="text-lg font-black tracking-[-0.03em] text-sky-100">
                {resource.price}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={detailHref}
                className="inline-flex justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-sky-300/50 hover:text-sky-200"
              >
                View details
              </Link>
              <Link
                href={`/checkout/${resource.slug}`}
                className="inline-flex w-full justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                Unlock download
              </Link>
            </div>
          </div>
        </div>
      </article>
    </AnimatedGlassCard>
  );
}

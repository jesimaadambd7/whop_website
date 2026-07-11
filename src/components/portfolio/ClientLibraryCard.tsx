"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { ClientLibraryEntry } from "@/lib/data/portfolio-page";
import { cn } from "@/lib/utils";

type ClientLibraryCardProps = {
  client: ClientLibraryEntry;
};

export function ClientLibraryCard({ client }: ClientLibraryCardProps) {
  return (
    <Link
      href={`/portfolio/${client.slug}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={`View all ${client.name} portfolio videos`}
    >
      <AnimatedGlassCard
        variant="panel"
        rounded="rounded-[2.25rem]"
        stretch
        className="h-full w-full overflow-hidden"
        bodyClassName="client-library-card__body flex-col overflow-hidden p-0"
      >
        <div
          className={cn(
            "relative z-[1] flex min-h-32 items-center justify-center border-b border-white/10 p-6 transition duration-400 group-hover/glass:border-sky-400/20",
            client.logoBg === "white" ? "bg-white" : "bg-zinc-950",
          )}
        >
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={210}
            height={90}
            unoptimized
            className="max-h-16 w-auto max-w-[210px] object-contain"
          />
        </div>

        <div className="relative z-[1] flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
                {client.category}
              </p>
              <h3 className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-50">
                {client.name}
              </h3>
            </div>
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-black text-sky-300">
              {client.videoCount} videos
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {client.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-zinc-300 transition duration-400 group-hover/glass:border-white/20 group-hover/glass:text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid flex-1 gap-3">
            {client.videos.map((video) => (
              <div
                key={video.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-400 group-hover/glass:border-sky-400/30 group-hover/glass:bg-sky-400/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      {video.category}
                    </p>
                    <h4 className="mt-2 font-display text-xl font-black tracking-[-0.04em] text-white">
                      {video.title}
                    </h4>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-300">
                    Published
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{video.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-full border border-sky-400/20 bg-sky-400/10 px-5 py-3 text-sm font-black text-sky-100 transition duration-400 group-hover/glass:border-sky-400/60 group-hover/glass:bg-sky-400 group-hover/glass:text-black">
            <span>View all videos</span>
            <span aria-hidden className="transition group-hover/glass:translate-x-1">
              →
            </span>
          </div>
        </div>
      </AnimatedGlassCard>
    </Link>
  );
}

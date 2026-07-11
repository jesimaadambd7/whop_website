"use client";

import Link from "next/link";
import type { ClientPortfolioVideo } from "@/lib/data/client-portfolio";
import { PortfolioVideoTile } from "@/components/portfolio/PortfolioVideoTile";

type ClientVideoGalleryProps = {
  website: string;
  videos: ClientPortfolioVideo[];
};

export function ClientVideoGallery({ website, videos }: ClientVideoGalleryProps) {
  const featured = videos[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-start">
          <div className="premium-panel glow-card motion-reveal overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950/70 p-3 shadow-[0_0_80px_rgba(0,168,255,0.12)] sm:p-4">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
              <PortfolioVideoTile
                title={featured.title}
                aspect={featured.ratio}
                videoSrc={featured.videoSrc}
                posterSrc={featured.posterSrc}
                gradient={featured.gradient}
                className="h-full rounded-[2rem]"
              />
            </div>
          </div>

          <aside className="premium-panel motion-reveal rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-400">
              Featured creative
            </p>
            <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-400">{featured.description}</p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Hook</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">{featured.hook}</p>
              </div>
              <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-400">
                  Result
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-sky-50">{featured.result}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-zinc-300">
                {featured.format}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-zinc-300">
                {featured.funnelStage}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-zinc-300">
                {featured.ratio}
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                Build videos like this
              </Link>
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300"
              >
                Visit client site
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <article
              key={video.title}
              className="glow-card overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-sky-400/55"
            >
              <div className="bg-black/35 p-3">
                <div className="relative mx-auto w-full max-w-[240px]">
                  <PortfolioVideoTile
                    title={video.title}
                    aspect={video.ratio}
                    videoSrc={video.videoSrc}
                    posterSrc={video.posterSrc}
                    gradient={video.gradient}
                    format={video.format}
                    duration={video.duration}
                    showMeta
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {video.funnelStage}
                </p>
                <h3 className="mt-2 font-display text-xl font-black tracking-[-0.04em] text-white">
                  {video.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{video.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

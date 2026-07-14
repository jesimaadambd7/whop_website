"use client";

import Image from "next/image";

const PROJECTS = [
  {
    title: "Product launch reel",
    tag: "UGC",
    image: "/assets/creators/creator-preview-ugc.png",
    alt: "UGC product launch video thumbnail",
  },
  {
    title: "Brand story cut",
    tag: "Edit",
    image: "/assets/creators/creator-preview-edit.png",
    alt: "Video editing and brand story thumbnail",
  },
  {
    title: "Paid social sprint",
    tag: "Ads",
    image: "/assets/creators/creator-preview-ads.png",
    alt: "Paid social ads creative thumbnail",
  },
];

const STATS = [
  { label: "Profile views", value: "2.4k" },
  { label: "Video plays", value: "18.7k" },
  { label: "Inquiries", value: "12" },
];

export function CreatorPortfolioLivePreview() {
  return (
    <div className="creator-portfolio-preview mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b12]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-300/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          ugcviss.com/creator/your-name
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-center"
            >
              <p className="font-display text-lg font-black tracking-[-0.04em] text-white sm:text-xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="creator-portfolio-preview-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 180px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.1)_50%,transparent_65%)] creator-portfolio-preview-shine" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/35 text-sm text-sky-200 backdrop-blur-sm transition duration-500 group-hover:scale-105 group-hover:border-sky-300/50 group-hover:bg-sky-400/15">
                    ▶
                  </span>
                </div>
                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sky-200 backdrop-blur-sm">
                  {project.tag}
                </span>
              </div>
              <div className="border-t border-white/8 px-3 py-2.5">
                <p className="truncate text-xs font-bold text-zinc-300">{project.title}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky-400/15 bg-sky-400/[0.06] px-4 py-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
              Inquiry inbox
            </p>
            <p className="mt-1 text-sm font-bold text-white">New project request received</p>
          </div>
          <span className="creator-portfolio-preview-pulse grid size-2.5 rounded-full bg-sky-400" />
        </div>
      </div>
    </div>
  );
}

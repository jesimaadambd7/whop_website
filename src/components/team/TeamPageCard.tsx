"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { TeamMember } from "@/lib/data/team";

const actionPrimary =
  "inline-flex rounded-full border border-sky-400/35 bg-sky-400/10 px-4 py-2 text-sm font-black text-sky-100 transition hover:border-sky-400 hover:bg-sky-400 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const actionSecondary =
  "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

type TeamPageCardProps = {
  member: TeamMember;
};

export function TeamPageCard({ member }: TeamPageCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2.25rem]"
      stretch
      className="h-full w-full scroll-mt-28"
      bodyClassName="team-page-card__body flex h-full flex-col p-6"
    >
      <article id={member.slug} className="relative z-[1] flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-sky-400/10">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name} profile photo`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,255,0.28),transparent_34%),linear-gradient(135deg,#020617,#082f49_52%,#111827)]">
              <span className="font-display text-6xl font-black tracking-[-0.08em] text-sky-100">
                {member.initials}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-300 backdrop-blur">
            {member.badge}
          </div>
        </div>

        <h2 className="mt-6 font-display text-3xl font-black tracking-[-0.05em] text-white transition duration-400 group-hover/glass:text-sky-50">
          {member.name}
        </h2>
        <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
          {member.role}
        </p>
        <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
          {member.bio}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={member.portfolioHref} className={actionPrimary}>
            View Portfolio
          </Link>
          <Link href={member.profileHref} className={actionSecondary}>
            Read Journey
          </Link>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className={actionSecondary}
            >
              View LinkedIn
            </a>
          )}
        </div>
      </article>
    </AnimatedGlassCard>
  );
}

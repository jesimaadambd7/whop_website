"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Crown, Link2 } from "lucide-react";
import { useFinePointer } from "@/hooks/useFinePointer";
import type { TeamMember } from "@/lib/data/team";

type FounderTeamCardProps = {
  member: TeamMember;
};

export function FounderTeamCard({ member }: FounderTeamCardProps) {
  const reduceMotion = useReducedMotion() === true;
  const finePointer = useFinePointer();

  const motionProps =
    reduceMotion || !finePointer
      ? {}
      : {
          initial: false as const,
          whileHover: { y: -6, scale: 1.01 },
          transition: { type: "spring" as const, stiffness: 320, damping: 24 },
        };

  return (
    <div className="group/founder relative block h-full">
      <Link
        href={member.profileHref}
        className="absolute inset-0 z-[2] rounded-[2rem]"
        aria-label={`View ${member.name}'s profile`}
      />
      <motion.article className="founder-team-card relative h-full" {...motionProps}>
        <div
          className="founder-team-card__halo pointer-events-none absolute -inset-3 rounded-[2.25rem]"
          aria-hidden="true"
        />
        <div
          className="founder-team-card__halo founder-team-card__halo--gold pointer-events-none absolute -inset-5 rounded-[2.5rem]"
          aria-hidden="true"
        />

        <div className="founder-team-card__frame relative h-full rounded-[2rem] p-[1.5px]">
          <div className="founder-team-card__body relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1.5px)] border border-white/10 bg-[#050912] p-6 sm:p-7">
            <div className="founder-team-card__aurora pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="founder-team-card__grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="founder-team-card__orb founder-team-card__orb--1 pointer-events-none absolute" aria-hidden="true" />
            <div className="founder-team-card__orb founder-team-card__orb--2 pointer-events-none absolute" aria-hidden="true" />
            <div className="founder-team-card__shine pointer-events-none absolute inset-0" aria-hidden="true" />

            <div className="relative z-[1] flex items-start justify-between gap-3">
              <span className="founder-team-card__badge inline-flex items-center gap-1.5 rounded-full border border-amber-300/45 bg-amber-300/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-50">
                <Crown size={12} className="text-amber-300" />
                Founder
              </span>
              <span className="founder-team-card__arrow grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-sky-300">
                <ArrowUpRight size={16} />
              </span>
            </div>

            <div className="relative z-[1] mt-6 flex flex-col items-center text-center">
              <div className="founder-team-card__avatar-wrap relative">
                <div className="founder-team-card__ring pointer-events-none absolute inset-[-10px] rounded-[2rem]" aria-hidden="true" />
                <div className="founder-team-card__avatar relative h-28 w-28 overflow-hidden rounded-[1.75rem] border border-sky-400/45 bg-sky-400/10 p-1 shadow-[0_0_40px_rgba(0,188,254,0.25)]">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.45rem]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={`${member.name} profile photo`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#020617,#0369a1)] font-display text-3xl font-black text-sky-100">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] ring-1 ring-inset ring-white/10" />
                </div>
              </div>

              <h3 className="founder-team-card__name mt-5 font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-[1.7rem]">
                {member.name}
              </h3>
              <p className="founder-team-card__role mt-2 text-sm font-bold text-amber-200">
                {member.role}
              </p>
            </div>

            <p className="founder-team-card__bio relative z-[1] mt-5 flex-1 text-center text-[15px] leading-7 text-zinc-200">
              {member.bio}
            </p>

            <div className="relative z-[3] mt-6 flex flex-wrap items-center justify-center gap-2">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-100"
                >
                  <Link2 size={12} />
                  LinkedIn
                </a>
              )}
              <span className="founder-team-card__chip inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-100">
                Creative leadership
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

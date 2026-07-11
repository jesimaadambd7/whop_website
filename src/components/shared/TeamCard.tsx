"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { TeamMember } from "@/lib/data/team";

type TeamCardProps = {
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Link href={member.profileHref} className="block h-full">
      <AnimatedGlassCard
        variant="card"
        rounded="rounded-[2rem]"
        stretch
        className="h-full w-full"
        bodyClassName="team-card__body flex-col p-6"
      >
        <div className="relative z-[1] h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-sky-400/10 transition duration-300 group-hover/glass:rotate-3">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name} profile photo`}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#020617,#0369a1)] font-display text-2xl font-black text-sky-100">
              {member.initials}
            </div>
          )}
        </div>

        <h3 className="relative z-[1] mt-5 font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-50">
          {member.name}
        </h3>
        <p className="relative z-[1] mt-1 text-sm font-bold text-sky-400 transition duration-400 group-hover/glass:text-sky-300">
          {member.role}
        </p>
        <p className="relative z-[1] mt-4 flex-1 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
          {member.bio}
        </p>
      </AnimatedGlassCard>
    </Link>
  );
}

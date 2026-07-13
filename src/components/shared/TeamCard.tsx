"use client";

import { MemberTeamCard } from "@/components/shared/MemberTeamCard";
import type { TeamMember } from "@/lib/data/team";

type TeamCardProps = {
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  return <MemberTeamCard member={member} variant="compact" />;
}

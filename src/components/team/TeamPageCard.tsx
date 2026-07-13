"use client";

import { MemberTeamCard } from "@/components/shared/MemberTeamCard";
import type { TeamMember } from "@/lib/data/team";

type TeamPageCardProps = {
  member: TeamMember;
};

export function TeamPageCard({ member }: TeamPageCardProps) {
  return <MemberTeamCard member={member} variant="page" />;
}

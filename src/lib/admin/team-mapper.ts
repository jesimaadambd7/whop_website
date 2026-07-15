import type { AdminTeamMember } from "@/lib/admin/team-types";
import type { TeamMember } from "@/lib/data/team";

export function toPublicTeamMember(member: AdminTeamMember): TeamMember {
  const initials =
    member.initials.trim() ||
    member.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return {
    slug: member.slug,
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: member.image ?? undefined,
    initials,
    badge: initials,
    linkedin: member.linkedin || undefined,
    twitter: (member.twitter ?? "").trim() || undefined,
    portfolioHref: member.portfolioHref || `/portfolio/${member.slug}`,
    profileHref: member.profileHref || `/team/${member.slug}`,
  };
}

export function toPublicTeamMembers(members: AdminTeamMember[]) {
  return members
    .filter((member) => member.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toPublicTeamMember);
}

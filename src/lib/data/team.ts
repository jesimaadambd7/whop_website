export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  /** Large initials for placeholder avatars */
  initials: string;
  /** Small badge shown on photo overlay */
  badge: string;
  linkedin?: string;
  twitter?: string;
  portfolioHref: string;
  /** Public team profile URL, may override default /team/slug */
  profileHref: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "md-sahadat-hosen",
    name: "Md. Sahadat Hosen",
    role: "Performance Ads & Growth Lead",
    bio: "Leads conversion-focused ad direction, campaign testing, and sales-driven creative strategy for DTC and ecommerce brands.",
    image: "/assets/team/sahadat.jpg",
    initials: "SA",
    badge: "SA",
    linkedin: "https://www.linkedin.com/in/itsahadat/",
    portfolioHref: "/portfolio/md-sahadat-hosen",
    profileHref: "/team/md-sahadat-hosen",
  },
  {
    slug: "neaz-mahmud",
    name: "Neaz Mahmud",
    role: "Founder & CEO",
    bio: "Leads UGCViss's creative direction, production standards, UGC ad systems, and premium video editing workflow.",
    image: "/assets/team/neaz.jpg",
    initials: "NM",
    badge: "NM",
    linkedin: "https://www.linkedin.com/in/neazmahmud/",
    twitter: "https://x.com/chyon_khan",
    portfolioHref: "/portfolio/neaz-mahmud",
    profileHref: "/team/neaz-mahmud",
  },
  {
    slug: "md-nur-alam",
    name: "Md Nur Alam",
    role: "Video Editor",
    bio: "Creates clean performance edits, product demo cuts, UGC-style sequences, and fast social media campaign variations.",
    initials: "NS",
    badge: "NS",
    portfolioHref: "/portfolio/md-nur-alam",
    profileHref: "/team/md-nur-alam",
  },
  {
    slug: "kawsar-hossain",
    name: "Kawsar Hossain",
    role: "Video Editor",
    bio: "Focuses on retention-minded cuts, visual polish, short-form structure, and ad-ready editing support for client campaigns.",
    initials: "KH",
    badge: "KH",
    portfolioHref: "/portfolio/kawsar-hossain",
    profileHref: "/team/kawsar-hossain",
  },
];

export const teamCulture = [
  {
    title: "Performance-minded",
    description:
      "Every asset starts with the job it needs to do in the campaign and the sale it needs to support.",
  },
  {
    title: "Production-ready",
    description:
      "Models, shooting, editing, hooks, motion polish, and handoff details are treated as one connected workflow.",
  },
  {
    title: "Systems-backed",
    description:
      "Creative delivery works better when the team also understands web, tools, and digital operations.",
  },
] as const;

export function isFounderMember(member: TeamMember) {
  return /founder|ceo/i.test(member.role);
}

export function sortTeamWithFounderFirst(members: TeamMember[]) {
  return [...members].sort((a, b) => {
    const aFounder = isFounderMember(a);
    const bFounder = isFounderMember(b);
    if (aFounder && !bFounder) return -1;
    if (!aFounder && bFounder) return 1;
    return 0;
  });
}

export async function loadTeamMembers() {
  const { listAdminTeamMembers } = await import("@/lib/admin/team-store");
  const { toPublicTeamMembers } = await import("@/lib/admin/team-mapper");
  const records = await listAdminTeamMembers();
  return toPublicTeamMembers(records);
}

export async function loadTeamMemberBySlug(slug: string) {
  const { listAdminTeamMembers } = await import("@/lib/admin/team-store");
  const { toPublicTeamMember } = await import("@/lib/admin/team-mapper");
  const records = await listAdminTeamMembers();
  const record = records.find((member) => member.slug === slug);
  return record && record.status === "published"
    ? toPublicTeamMember(record)
    : undefined;
}

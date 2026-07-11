export type TeamProfileStatus = "draft" | "published" | "archived";

export const TEAM_ROLE_OPTIONS = [
  "Founder & CEO",
  "Performance Ads & Growth Lead",
  "Creative Strategist",
  "Creative Strategist, Performance Ads",
  "Video Editor",
  "Motion Designer",
  "Designer",
  "Paid Social Specialist",
  "Production Manager",
  "UGC Creator Manager",
  "Technology & Systems Lead",
] as const;

export type AdminTeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  image: string | null;
  linkedin: string;
  profileHref: string;
  portfolioHref: string;
  status: TeamProfileStatus;
  sortOrder: number;
};

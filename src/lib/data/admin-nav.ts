export type AdminNavItem = {
  href: string;
  label: string;
  badge: string;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", badge: "DB" },
  { href: "/admin/inquiries", label: "Inquiries", badge: "IN" },
  { href: "/admin/creators", label: "Creator approval", badge: "CR" },
  { href: "/admin/portfolio", label: "Agency portfolio", badge: "PF" },
  { href: "/admin/team", label: "Team profiles", badge: "TM" },
  { href: "/admin/resources", label: "Resource store", badge: "RS" },
  { href: "/admin/packages", label: "Packages & pricing", badge: "PK" },
  { href: "/admin/orders", label: "Orders", badge: "OR" },
  { href: "/admin/clients", label: "Clients", badge: "CL" },
  { href: "/admin/subscriptions", label: "Subscriptions", badge: "SB" },
  { href: "/admin/deliveries", label: "Deliveries", badge: "DL" },
];

export const adminControlPanels = [
  {
    href: "/admin/creators",
    title: "Creator portfolios",
    description:
      "Review, approve, verify, feature, suspend, shortlist, and adjust creator account limits.",
  },
  {
    href: "/admin/resources",
    title: "Resource store",
    description:
      "Upload paid prompt packs, research, AI tutorials, portfolio packs, and locked downloads.",
  },
  {
    href: "/admin/portfolio",
    title: "Portfolio media",
    description:
      "Upload and update backend-managed 9:16 videos, posters, client categories, and results.",
  },
  {
    href: "/admin/team",
    title: "Team profiles",
    description:
      "Manage backend team cards, roles, bios, LinkedIn links, and profile photos.",
  },
] as const;

export const submissionTypeFilters = [
  { value: "all", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "creative-audit", label: "Creative Audit" },
  { value: "career", label: "Career" },
  { value: "talent", label: "Talent" },
  { value: "creator", label: "Creator signup" },
] as const;

export const submissionStatusFilters = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
] as const;

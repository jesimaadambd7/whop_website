import type { MetadataRoute } from "next";
import { clientPortfolios } from "@/lib/data/client-portfolio";
import { loadPackages } from "@/lib/data/packages";
import { loadPublishedVaultResources } from "@/lib/data/load-resources";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site";
import { loadTeamMembers } from "@/lib/data/team";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/creator-portfolios", changeFrequency: "weekly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  return path === "/" ? base : `${base}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [pkgs, team, resources] = await Promise.all([
    loadPackages().catch(() => []),
    loadTeamMembers().catch(() => []),
    loadPublishedVaultResources().catch(() => []),
  ]);

  const packageEntries: MetadataRoute.Sitemap = pkgs.map((pkg) => ({
    url: absoluteUrl(`/packages/${pkg.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = clientPortfolios.map((client) => ({
    url: absoluteUrl(`/portfolio/${client.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const teamEntries: MetadataRoute.Sitemap = team.map((member) => ({
    url: absoluteUrl(member.profileHref.startsWith("/") ? member.profileHref : `/team/${member.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: absoluteUrl(`/resources/${resource.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Known creator/portfolio profile pages that are also public
  const extraEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/portfolio/neaz-mahmud"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: absoluteUrl("/portfolio/salmaun-hossain"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
  ];

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    ...staticEntries,
    ...serviceEntries,
    ...packageEntries,
    ...portfolioEntries,
    ...teamEntries,
    ...resourceEntries,
    ...extraEntries,
  ]) {
    byUrl.set(entry.url, entry);
  }

  return Array.from(byUrl.values());
}

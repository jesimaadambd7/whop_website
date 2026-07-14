import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  const host = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/creator/login",
          "/creator/signup",
          "/creator/dashboard",
          "/creator/dashboard/",
          "/checkout",
          "/checkout/",
          "/api/",
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}

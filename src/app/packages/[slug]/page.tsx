import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageDetailView } from "@/components/packages/PackageDetailView";
import { loadPackageBySlug, loadPackages } from "@/lib/data/packages";
import type { Package } from "@/lib/data/packages";
import { siteConfig } from "@/lib/data/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const packages = await loadPackages();
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await loadPackageBySlug(params.slug);
  if (!pkg) return { title: "Package" };

  return buildPageMetadata({
    title: `${pkg.title} — ${pkg.badge}`,
    description: pkg.heroDescription || pkg.description,
    path: `/packages/${pkg.slug}`,
    keywords: [
      pkg.title,
      pkg.badge,
      "UGC creative sprint",
      "video production package",
      "paid social creative package",
    ],
    image: {
      url: pkg.thumbnail,
      alt: `${pkg.title} package`,
    },
  });
}

function PackageServiceSchema({ pkg }: { pkg: Package }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.title,
    description: pkg.description,
    image: `${siteConfig.url}${pkg.thumbnail}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: pkg.priceAmount,
      priceCurrency: "USD",
      url: `${siteConfig.url}/packages/${pkg.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function PackagePage({ params }: Props) {
  const pkg = await loadPackageBySlug(params.slug);
  if (!pkg) notFound();

  return (
    <>
      <PackageServiceSchema pkg={pkg} />
      <PackageDetailView pkg={pkg} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageDetailView } from "@/components/packages/PackageDetailView";
import { loadPackageBySlug, loadPackages } from "@/lib/data/packages";
import type { Package } from "@/lib/data/packages";
import { siteConfig } from "@/lib/data/site";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const packages = await loadPackages();
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await loadPackageBySlug(params.slug);
  if (!pkg) return { title: "Package" };

  const canonical = `${siteConfig.url}/packages/${pkg.slug}`;

  return {
    title: pkg.title,
    description: pkg.description,
    alternates: { canonical },
    openGraph: {
      title: `${pkg.title} | VidCarry`,
      description: pkg.description,
      url: canonical,
      images: [
        {
          url: `${siteConfig.url}${pkg.thumbnail}`,
          alt: `${pkg.title} thumbnail`,
        },
      ],
      type: "website",
    },
  };
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

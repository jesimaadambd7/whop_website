import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetailView } from "@/components/resources/ResourceDetailView";
import {
  getPublishedVaultResourceBySlug,
  loadPublishedVaultResources,
} from "@/lib/data/load-resources";
import type { VaultResource } from "@/lib/data/resources";
import { siteConfig } from "@/lib/data/site";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const resources = await loadPublishedVaultResources();
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = await getPublishedVaultResourceBySlug(params.slug);
  if (!resource) return { title: "Resource" };

  const canonical = `${siteConfig.url}/resources/${resource.slug}`;

  return {
    title: `${resource.title} | VidCarry Resources`,
    description: resource.description,
    alternates: { canonical },
    openGraph: {
      title: `${resource.title} | VidCarry Resources`,
      description: resource.description,
      url: canonical,
      images: [
        {
          url: `${siteConfig.url}${resource.thumbnail}`,
          alt: resource.title,
        },
      ],
      type: "website",
    },
  };
}

function ResourceProductSchema({ resource }: { resource: VaultResource }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: resource.title,
    description: resource.description,
    image: [`${siteConfig.url}${resource.thumbnail}`],
    brand: { "@type": "Brand", name: "VidCarry" },
    category: resource.schemaCategory,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/resources/${resource.slug}`,
      priceCurrency: "USD",
      price: resource.priceAmount.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ResourceDetailPage({ params }: Props) {
  const resource = await getPublishedVaultResourceBySlug(params.slug);
  if (!resource) notFound();

  return (
    <>
      <ResourceProductSchema resource={resource} />
      <ResourceDetailView resource={resource} />
    </>
  );
}

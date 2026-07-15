import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import {
  getServiceById,
  getServiceSeo,
  services,
} from "@/lib/data/services";
import { siteConfig } from "@/lib/data/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceById(params.slug);
  if (!service) return { title: "Service" };

  const seo = getServiceSeo(service);
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${service.id}`,
    keywords: seo.keywords,
    image: {
      url: service.image,
      alt: `${service.title} — UGCViss`,
    },
  });
}

function ServiceJsonLd({ slug }: { slug: string }) {
  const service = getServiceById(slug);
  if (!service) return null;

  const pageUrl = `${siteConfig.url}/services/${service.id}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      image: `${siteConfig.url}${service.image}`,
      url: pageUrl,
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: "Worldwide",
      serviceType: service.title,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteConfig.url}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ServicePage({ params }: Props) {
  const service = getServiceById(params.slug);
  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd slug={service.id} />
      <ServiceDetailView service={service} />
    </>
  );
}

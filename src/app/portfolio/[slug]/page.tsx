import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuditForm } from "@/components/shared/AuditForm";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ClientVideoGallery } from "@/components/portfolio/ClientVideoGallery";
import { Container } from "@/components/ui/Container";
import {
  clientPortfolios,
  getClientPortfolio,
  type ClientPortfolio,
} from "@/lib/data/client-portfolio";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return clientPortfolios.map((client) => ({ slug: client.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const client = getClientPortfolio(params.slug);
  if (!client) return { title: "Portfolio" };

  const title = `${client.name} Video Portfolio | VidCarry`;
  const description = `Watch VidCarry's ${client.name} video work library for UGC ads, product explainers, paid social creatives, and campaign-ready edits.`;
  const canonical = `${siteConfig.url}/portfolio/${client.slug}`;

  return {
    title,
    description,
    keywords: [
      `${client.name} video portfolio`,
      `${client.name} UGC ads`,
      `${client.name} ecommerce ads`,
      "VidCarry portfolio",
      "paid social video creative",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "VidCarry",
      locale: "en_US",
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${client.name} video portfolio by VidCarry`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function ClientPortfolioSchema({ client }: { client: ClientPortfolio }) {
  const pageUrl = `${siteConfig.url}/portfolio/${client.slug}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${client.name} Video Portfolio`,
    description: `VidCarry video work library for ${client.name}, including UGC ads, product explainers, paid social creatives, and campaign-ready edits.`,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteConfig.url}/portfolio`,
      },
      { "@type": "ListItem", position: 3, name: client.name, item: pageUrl },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${client.name} video work library`,
    itemListElement: client.videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: video.title,
        description: video.description,
        genre: video.format,
        creator: { "@id": `${siteConfig.url}/#organization` },
        about: client.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

export default function ClientPortfolioPage({ params }: Props) {
  const client = getClientPortfolio(params.slug);
  if (!client) notFound();

  const stats = [
    { value: String(client.videoCount), label: "Video assets" },
    { value: client.industry, label: "Client category" },
    { value: "Ad-ready", label: "Creative format" },
  ];

  return (
    <>
      <ClientPortfolioSchema client={client} />

      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="aurora-orb absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,168,255,0.13),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%)]"
        />
        <Container className="relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-sky-400/50 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span aria-hidden>{"<-"}</span>
            Portfolio
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="motion-reveal max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
                Client video library
              </p>
              <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                {client.name} videos, ads, and campaign creative.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl sm:leading-9">
                A dedicated library for {client.name} work, built to showcase UGC ads,
                product explainers, paid social edits, and performance-ready video assets
                in one clean place.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
                  >
                    <p className="font-display text-2xl font-black tracking-[-0.05em] text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-panel glow-card motion-reveal rounded-[2rem] border border-white/10 bg-black/50 p-5">
              <div
                className={cn(
                  "flex min-h-44 items-center justify-center rounded-[1.5rem] border border-white/10 p-8",
                  client.logoBg === "white" ? "bg-white" : "bg-zinc-950",
                )}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={260}
                  height={120}
                  unoptimized
                  priority
                  className="max-h-24 w-auto max-w-[260px] object-contain"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ClientVideoGallery website={client.website} videos={client.videos} />

      <AuditForm id="creative-audit" bordered />
      <CtaBanner
        title={`Want a ${client.name}-style video library for your brand?`}
        description="We can plan the shoot, edit the ad batch, organize the portfolio assets, and help run paid social campaigns around the best creative angles."
      />
    </>
  );
}

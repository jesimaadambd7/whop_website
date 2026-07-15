import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageCheckoutView } from "@/components/checkout/PackageCheckoutView";
import { ResourceCheckoutView } from "@/components/checkout/ResourceCheckoutView";
import { loadPackageBySlug, loadPackages } from "@/lib/data/packages";
import { getPublishedVaultResourceBySlug, loadPublishedVaultResources } from "@/lib/data/load-resources";
import { getPublicWhopCheckoutUrl, getPublicWhopPlanId } from "@/lib/whop-plans";

type Props = {
  params: { slug: string };
  searchParams: { variant?: string };
};

export async function generateStaticParams() {
  const [packages, resources] = await Promise.all([loadPackages(), loadPublishedVaultResources()]);
  return [
    ...packages.map((pkg) => ({ slug: pkg.slug })),
    ...resources.map((resource) => ({ slug: resource.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await loadPackageBySlug(params.slug);
  const resource = await getPublishedVaultResourceBySlug(params.slug);

  if (pkg) {
    return {
      title: "Secure Package Checkout",
      robots: { index: false, follow: false },
    };
  }

  if (resource) {
    return {
      title: `Unlock ${resource.title}`,
      robots: { index: false, follow: false },
    };
  }

  return { title: "Checkout" };
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const pkg = await loadPackageBySlug(params.slug);
  const resource = await getPublishedVaultResourceBySlug(params.slug);

  if (pkg) {
    const variantId = searchParams.variant ?? pkg.variantId;
    return (
      <PackageCheckoutView
        pkg={pkg}
        variantId={variantId}
        whopPlanId={getPublicWhopPlanId(pkg.slug)}
        whopCheckoutUrl={getPublicWhopCheckoutUrl(pkg.slug)}
        whopSandbox={process.env.WHOP_SANDBOX === "true"}
      />
    );
  }

  if (resource) {
    return (
      <ResourceCheckoutView
        resource={resource}
        whopSandbox={process.env.WHOP_SANDBOX === "true"}
      />
    );
  }

  notFound();
}

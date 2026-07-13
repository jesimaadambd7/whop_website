import { notFound } from "next/navigation";
import { CheckoutCompleteView } from "@/components/checkout/CheckoutCompleteView";
import { markOrderPaid } from "@/lib/admin/order-store";
import { loadPackageBySlug } from "@/lib/data/packages";
import { getPublishedVaultResourceBySlug } from "@/lib/data/load-resources";

type Props = {
  params: { slug: string };
  searchParams: { status?: string; orderId?: string };
};

export default async function CheckoutCompletePage({ params, searchParams }: Props) {
  const pkg = await loadPackageBySlug(params.slug);
  const resource = await getPublishedVaultResourceBySlug(params.slug);
  const item = pkg ?? resource;
  if (!item) notFound();

  const isResource = Boolean(resource && !pkg);
  const statusParam = searchParams.status?.toLowerCase();
  const isSuccess = statusParam === "success";
  const isError =
    statusParam === "error" || statusParam === "cancelled" || statusParam === "canceled";

  if (isSuccess && searchParams.orderId) {
    await markOrderPaid(searchParams.orderId);
  }

  const status = isSuccess ? "success" : isError ? "error" : "processing";
  const itemTitle = pkg?.title ?? resource!.title;

  return (
    <CheckoutCompleteView
      status={status}
      itemTitle={itemTitle}
      slug={params.slug}
      isResource={isResource}
      orderId={searchParams.orderId}
    />
  );
}

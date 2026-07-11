import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
  const isSuccess = searchParams.status === "success";
  const isError = searchParams.status === "error";

  if (isSuccess && searchParams.orderId) {
    await markOrderPaid(searchParams.orderId);
  }

  return (
    <section className="py-24">
      <Container className="max-w-lg text-center">
        {isSuccess ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/20">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-white">Payment successful!</h1>
            <p className="mt-3 text-sm text-zinc-400">
              {isResource
                ? `Your ${resource!.title} is unlocked. Log in with the same checkout email to access downloads in your library.`
                : `Your ${pkg!.title} is confirmed. We'll open your private client workspace and contact you shortly.`}
            </p>
            {isResource && (
              <Button href="/resources/library" className="mt-8">
                Go to My Library
              </Button>
            )}
          </>
        ) : isError ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/40 bg-red-400/20">
              <span className="text-2xl">✕</span>
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-white">Payment failed</h1>
            <p className="mt-3 text-sm text-zinc-400">Something went wrong. Please try again.</p>
            <Button href={`/checkout/${params.slug}`} className="mt-8">
              Try Again
            </Button>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold text-white">Processing...</h1>
            <p className="mt-3 text-sm text-zinc-400">We&apos;re confirming your payment.</p>
          </>
        )}
        {!isError && !isResource && (
          <Button href="/" variant="secondary" className="mt-8">
            Back to Home
          </Button>
        )}
      </Container>
    </section>
  );
}

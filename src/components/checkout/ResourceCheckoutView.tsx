"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { WhopCheckout } from "@/components/checkout/WhopCheckout";
import { PendingSubmitButton } from "@/components/checkout/PendingSubmitButton";
import {
  buildCheckoutCompletePath,
  buildCheckoutCompleteUrl,
  getCheckoutOrigin,
} from "@/lib/checkout/urls";
import type { VaultResource } from "@/lib/data/resources";
import { getPublicWhopPlanId } from "@/lib/whop-plans";

type ResourceCheckoutViewProps = {
  resource: VaultResource;
  whopSandbox?: boolean;
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-3.5 text-white outline-none transition focus:border-sky-300";
const labelClass = "text-xs font-black uppercase tracking-[0.16em] text-zinc-400";

export function ResourceCheckoutView({
  resource,
  whopSandbox = false,
}: ResourceCheckoutViewProps) {
  const planId = getPublicWhopPlanId(resource.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const router = useRouter();
  const [isRedirecting, startRedirect] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const returnUrl = orderId
    ? buildCheckoutCompleteUrl(resource.slug, orderId, siteUrl)
    : `${getCheckoutOrigin(siteUrl)}/checkout/${resource.slug}/complete`;

  function handlePaymentComplete() {
    if (!orderId) return;
    router.push(buildCheckoutCompletePath(resource.slug, orderId));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setCustomerEmail(String(formData.get("email") || ""));
    if (!planId) return;
    setIsSubmitting(true);
    startRedirect(async () => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "resource",
            slug: resource.slug,
            name: formData.get("name"),
            email: formData.get("email"),
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not start checkout.");
        }
        setOrderId(data.order.id);
        setShowPayment(true);
      } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : "Could not start checkout.");
      } finally {
        setIsSubmitting(false);
      }
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden border-b border-white/10 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(0,168,255,.18),transparent_30%)]" />
      <Container className="relative max-w-2xl px-5 sm:px-8 lg:px-10">
        <Link
          href={`/resources/${resource.slug}`}
          className="text-sm font-bold text-zinc-400 transition hover:text-sky-300"
        >
          Back to resource details
        </Link>

        <section className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">Secure checkout</p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.06em]">
            Unlock {resource.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-zinc-400">
            Complete checkout for instant digital access. Log in later with the same email to reopen
            downloads.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <input type="hidden" name="slug" value={resource.slug} />
            <div>
              <label className={labelClass} htmlFor="resource-checkout-name">
                Name
              </label>
              <input
                id="resource-checkout-name"
                name="name"
                required
                minLength={2}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="resource-checkout-email">
                Email
              </label>
              <input
                id="resource-checkout-email"
                name="email"
                type="email"
                required
                className={fieldClass}
              />
            </div>

            {planId ? (
              <PendingSubmitButton pending={isSubmitting} pendingLabel="Opening checkout..." className="w-full">
                Pay {resource.price}
              </PendingSubmitButton>
            ) : (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
                <p className="font-medium text-amber-200">Whop plan not configured</p>
                <button
                  type="button"
                  onClick={() => startRedirect(() => router.push("/contact"))}
                  className="mt-4 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-sky-400"
                >
                  {isRedirecting ? "Opening..." : "Contact us to purchase"}
                </button>
              </div>
            )}
          </form>

          {showPayment && planId ? (
            <div className="mt-8 border-t border-white/10 pt-8">
              <WhopCheckout
                planId={planId}
                returnUrl={returnUrl}
                email={customerEmail}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          ) : null}
        </section>
      </Container>
    </div>
  );
}

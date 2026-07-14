"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { WhopCheckout } from "@/components/checkout/WhopCheckout";
import { PendingSubmitButton } from "@/components/checkout/PendingSubmitButton";
import { buildCheckoutCompletePath, buildCheckoutCompleteUrl, getCheckoutOrigin } from "@/lib/checkout/urls";
import type { Package } from "@/lib/data/packages";

type PackageCheckoutViewProps = {
  pkg: Package;
  variantId?: string;
  whopPlanId?: string;
  whopCheckoutUrl?: string;
  whopSandbox?: boolean;
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-3.5 text-white outline-none transition focus:border-sky-300";
const labelClass = "text-xs font-black uppercase tracking-[0.16em] text-zinc-400";

function OrderSummary({ pkg }: { pkg: Package }) {
  const tier =
    pkg.priceNote === "Billed monthly" ? "Standard / Monthly" : "Standard / One-time";
  const deliveryDays = pkg.delivery.replace(" business days", "");

  return (
    <aside className="sticky top-28 rounded-[2.25rem] border border-sky-400/25 bg-sky-400/[0.07] p-7">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Order summary</p>
      <h2 className="mt-4 font-display text-3xl font-black">{pkg.title}</h2>
      <p className="mt-2 text-zinc-400">{tier}</p>
      <div className="mt-6 flex items-end gap-3">
        <strong className="font-display text-5xl font-black">{pkg.price}</strong>
        {pkg.originalPrice ? (
          <span className="pb-1 text-zinc-500 line-through">{pkg.originalPrice}</span>
        ) : null}
      </div>
      <div className="mt-7 grid gap-3 text-sm">
        <p className="flex justify-between border-t border-white/10 pt-3">
          <span className="text-zinc-500">Delivery after kickoff</span>
          <strong>{deliveryDays} business days</strong>
        </p>
        <p className="flex justify-between border-t border-white/10 pt-3">
          <span className="text-zinc-500">Included revisions</span>
          <strong>{pkg.revisionsLabel}</strong>
        </p>
        <p className="flex justify-between border-t border-white/10 pt-3">
          <span className="text-zinc-500">Client workspace</span>
          <strong>Included</strong>
        </p>
      </div>
      <p className="mt-7 text-xs leading-6 text-zinc-500">
        We work hard to move quickly and will contact you immediately after payment to confirm
        scope, assets, and kickoff timing.
      </p>
    </aside>
  );
}

export function PackageCheckoutView({
  pkg,
  variantId,
  whopPlanId,
  whopCheckoutUrl,
  whopSandbox = false,
}: PackageCheckoutViewProps) {
  const planId = whopPlanId;
  const checkoutUrl = whopCheckoutUrl;
  const canCheckout = Boolean(planId || checkoutUrl);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const router = useRouter();
  const paymentRef = useRef<HTMLDivElement>(null);
  const [isRedirecting, startRedirect] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const returnUrl = orderId
    ? buildCheckoutCompleteUrl(pkg.slug, orderId, siteUrl)
    : `${getCheckoutOrigin(siteUrl)}/checkout/${pkg.slug}/complete`;

  function handlePaymentComplete() {
    if (!orderId) return;
    router.push(buildCheckoutCompletePath(pkg.slug, orderId));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    setCustomerEmail(email);

    if (!canCheckout) return;

    setIsSubmitting(true);
    startRedirect(async () => {
      try {
        const payload = Object.fromEntries(formData.entries());
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "package",
            ...payload,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not start checkout.");
        }

        if (checkoutUrl && !planId) {
          window.location.href = checkoutUrl;
          return;
        }

        setOrderId(data.order.id);
        setShowPayment(true);
        requestAnimationFrame(() => {
          paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
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
      <Container className="relative px-5 sm:px-8 lg:px-10">
        <Link
          href={pkg.href}
          className="text-sm font-bold text-zinc-400 transition hover:text-sky-300"
        >
          Back to package details
        </Link>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
          <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">
              Secure checkout
            </p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.06em]">
              Start {pkg.title}
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-zinc-400">
              Tell us the essentials before payment. Your private workspace opens after checkout for
              the complete brief, footage, messages, progress, revisions, and delivery.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <input type="hidden" name="slug" value={pkg.slug} />
              {variantId ? <input type="hidden" name="variantId" value={variantId} /> : null}

              <div>
                <label className={labelClass} htmlFor="checkout-name">
                  Name
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  required
                  minLength={2}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="checkout-email">
                  Email
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="checkout-company">
                  Company
                </label>
                <input id="checkout-company" name="company" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="checkout-website">
                  Website
                </label>
                <input id="checkout-website" name="website" type="url" className={fieldClass} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="checkout-goal">
                  Primary goal
                </label>
                <textarea
                  id="checkout-goal"
                  name="goal"
                  required
                  minLength={10}
                  rows={4}
                  placeholder="What should this creative help your brand achieve?"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="checkout-footage">
                  Footage readiness
                </label>
                <select
                  id="checkout-footage"
                  name="footageReadiness"
                  className={fieldClass}
                  defaultValue="ready"
                >
                  <option value="ready">Footage is ready</option>
                  <option value="partial">Some footage is ready</option>
                  <option value="production-needed">I need production support</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="checkout-footage-link">
                  Footage link (optional)
                </label>
                <input
                  id="checkout-footage-link"
                  name="footageLink"
                  type="url"
                  placeholder="Drive, Dropbox, Frame.io..."
                  className={fieldClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="checkout-reference">
                  Reference or inspiration link (optional)
                </label>
                <input
                  id="checkout-reference"
                  name="referenceLink"
                  type="url"
                  className={fieldClass}
                />
              </div>

              <label className="flex items-start gap-3 text-sm leading-6 text-zinc-400 sm:col-span-2">
                <input required type="checkbox" className="mt-1 accent-sky-400" />
                <span>
                  I agree to the service scope and{" "}
                  <Link href="/terms-conditions" className="text-sky-300 hover:text-white">
                    terms
                  </Link>
                  . Work begins only after UGCViss confirms kickoff; pre-kickoff service payments
                  are eligible for review under the refund policy.
                </span>
              </label>

              {canCheckout ? (
                <PendingSubmitButton
                  name="provider"
                  value="whop"
                  pending={isSubmitting}
                  pendingLabel={planId ? "Loading payment..." : "Redirecting to Whop..."}
                  className="sm:col-span-2"
                >
                  {planId ? "Continue to payment" : "Pay Now"}
                </PendingSubmitButton>
              ) : (
                <div className="sm:col-span-2">
                  <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
                    <p className="font-medium text-amber-200">Whop plan not configured</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Add a Whop plan ID or hosted checkout URL to{" "}
                      <code className="text-sky-400">.env.local</code>:
                    </p>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-black/40 p-3 text-xs text-zinc-400">
                      {`NEXT_PUBLIC_WHOP_PLAN_${pkg.slug.toUpperCase().replace(/-/g, "_")}=plan_xxxxxxxx\n# or for sandbox redirect:\nNEXT_PUBLIC_WHOP_CHECKOUT_URL_${pkg.slug.toUpperCase().replace(/-/g, "_")}=https://sandbox.whop.com/...`}
                    </pre>
                    <button
                      type="button"
                      onClick={() => startRedirect(() => router.push("/contact"))}
                      className="mt-4 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-sky-400"
                    >
                      {isRedirecting ? "Opening..." : "Contact us to purchase"}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {showPayment && planId ? (
              <div ref={paymentRef} className="mt-8 border-t border-white/10 pt-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                  Complete payment
                </p>
                <div className="mt-4">
                  <WhopCheckout
                    planId={planId}
                    returnUrl={returnUrl}
                    email={customerEmail}
                    sandbox={whopSandbox}
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="mt-4 text-sm font-bold text-zinc-500 transition hover:text-white"
                >
                  ← Edit details
                </button>
              </div>
            ) : null}
          </section>

          <OrderSummary pkg={pkg} />
        </div>
      </Container>
    </div>
  );
}

"use client";

import { WhopCheckoutEmbed } from "@whop/checkout/react";

type WhopCheckoutProps = {
  planId: string;
  returnUrl: string;
  email?: string;
};

export function WhopCheckout({ planId, returnUrl, email }: WhopCheckoutProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] min-h-[500px]">
      <WhopCheckoutEmbed
        planId={planId}
        returnUrl={returnUrl}
        theme="dark"
        prefill={email ? { email } : undefined}
        onPaymentError={(error) => {
          console.error("Whop payment error:", error);
        }}
      />
    </div>
  );
}

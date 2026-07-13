"use client";

import { WhopCheckoutEmbed } from "@whop/checkout/react";

type WhopCheckoutProps = {
  planId: string;
  returnUrl: string;
  email?: string;
  sandbox?: boolean;
  onPaymentComplete?: () => void;
};

export function WhopCheckout({
  planId,
  returnUrl,
  email,
  sandbox = false,
  onPaymentComplete,
}: WhopCheckoutProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] min-h-[500px]">
      <WhopCheckoutEmbed
        planId={planId}
        returnUrl={returnUrl}
        theme="dark"
        environment={sandbox ? "sandbox" : "production"}
        prefill={email ? { email } : undefined}
        onComplete={() => {
          onPaymentComplete?.();
        }}
        onPaymentError={(error) => {
          console.error("Whop payment error:", error);
        }}
      />
    </div>
  );
}

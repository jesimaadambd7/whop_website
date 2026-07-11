import type { Metadata } from "next";
import { Suspense } from "react";
import { CreatorAuthLayout } from "@/components/creators/CreatorAuthLayout";
import { CreatorLoginForm } from "@/components/creators/CreatorLoginForm";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Creator Login",
  description: siteConfig.description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function CreatorLoginPage() {
  return (
    <CreatorAuthLayout
      eyebrow="Creator login"
      title="Your work, resources, leads, and analytics."
      description="Manage your portfolio from one focused dashboard without maintaining another website or paying a recurring VidCarry platform fee."
    >
      <Suspense fallback={<p className="text-sm text-zinc-500">Loading login...</p>}>
        <CreatorLoginForm />
      </Suspense>
    </CreatorAuthLayout>
  );
}

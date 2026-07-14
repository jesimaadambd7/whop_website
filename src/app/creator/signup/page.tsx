import type { Metadata } from "next";
import { CreatorAuthLayout } from "@/components/creators/CreatorAuthLayout";
import { CreatorSignupForm } from "@/components/creators/CreatorSignupForm";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Create Creator Portfolio Account",
  description: siteConfig.description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function CreatorSignupPage() {
  return (
    <CreatorAuthLayout
      eyebrow="Creator account"
      title="Build a portfolio clients remember."
      description="One account gives you premium portfolio hosting, creator analytics, an inquiry inbox, directory discovery, and lifetime access to UGCViss resources."
    >
      <CreatorSignupForm />
    </CreatorAuthLayout>
  );
}

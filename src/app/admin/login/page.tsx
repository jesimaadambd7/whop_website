import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminEmails } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const allowlistCount = getAdminEmails().length;

  return (
    <main className="min-h-screen bg-black px-5 py-24 text-white sm:px-8 lg:px-12">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-sky-300">
            VidCarry admin
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            Submission inbox, replies, and lead review.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
            Sign in with an approved VidCarry admin email. From here, the team can review
            submissions, change status, and reply by email.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-zinc-600">
            Allowlist configured for {allowlistCount} admin email
            {allowlistCount === 1 ? "" : "s"}
          </p>
          <p className="mt-8 text-sm text-zinc-500">
            <Link href="/" className="transition hover:text-sky-300">
              ← Back to site
            </Link>
          </p>
        </div>

        <Suspense fallback={<div className="h-80 rounded-[2rem] border border-white/10 bg-white/[0.03]" />}>
          <AdminLoginForm />
        </Suspense>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PendingSubmitButton } from "@/components/checkout/PendingSubmitButton";
import {
  creatorAuthInputClass,
  creatorAuthLabelClass,
} from "@/components/creators/creator-auth-styles";

export function CreatorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    setPending(true);
    try {
      const response = await fetch("/api/creators/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to sign in.");
      }

      const next = searchParams.get("next") || "/creator/dashboard";
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <h2 className="font-display text-3xl font-black tracking-[-0.045em]">Welcome back</h2>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
        <div>
          <label htmlFor="email" className={creatorAuthLabelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={creatorAuthInputClass}
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="password" className={creatorAuthLabelClass}>
              Password
            </label>
            <Link
              href="/creator/forgot-password"
              className="text-xs font-bold text-sky-300 transition hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={creatorAuthInputClass}
          />
        </div>

        {error && (
          <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <PendingSubmitButton
          pending={pending}
          pendingLabel="Logging in..."
          className="w-full uppercase tracking-[0.18em]"
        >
          Log in
        </PendingSubmitButton>
      </form>

      <p className="mt-6 text-sm text-zinc-500">
        Need a portfolio?{" "}
        <Link href="/creator/signup" className="font-bold text-sky-300">
          Create account
        </Link>
      </p>
    </>
  );
}

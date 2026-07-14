"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PendingSubmitButton } from "@/components/checkout/PendingSubmitButton";
import { CreatorSignupSuccess } from "@/components/creators/CreatorSignupSuccess";
import {
  creatorAuthInputClass,
  creatorAuthLabelClass,
} from "@/components/creators/creator-auth-styles";
import { isValidCreatorPassword } from "@/lib/admin/creator-auth";

export function CreatorSignupForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const prefersReducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") ?? "");

    if (!isValidCreatorPassword(password)) {
      setError("Password must be 10+ characters with uppercase, lowercase, and a number.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/creators/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: String(data.get("displayName") ?? ""),
          username: String(data.get("username") ?? ""),
          email: String(data.get("email") ?? ""),
          password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to create account right now.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <CreatorSignupSuccess key="success" />
      ) : (
        <motion.div
          key="form"
          initial={false}
          exit={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, scale: 0.98, y: -16, filter: "blur(4px)" }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl font-black tracking-[-0.045em]">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
        <div>
          <label htmlFor="displayName" className={creatorAuthLabelClass}>
            Full name
          </label>
          <input
            id="displayName"
            name="displayName"
            required
            minLength={2}
            className={creatorAuthInputClass}
          />
        </div>

        <div>
          <label htmlFor="username" className={creatorAuthLabelClass}>
            Portfolio username
          </label>
          <div className="mt-2 flex overflow-hidden rounded-2xl border border-white/10 bg-black/55 focus-within:border-sky-300">
            <span className="grid place-items-center border-r border-white/10 px-4 text-sm font-bold text-zinc-600">
              ugcviss.com/creators/
            </span>
            <input
              id="username"
              name="username"
              required
              minLength={3}
              pattern="[a-zA-Z0-9-]+"
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={creatorAuthLabelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={creatorAuthInputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={creatorAuthLabelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={10}
            className={creatorAuthInputClass}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            10+ characters with uppercase, lowercase and a number.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-zinc-400">
          <input
            name="acceptedTerms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-sky-400"
          />
          <span>
            I accept the{" "}
            <Link href="/terms-conditions" className="text-sky-300">
              terms
            </Link>
            , privacy policy, creator content rules, and confirm I own the work I upload.
          </span>
        </label>

        {error && (
          <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

            <PendingSubmitButton
              pending={pending}
              pendingLabel="Creating account..."
              className="w-full uppercase tracking-[0.18em]"
            >
              Create account
            </PendingSubmitButton>
          </form>

          <p className="mt-6 text-sm text-zinc-500">
            Already registered?{" "}
            <Link href="/creator/login" className="font-bold text-sky-300">
              Log in
            </Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

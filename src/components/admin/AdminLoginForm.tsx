"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const inputClass =
  "mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid admin email or password.");
        return;
      }

      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admin-email" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
            Admin email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@vidcarry.com"
            className={inputClass}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="admin-password" className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            className={inputClass}
          />
        </div>

        {error && <p className="mt-4 text-sm font-semibold text-rose-300">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full border border-sky-400 bg-sky-400 px-6 py-4 text-sm font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

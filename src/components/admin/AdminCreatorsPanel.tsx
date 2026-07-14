"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AdminConfirmModal,
  type AdminConfirmRequest,
} from "@/components/admin/AdminConfirmModal";
import { AdminSuccessModal } from "@/components/admin/AdminSuccessModal";
import type {
  CreatorAccountAdmin,
  CreatorStats,
  CreatorStatus,
} from "@/lib/admin/creator-types";
import { CREATOR_STATUSES } from "@/lib/admin/creator-types";
import { cn } from "@/lib/utils";

type Props = {
  initialCreators: CreatorAccountAdmin[];
  stats: CreatorStats;
  activeStatus: CreatorStatus | "";
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-white outline-none focus:border-sky-300";

function statusClasses(status: CreatorStatus) {
  if (status === "pending") return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  if (status === "approved") return "border-emerald-300/30 bg-emerald-300/10 text-emerald-100";
  return "border-red-300/30 bg-red-400/10 text-red-200";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminCreatorsPanel({ initialCreators, stats, activeStatus }: Props) {
  const router = useRouter();
  const [creators, setCreators] = useState(initialCreators);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const [passwordDrafts, setPasswordDrafts] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState<AdminConfirmRequest | null>(null);
  const [pending, startTransition] = useTransition();

  function runAction(action: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  async function updateStatus(creator: CreatorAccountAdmin, status: CreatorStatus) {
    const response = await fetch(`/api/admin/creators/${creator.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not update creator.");
    }

    setCreators((current) => {
      const next = current.map((item) => (item.id === creator.id ? data.creator : item));
      return activeStatus ? next.filter((item) => item.status === activeStatus) : next;
    });
    setSuccess({
      title: status === "approved" ? "Creator approved." : "Creator rejected.",
      description: `${creator.displayName} is now marked as ${status}.`,
    });
  }

  async function updatePassword(creator: CreatorAccountAdmin) {
    const password = passwordDrafts[creator.id] ?? creator.password;
    if (!password.trim()) {
      throw new Error("Enter a password.");
    }

    const response = await fetch(`/api/admin/creators/${creator.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not update password.");
    }

    setCreators((current) =>
      current.map((item) => (item.id === creator.id ? data.creator : item)),
    );
    setPasswordDrafts((current) => {
      const next = { ...current };
      delete next[creator.id];
      return next;
    });
    setSuccess({
      title: "Password updated.",
      description: `Saved a new password for ${creator.displayName}.`,
    });
  }

  return (
    <>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
        Creator operations
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-display text-5xl font-black tracking-[-0.06em]">
            Creator approval
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Review new creator signups, approve portfolios for launch, reject low-fit accounts,
            and remove test profiles.
          </p>
        </div>
        <Link
          href="/creator-portfolios"
          target="_blank"
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
        >
          View public page
        </Link>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Pending", value: stats.pending, href: "/admin/creators?status=pending" },
          { label: "Approved", value: stats.approved, href: "/admin/creators?status=approved" },
          { label: "Rejected", value: stats.rejected, href: "/admin/creators?status=rejected" },
          { label: "Total", value: stats.total, href: "/admin/creators" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-400/30"
          >
            <p className="text-3xl font-black text-white">{item.value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/admin/creators"
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition",
            !activeStatus
              ? "border-sky-300 bg-sky-300 text-black"
              : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-sky-300/50 hover:text-white",
          )}
        >
          All
        </Link>
        {CREATOR_STATUSES.map((status) => (
          <Link
            key={status}
            href={`/admin/creators?status=${status}`}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition",
              activeStatus === status
                ? "border-sky-300 bg-sky-300 text-black"
                : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-sky-300/50 hover:text-white",
            )}
          >
            {status}
          </Link>
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <section className="mt-8 grid gap-4">
        {creators.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
            <p className="text-lg font-bold text-white">No creator accounts in this view.</p>
            <p className="mt-2 text-sm text-zinc-500">
              New signups from `/creator/signup` appear here automatically as pending approvals.
            </p>
          </div>
        ) : (
          creators.map((creator) => (
            <article
              key={creator.id}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]",
                        statusClasses(creator.status),
                      )}
                    >
                      {creator.status}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-white">
                    {creator.displayName}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">{creator.email}</p>
                  <p className="mt-1 text-sm text-sky-300">
                    ugcviss.com/creators/{creator.username}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-zinc-600">
                    Submitted {formatDate(creator.createdAt)}
                  </p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      Password
                    </p>
                    <p className="mt-2 font-mono text-sm text-zinc-200">
                      {creator.password || "Not stored yet"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {creator.status !== "approved" ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        runAction(() => updateStatus(creator, "approved"))
                      }
                      className="rounded-full bg-emerald-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black disabled:opacity-60"
                    >
                      Approve
                    </button>
                  ) : null}
                  {creator.status !== "rejected" ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        runAction(() => updateStatus(creator, "rejected"))
                      }
                      className="rounded-full border border-red-300/30 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-200 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  ) : null}
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      setConfirm({
                        title: "Delete creator account",
                        description: `Remove ${creator.displayName} (@${creator.username}) permanently? This cannot be undone.`,
                        confirmLabel: "Delete account",
                        onConfirm: async () => {
                          const response = await fetch(`/api/admin/creators/${creator.id}`, {
                            method: "DELETE",
                          });
                          const data = await response.json();
                          if (!response.ok) {
                            throw new Error(data.error || "Could not delete creator.");
                          }
                          setCreators((current) =>
                            current.filter((item) => item.id !== creator.id),
                          );
                          setSuccess({
                            title: "Creator deleted.",
                            description: `${creator.displayName} was removed from the approval queue.`,
                          });
                        },
                      })
                    }
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-red-300/40 hover:text-red-200 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <form
                className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_auto]"
                onSubmit={(event) => {
                  event.preventDefault();
                  runAction(() => updatePassword(creator));
                }}
              >
                <label className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Change password
                  <input
                    type="text"
                    value={passwordDrafts[creator.id] ?? creator.password}
                    onChange={(event) =>
                      setPasswordDrafts((current) => ({
                        ...current,
                        [creator.id]: event.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="New password"
                  />
                </label>
                <button
                  type="submit"
                  disabled={pending}
                  className="self-end rounded-full bg-sky-400 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black disabled:opacity-60"
                >
                  Save password
                </button>
              </form>
            </article>
          ))
        )}
      </section>

      <AdminConfirmModal
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.confirmLabel}
        pending={pending}
        onConfirm={() => {
          if (!confirm) return;
          runAction(async () => {
            await confirm.onConfirm();
            setConfirm(null);
          });
        }}
        onCancel={() => {
          if (!pending) setConfirm(null);
        }}
      />

      <AdminSuccessModal
        open={!!success}
        title={success?.title ?? ""}
        description={success?.description}
        onClose={() => setSuccess(null)}
      />
    </>
  );
}

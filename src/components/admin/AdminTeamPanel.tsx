"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AdminConfirmModal,
  type AdminConfirmRequest,
} from "@/components/admin/AdminConfirmModal";
import type { AdminTeamMember } from "@/lib/admin/team-types";
import { TEAM_ROLE_OPTIONS } from "@/lib/admin/team-types";
import { slugifyName, sortOrderOptions } from "@/lib/admin/team-utils";

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-sky-300";
const labelClass = "text-xs font-black uppercase tracking-[0.2em] text-zinc-500";

type Props = {
  initialMembers: AdminTeamMember[];
};

async function submitTeamForm(url: string, method: "POST" | "PUT", form: FormData) {
  const response = await fetch(url, { method, body: form, credentials: "same-origin" });
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as { error?: string; member?: AdminTeamMember }) : {};
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  if (!data.member) {
    throw new Error("Invalid response.");
  }
  return { member: data.member };
}

export function AdminTeamPanel({ initialMembers }: Props) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<AdminConfirmRequest | null>(null);
  const [pending, startTransition] = useTransition();
  const sortOptions = useMemo(() => sortOrderOptions(), []);

  function runAction(action: () => Promise<void>) {
    setMessage(null);
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

  return (
    <>
      {(message || error) && (
        <div
          className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
            error
              ? "border-red-400/30 bg-red-400/10 text-red-200"
              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <details className="rounded-[2rem] border border-sky-400/20 bg-sky-400/[0.04] p-4">
          <summary className="cursor-pointer list-none rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 transition hover:border-sky-300/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                  New team member
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  Create team profile
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Expand when you want to add someone to the public team section.
                </p>
              </div>
              <span className="rounded-full bg-sky-400 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
                Create
              </span>
            </div>
          </summary>
          <div className="mt-4">
            <TeamProfileForm
              mode="create"
              sortOptions={sortOptions}
              pending={pending}
              onSubmit={(form) =>
                runAction(async () => {
                  const result = await submitTeamForm("/api/admin/team", "POST", form);
                  setMembers((current) =>
                    [...current, result.member].sort((a, b) => a.sortOrder - b.sortOrder),
                  );
                  setMessage(`Created ${result.member.name}.`);
                })
              }
            />
          </div>
        </details>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {members.map((member) => (
            <TeamPreviewCard
              key={member.id}
              member={member}
              pending={pending}
              onDeleteRequest={() =>
                setConfirm({
                  title: "Delete team profile",
                  description: `Remove ${member.name} from the public team section? This action cannot be undone.`,
                  confirmLabel: "Delete profile",
                  onConfirm: async () => {
                    const response = await fetch(`/api/admin/team/${member.id}`, {
                      method: "DELETE",
                    });
                    const raw = await response.text();
                    const data = raw ? JSON.parse(raw) : {};
                    if (!response.ok) {
                      throw new Error(data.error || "Could not delete profile.");
                    }
                    setMembers((current) => current.filter((item) => item.id !== member.id));
                    setMessage(`Deleted ${member.name}.`);
                  },
                })
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em]">Quick edit profiles</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Profiles are collapsed by default so the page stays manageable.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
            {members.length} profile{members.length === 1 ? "" : "s"}
          </span>
        </div>

        {members.map((member) => (
          <details
            key={`edit-${member.id}`}
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4"
          >
            <summary className="cursor-pointer list-none rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 transition hover:border-sky-300/40">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                    {member.role} / {member.status}
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{member.slug}</p>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
                  Edit
                </span>
              </div>
            </summary>
            <div className="mt-4">
              <TeamProfileForm
                mode="edit"
                member={member}
                sortOptions={sortOptions}
                pending={pending}
                onSubmit={(form) =>
                  runAction(async () => {
                    const result = await submitTeamForm(
                      `/api/admin/team/${member.id}`,
                      "PUT",
                      form,
                    );
                    setMembers((current) =>
                      current
                        .map((item) => (item.id === member.id ? result.member : item))
                        .sort((a, b) => a.sortOrder - b.sortOrder),
                    );
                    setMessage(`Saved ${result.member.name}.`);
                  })
                }
              />
            </div>
          </details>
        ))}
      </div>

      <AdminConfirmModal
        open={!!confirm}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.confirmLabel}
        pending={pending}
        onCancel={() => {
          if (!pending) setConfirm(null);
        }}
        onConfirm={() => {
          if (!confirm) return;
          const action = confirm.onConfirm;
          runAction(async () => {
            await action();
            setConfirm(null);
          });
        }}
      />
    </>
  );
}

function TeamPreviewCard({
  member,
  pending,
  onDeleteRequest,
}: {
  member: AdminTeamMember;
  pending: boolean;
  onDeleteRequest: () => void;
}) {
  const publicHref = member.profileHref || `/team/${member.slug}`;

  return (
    <article className="rounded-[1.65rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-sky-300/35 hover:bg-white/[0.055]">
      <div className="flex gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-sky-400/10">
          {member.image ? (
            <img alt="" className="h-full w-full object-cover" src={member.image} />
          ) : (
            <div className="grid h-full place-items-center font-display text-lg font-black text-sky-100">
              {member.initials || member.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
            {member.status}
          </p>
          <h3 className="mt-1 truncate text-lg font-black tracking-[-0.03em] text-white">
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{member.role}</p>
          <a
            className="mt-2 inline-flex text-xs font-black uppercase tracking-[0.16em] text-sky-300 hover:text-white"
            href={publicHref}
            target="_blank"
            rel="noreferrer"
          >
            View public
          </a>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 min-h-16 text-sm leading-6 text-zinc-500">{member.bio}</p>
      <button
        type="button"
        disabled={pending}
        onClick={onDeleteRequest}
        className="mt-4 rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-black text-red-100 hover:bg-red-500/10 disabled:opacity-60"
      >
        Delete
      </button>
    </article>
  );
}

function TeamProfileForm({
  mode,
  member,
  sortOptions,
  pending,
  onSubmit,
}: {
  mode: "create" | "edit";
  member?: AdminTeamMember;
  sortOptions: { value: number; label: string }[];
  pending: boolean;
  onSubmit: (form: FormData) => void;
}) {
  const [name, setName] = useState(member?.name ?? "");
  const [slug, setSlug] = useState(member?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <input type="hidden" name="id" value={member?.id ?? ""} />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em] text-white">
            {mode === "create" ? "Create team profile" : "Edit team profile"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Control names, roles, bios, LinkedIn, X/Twitter, profile links, and photos from backend.
            New profiles publish by default.
          </p>
        </div>
        {member && (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
            {member.status}
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`name-${mode}-${member?.id ?? "new"}`}>
            Name
          </label>
          <input
            id={`name-${mode}-${member?.id ?? "new"}`}
            required
            className={inputClass}
            name="name"
            value={name}
            onChange={(event) => {
              const nextName = event.target.value;
              setName(nextName);
              if (!slugTouched && mode === "create") {
                setSlug(slugifyName(nextName));
              }
            }}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`slug-${mode}-${member?.id ?? "new"}`}>
            Slug
          </label>
          <input
            id={`slug-${mode}-${member?.id ?? "new"}`}
            placeholder="team-member-name"
            className={inputClass}
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Auto-generated from the name and used for /team/slug.
          </p>
        </div>
        <div>
          <label className={labelClass} htmlFor={`role-${mode}-${member?.id ?? "new"}`}>
            Role
          </label>
          <select
            id={`role-${mode}-${member?.id ?? "new"}`}
            name="role"
            className={inputClass}
            defaultValue={member?.role ?? "Video Editor"}
          >
            {TEAM_ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Initials</label>
          <input
            placeholder="Auto if blank"
            className={inputClass}
            name="initials"
            defaultValue={member?.initials ?? ""}
          />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            name="status"
            className={inputClass}
            defaultValue={member?.status ?? "published"}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input
            className={inputClass}
            name="linkedin"
            placeholder="https://www.linkedin.com/in/..."
            defaultValue={member?.linkedin ?? ""}
          />
        </div>
        <div>
          <label className={labelClass}>X / Twitter</label>
          <input
            className={inputClass}
            name="twitter"
            placeholder="https://x.com/..."
            defaultValue={member?.twitter ?? ""}
          />
        </div>
        <div>
          <label className={labelClass}>Profile link override</label>
          <input
            placeholder="Leave blank for /team/slug"
            className={inputClass}
            name="profileHref"
            defaultValue={member?.profileHref ?? ""}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Leave blank for the automatic profile page. Use only for a custom journey page
            like /team/neaz-mahmud.
          </p>
        </div>
        <div>
          <label className={labelClass} htmlFor={`sort-${mode}-${member?.id ?? "new"}`}>
            Sort order
          </label>
          <select
            id={`sort-${mode}-${member?.id ?? "new"}`}
            name="sortOrder"
            className={inputClass}
            defaultValue={member?.sortOrder ?? 0}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Profile image</label>
          <input
            accept="image/png,image/jpeg,image/webp"
            className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-sky-400 file:px-4 file:py-2 file:text-sm file:font-black file:text-black`}
            type="file"
            name="image"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>Bio</label>
        <textarea
          name="bio"
          rows={4}
          className={inputClass}
          defaultValue={member?.bio ?? ""}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 rounded-full bg-sky-400 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black hover:bg-white disabled:opacity-60"
      >
        Save profile
      </button>
    </form>
  );
}

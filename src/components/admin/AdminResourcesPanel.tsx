"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AdminConfirmModal,
  type AdminConfirmRequest,
} from "@/components/admin/AdminConfirmModal";
import { AdminSuccessModal } from "@/components/admin/AdminSuccessModal";
import { arrayToLines } from "@/lib/admin/package-utils";
import type { AdminResource } from "@/lib/admin/resource-types";
import {
  RESOURCE_AUDIENCE_OPTIONS,
  RESOURCE_CATEGORY_OPTIONS,
  RESOURCE_CURRENCY_OPTIONS,
  RESOURCE_FORMAT_OPTIONS,
} from "@/lib/admin/resource-types";
import { slugifyName, sortOrderOptions } from "@/lib/admin/team-utils";

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none focus:border-sky-300";
const labelClass = "text-xs font-black uppercase tracking-[0.2em] text-zinc-500";
const fileInputClass = `${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-sky-400 file:px-4 file:py-2 file:text-sm file:font-black file:text-black`;

type Props = {
  initialResources: AdminResource[];
};

async function submitResourceForm(url: string, method: "POST" | "PUT", form: FormData) {
  const response = await fetch(url, { method, body: form, credentials: "same-origin" });
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as { error?: string; resource?: AdminResource }) : {};
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  if (!data.resource) {
    throw new Error("Invalid response.");
  }
  return { resource: data.resource };
}

function formatPrice(resource: AdminResource) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: resource.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(resource.price);
}

export function AdminResourcesPanel({ initialResources }: Props) {
  const router = useRouter();
  const [resources, setResources] = useState(initialResources);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const [confirm, setConfirm] = useState<AdminConfirmRequest | null>(null);
  const [expandedEditId, setExpandedEditId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const sortOptions = useMemo(() => sortOrderOptions(), []);

  function openResourceEditor(id: string) {
    setExpandedEditId(id);
    requestAnimationFrame(() => {
      document.getElementById(`edit-resource-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

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

  return (
    <>
      {error && (
        <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <details className="rounded-[2rem] border border-sky-400/20 bg-sky-400/[0.04] p-4" open>
          <summary className="cursor-pointer list-none rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 transition hover:border-sky-300/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                  New resource
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  Create locked resource
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Expand when you want to add a prompt pack, tutorial, deck, or file.
                </p>
              </div>
              <span className="rounded-full bg-sky-400 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
                Create
              </span>
            </div>
          </summary>
          <div className="mt-4">
            <ResourceForm
              mode="create"
              sortOptions={sortOptions}
              pending={pending}
              onSubmit={(form) =>
                runAction(async () => {
                  const result = await submitResourceForm("/api/admin/resources", "POST", form);
                  setResources((current) =>
                    [...current, result.resource].sort((a, b) => a.sortOrder - b.sortOrder),
                  );
                  setSuccess({
                    title: `Created ${result.resource.title}.`,
                    description: "Your resource is saved and ready to publish.",
                  });
                })
              }
            />
          </div>
        </details>

        <div className="space-y-4">
          {resources.map((resource) => (
            <ResourcePreviewCard
              key={resource.id}
              resource={resource}
              pending={pending}
              onEditRequest={() => openResourceEditor(resource.id)}
              onDeleteRequest={() =>
                setConfirm({
                  title: "Delete resource",
                  description: `Remove ${resource.title}? This action cannot be undone.`,
                  confirmLabel: "Delete resource",
                  onConfirm: async () => {
                    const response = await fetch(`/api/admin/resources/${resource.id}`, {
                      method: "DELETE",
                    });
                    const raw = await response.text();
                    const data = raw ? JSON.parse(raw) : {};
                    if (!response.ok) {
                      throw new Error(data.error || "Could not delete resource.");
                    }
                    setResources((current) => current.filter((item) => item.id !== resource.id));
                    if (expandedEditId === resource.id) {
                      setExpandedEditId(null);
                    }
                    setSuccess({ title: `Deleted ${resource.title}.` });
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
            <h2 className="text-3xl font-black tracking-[-0.04em]">Quick edit existing resources</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Long resource fields stay hidden until you expand one item.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
            {resources.length} item{resources.length === 1 ? "" : "s"}
          </span>
        </div>

        {resources.map((resource) => (
          <details
            key={`edit-${resource.id}`}
            id={`edit-resource-${resource.id}`}
            open={expandedEditId === resource.id}
            onToggle={(event) => {
              if (event.currentTarget.open) {
                setExpandedEditId(resource.id);
              } else if (expandedEditId === resource.id) {
                setExpandedEditId(null);
              }
            }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 scroll-mt-28"
          >
            <summary className="cursor-pointer list-none rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 transition hover:border-sky-300/40">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                    {resource.category} / {resource.status}
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {resource.slug} / {formatPrice(resource)}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
                  Edit
                </span>
              </div>
            </summary>
            <div className="mt-4">
              <ResourceForm
                mode="edit"
                resource={resource}
                sortOptions={sortOptions}
                pending={pending}
                onSubmit={(form) =>
                  runAction(async () => {
                    const result = await submitResourceForm(
                      `/api/admin/resources/${resource.id}`,
                      "PUT",
                      form,
                    );
                    setResources((current) =>
                      current
                        .map((item) => (item.id === resource.id ? result.resource : item))
                        .sort((a, b) => a.sortOrder - b.sortOrder),
                    );
                    setSuccess({
                      title: `Saved ${result.resource.title}.`,
                      description: "Your changes are live when the resource is published.",
                    });
                  })
                }
              />
            </div>
          </details>
        ))}
      </div>

      <AdminSuccessModal
        open={!!success}
        title={success?.title ?? ""}
        description={success?.description}
        onClose={() => setSuccess(null)}
      />

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

function ResourcePreviewCard({
  resource,
  pending,
  onEditRequest,
  onDeleteRequest,
}: {
  resource: AdminResource;
  pending: boolean;
  onEditRequest: () => void;
  onDeleteRequest: () => void;
}) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
            {resource.category} / {resource.status}
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">{resource.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">{resource.slug}</p>
        </div>
        <p className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-black text-sky-100">
          {formatPrice(resource)}
        </p>
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{resource.benefit}</p>
      {resource.thumbnail && (
        <img
          alt=""
          className="mt-4 aspect-video w-full rounded-2xl border border-white/10 object-cover"
          src={resource.thumbnail}
        />
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white hover:border-sky-300/50"
          href={`/resources/${resource.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          View details
        </Link>
        <button
          type="button"
          disabled={pending}
          onClick={onEditRequest}
          className="rounded-full border border-sky-400/30 px-4 py-2 text-sm font-black text-sky-100 hover:bg-sky-400/10 disabled:opacity-60"
        >
          Edit
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={onDeleteRequest}
          className="rounded-full border border-red-400/30 px-4 py-2 text-sm font-black text-red-100 hover:bg-red-500/10 disabled:opacity-60"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

function ResourceForm({
  mode,
  resource,
  sortOptions,
  pending,
  onSubmit,
}: {
  mode: "create" | "edit";
  resource?: AdminResource;
  sortOptions: { value: number; label: string }[];
  pending: boolean;
  onSubmit: (form: FormData) => void;
}) {
  const formId = resource?.id ?? "new";
  const [title, setTitle] = useState(resource?.title ?? "");
  const [slug, setSlug] = useState(resource?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
    >
      <input type="hidden" name="id" value={resource?.id ?? ""} />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em] text-white">
            {mode === "create" ? "Create locked resource" : "Edit resource"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Upload prompts, tutorials, research, decks, portfolio packs, AI workflows, thumbnails,
            and paid downloads.
          </p>
        </div>
        {resource && (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
            {resource.status}
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`title-${formId}`}>
            Title
          </label>
          <input
            id={`title-${formId}`}
            required
            className={inputClass}
            name="title"
            value={title}
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (!slugTouched && mode === "create") {
                setSlug(slugifyName(nextTitle));
              }
            }}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`slug-${formId}`}>
            Slug
          </label>
          <input
            id={`slug-${formId}`}
            placeholder="100-ai-ugc-prompts"
            className={inputClass}
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Auto-generated from the title. You can still edit it if needed.
          </p>
        </div>
        <div>
          <label className={labelClass} htmlFor={`category-${formId}`}>
            Category
          </label>
          <select
            id={`category-${formId}`}
            name="category"
            className={inputClass}
            defaultValue={resource?.category ?? "AI UGC"}
          >
            {RESOURCE_CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor={`format-${formId}`}>
            Format
          </label>
          <select
            id={`format-${formId}`}
            name="format"
            className={inputClass}
            defaultValue={resource?.format ?? "Prompt pack"}
          >
            {RESOURCE_FORMAT_OPTIONS.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor={`price-${formId}`}>
            Price
          </label>
          <input
            id={`price-${formId}`}
            min={0}
            step={1}
            type="number"
            className={inputClass}
            name="price"
            defaultValue={resource?.price ?? 49}
            autoComplete="off"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`currency-${formId}`}>
            Currency
          </label>
          <select
            id={`currency-${formId}`}
            name="currency"
            className={inputClass}
            defaultValue={resource?.currency ?? "usd"}
          >
            {RESOURCE_CURRENCY_OPTIONS.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor={`status-${formId}`}>
            Status
          </label>
          <select
            id={`status-${formId}`}
            name="status"
            className={inputClass}
            defaultValue={resource?.status ?? "draft"}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor={`sort-${formId}`}>
            Sort order
          </label>
          <select
            id={`sort-${formId}`}
            name="sortOrder"
            className={inputClass}
            defaultValue={resource?.sortOrder ?? 0}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label className={labelClass} htmlFor={`audience-${formId}`}>
            Audience
          </label>
          <select
            multiple
            id={`audience-${formId}`}
            name="audience"
            className={`${inputClass} min-h-36`}
            defaultValue={resource?.audience ?? ["Editors", "Creative strategists", "Designers", "AI video creators"]}
          >
            {RESOURCE_AUDIENCE_OPTIONS.map((audience) => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs leading-5 text-zinc-600">
            Hold Ctrl or Cmd to select multiple audience groups.
          </p>
        </div>
        <div>
          <label className={labelClass} htmlFor={`benefit-${formId}`}>
            Why it helps
          </label>
          <textarea
            id={`benefit-${formId}`}
            name="benefit"
            rows={3}
            className={inputClass}
            defaultValue={resource?.benefit ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`description-${formId}`}>
            Description
          </label>
          <textarea
            id={`description-${formId}`}
            name="description"
            rows={4}
            className={inputClass}
            defaultValue={resource?.description ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`detail-intro-${formId}`}>
            Details page intro
          </label>
          <textarea
            id={`detail-intro-${formId}`}
            name="detailIntro"
            rows={4}
            placeholder="Longer product-style intro for the resource detail page."
            className={inputClass}
            defaultValue={resource?.detailIntro ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`purchase-reason-${formId}`}>
            Why someone should buy
          </label>
          <textarea
            id={`purchase-reason-${formId}`}
            name="purchaseReason"
            rows={4}
            placeholder="Explain the outcome, time saved, and why this is worth paying for."
            className={inputClass}
            defaultValue={resource?.purchaseReason ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`benefits-${formId}`}>
            Benefits, one per line
          </label>
          <textarea
            id={`benefits-${formId}`}
            name="benefits"
            rows={5}
            placeholder={"Cut scripting time\nBuild stronger hooks\nShip more ad variants"}
            className={inputClass}
            defaultValue={arrayToLines(resource?.benefits ?? [])}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`included-items-${formId}`}>
            What is included, one per line
          </label>
          <textarea
            id={`included-items-${formId}`}
            name="includedItems"
            rows={5}
            placeholder={"Prompt library\nCreative checklist\nImplementation guide"}
            className={inputClass}
            defaultValue={arrayToLines(resource?.includedItems ?? [])}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`social-post-angle-${formId}`}>
            Social post angle
          </label>
          <textarea
            id={`social-post-angle-${formId}`}
            name="socialPostAngle"
            rows={3}
            placeholder="Short pitch angle for social media promotion."
            className={inputClass}
            defaultValue={resource?.socialPostAngle ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`preview-${formId}`}>
            Preview content
          </label>
          <textarea
            id={`preview-${formId}`}
            name="previewContent"
            rows={4}
            className={inputClass}
            defaultValue={resource?.previewContent ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`locked-${formId}`}>
            Locked content
          </label>
          <textarea
            id={`locked-${formId}`}
            name="lockedContent"
            rows={7}
            placeholder="Paid text content users can download if no file is uploaded yet."
            className={inputClass}
            defaultValue={resource?.lockedContent ?? ""}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`thumbnail-${formId}`}>
            Thumbnail image
          </label>
          <input
            id={`thumbnail-${formId}`}
            accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
            className={fileInputClass}
            type="file"
            name="thumbnail"
          />
          {resource?.thumbnail && (
            <img
              alt=""
              className="mt-3 aspect-video w-full max-w-sm rounded-2xl border border-white/10 object-cover"
              src={resource.thumbnail}
            />
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor={`file-${formId}`}>
            Locked download file
          </label>
          <input id={`file-${formId}`} className={fileInputClass} type="file" name="file" />
          {resource?.filePath && (
            <p className="mt-2 text-sm text-zinc-500">
              Current file:{" "}
              <a className="text-sky-300 hover:text-white" href={resource.filePath}>
                {resource.filePath}
              </a>
            </p>
          )}
        </div>
      </div>

      <label className="mt-5 flex items-center gap-3 text-sm font-bold text-zinc-300">
        <input
          className="h-4 w-4 accent-sky-400"
          type="checkbox"
          name="isPaid"
          defaultChecked={resource?.isPaid ?? true}
        />
        Lock this resource behind payment
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sky-400 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-black hover:bg-white disabled:opacity-60"
        >
          Save resource
        </button>
      </div>
    </form>
  );
}

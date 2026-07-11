"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AdminConfirmModal,
  type AdminConfirmRequest,
} from "@/components/admin/AdminConfirmModal";
import { AdminSuccessModal } from "@/components/admin/AdminSuccessModal";
import type {
  AdminPackage,
  CreatorPricing,
  PackageStoreData,
} from "@/lib/admin/package-types";
import {
  arrayToLines,
  formatMoney,
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
} from "@/lib/admin/package-utils";
import { isCreatorOfferActive } from "@/lib/admin/creator-pricing-utils";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white";
const labelClass =
  "text-xs font-black uppercase tracking-[0.14em] text-zinc-500";

type Props = {
  initialStore: PackageStoreData;
};

async function postJson(url: string, body: Record<string, unknown>) {
  const method =
    body.method === "DELETE" ? "DELETE" : body.method === "PUT" ? "PUT" : "POST";
  const { method: _method, ...payload } = body;
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

export function AdminPackagesPanel({ initialStore }: Props) {
  const router = useRouter();
  const [store, setStore] = useState(initialStore);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const [confirm, setConfirm] = useState<AdminConfirmRequest | null>(null);
  const [pending, startTransition] = useTransition();

  const creatorPublicPrice = useMemo(() => {
    const active = isCreatorOfferActive(store.creatorPricing);
    return active
      ? store.creatorPricing.offerPrice
      : store.creatorPricing.regularPrice;
  }, [store.creatorPricing]);

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
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <section className="mt-8 rounded-[2rem] border border-sky-400/20 bg-sky-400/[0.05] p-6 sm:p-8">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
              Creator Portfolio plan
            </p>
            <h2 className="mt-3 font-display text-3xl font-black">
              Public price: {formatMoney(creatorPublicPrice, store.creatorPricing.currency)}
            </h2>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black">
            {isCreatorOfferActive(store.creatorPricing) ? "Offer active" : "Regular price"}
          </span>
        </div>

        <form
          className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            runAction(async () => {
              const result = await postJson("/api/admin/creator-pricing", {
                method: "PUT",
                regularPrice: Number(form.get("regularPrice")),
                offerPrice: Number(form.get("offerPrice")),
                offerStarts: fromDatetimeLocalValue(String(form.get("offerStarts") ?? "")),
                offerEnds: fromDatetimeLocalValue(String(form.get("offerEnds") ?? "")),
                currency: String(form.get("currency") ?? "usd"),
                ctaLabel: String(form.get("ctaLabel") ?? ""),
                available: form.get("available") === "on",
                features: String(form.get("features") ?? ""),
              });
              setStore((current) => ({ ...current, creatorPricing: result.pricing }));
              setSuccess({ title: "Creator pricing saved." });
            });
          }}
        >
          <label className={labelClass}>
            Regular price
            <input
              step="0.01"
              className={inputClass}
              type="number"
              name="regularPrice"
              defaultValue={store.creatorPricing.regularPrice}
            />
          </label>
          <label className={labelClass}>
            Offer price
            <input
              step="0.01"
              className={inputClass}
              type="number"
              name="offerPrice"
              defaultValue={store.creatorPricing.offerPrice}
            />
          </label>
          <label className={labelClass}>
            Offer starts
            <input
              className={inputClass}
              type="datetime-local"
              name="offerStarts"
              defaultValue={toDatetimeLocalValue(store.creatorPricing.offerStarts)}
            />
          </label>
          <label className={labelClass}>
            Offer ends
            <input
              className={inputClass}
              type="datetime-local"
              name="offerEnds"
              defaultValue={toDatetimeLocalValue(store.creatorPricing.offerEnds)}
            />
          </label>
          <label className={labelClass}>
            Currency
            <select name="currency" className={inputClass} defaultValue={store.creatorPricing.currency}>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="cad">CAD</option>
            </select>
          </label>
          <label className={labelClass}>
            CTA label
            <input
              className={inputClass}
              name="ctaLabel"
              defaultValue={store.creatorPricing.ctaLabel}
            />
          </label>
          <label className="flex items-center gap-3 text-sm sm:col-span-2">
            <input
              type="checkbox"
              name="available"
              defaultChecked={store.creatorPricing.available}
            />
            Available for purchase
          </label>
          <label className={`${labelClass} sm:col-span-2 xl:col-span-4`}>
            Features, one per line
            <textarea
              name="features"
              rows={7}
              className={inputClass}
              defaultValue={arrayToLines(store.creatorPricing.features)}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-sky-400 px-5 py-3 font-black text-black sm:col-span-2 xl:col-span-4 disabled:opacity-60"
          >
            Save creator pricing
          </button>
        </form>
      </section>

      <details className="mt-8 rounded-[2rem] border border-dashed border-sky-400/30 bg-sky-400/[0.04] p-6">
        <summary className="cursor-pointer font-display text-2xl font-black">
          Create a new package
        </summary>
        <form
          className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            runAction(async () => {
              const result = await postJson("/api/admin/packages", Object.fromEntries(form));
              setStore((current) => ({
                ...current,
                packages: [...current.packages, result.package],
              }));
              setSuccess({
                title: `Created ${result.package.title}.`,
                description: "Your changes are live on the public site.",
              });
              event.currentTarget.reset();
            });
          }}
        >
          <input required placeholder="Package title" className={inputClass} name="title" />
          <input required placeholder="package-slug" className={inputClass} name="slug" />
          <input placeholder="Eyebrow" className={inputClass} name="eyebrow" />
          <input placeholder="Thumbnail label" className={inputClass} name="thumbnailLabel" />
          <input placeholder="Best for" className={inputClass} name="bestFor" />
          <input placeholder="Timeline label" className={inputClass} name="timelineLabel" />
          <input
            className={inputClass}
            defaultValue="linear-gradient(135deg,#001b2c,#00a8ff)"
            name="thumbnailGradient"
          />
          <select name="status" className={inputClass} defaultValue="draft">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <textarea
            name="summary"
            required
            placeholder="Public summary"
            className={`${inputClass} sm:col-span-2 xl:col-span-4`}
          />
          <textarea
            name="deliverables"
            placeholder="Deliverables, one per line"
            className={`${inputClass} sm:col-span-2`}
          />
          <textarea
            name="includedItems"
            placeholder="Included items, one per line"
            className={`${inputClass} sm:col-span-2`}
          />
          <textarea
            name="benefits"
            placeholder="Benefits, one per line"
            className={`${inputClass} sm:col-span-2`}
          />
          <textarea
            name="processSteps"
            placeholder="Process steps, one per line"
            className={`${inputClass} sm:col-span-2`}
          />
          <input className={inputClass} defaultValue="Standard" name="variantName" />
          <select name="billingType" className={inputClass} defaultValue="one_time">
            <option value="one_time">One time</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            step="0.01"
            required
            placeholder="Price"
            className={inputClass}
            type="number"
            name="regularPrice"
          />
          <input className={inputClass} defaultValue="usd" name="currency" />
          <input className={inputClass} type="number" defaultValue={10} name="deliveryDays" />
          <input className={inputClass} type="number" defaultValue={2} name="revisionRounds" />
          <input className={inputClass} type="number" defaultValue={50} name="sortOrder" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="variantActive" defaultChecked />
            Active variant
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-sky-400 px-5 py-3 font-black text-black sm:col-span-2 xl:col-span-4 disabled:opacity-60"
          >
            Create package
          </button>
        </form>
      </details>

      <section className="mt-8 grid gap-6">
        {store.packages.map((pkg) => (
          <PackageEditor
            key={pkg.id}
            pkg={pkg}
            pending={pending}
            onUpdated={(updated) => {
              setStore((current) => ({
                ...current,
                packages: current.packages.map((item) =>
                  item.id === updated.id ? updated : item,
                ),
              }));
              setSuccess({
                title: `Saved ${updated.title}.`,
                description: "Your changes are live on the public site.",
              });
            }}
            onDeleteRequest={(pkg) =>
              setConfirm({
                title: "Delete package",
                description: `Remove ${pkg.title} from the store? This action cannot be undone.`,
                confirmLabel: "Delete package",
                pendingLabel: "Deleting...",
                tone: "danger",
                onConfirm: async () => {
                  const response = await fetch(`/api/admin/packages/${pkg.id}`, {
                    method: "DELETE",
                  });
                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error(data.error || "Could not delete package.");
                  }
                  setStore((current) => ({
                    ...current,
                    packages: current.packages.filter((item) => item.id !== pkg.id),
                  }));
                  setSuccess({ title: "Package deleted." });
                },
              })
            }
            runAction={runAction}
          />
        ))}
      </section>

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
        pendingLabel={confirm?.pendingLabel}
        tone={confirm?.tone}
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

function PackageEditor({
  pkg,
  pending,
  onUpdated,
  onDeleteRequest,
  runAction,
}: {
  pkg: AdminPackage;
  pending: boolean;
  onUpdated: (pkg: AdminPackage) => void;
  onDeleteRequest: (pkg: AdminPackage) => void;
  runAction: (action: () => Promise<void>) => void;
}) {
  const primaryVariant =
    pkg.variants.find((variant) => variant.active) ?? pkg.variants[0];

  return (
    <details className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6" open>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              {pkg.status} / {pkg.slug}
            </p>
            <h2 className="mt-2 font-display text-3xl font-black">{pkg.title}</h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-red-400/30 px-4 py-2 text-xs font-black text-red-200"
            onClick={(event) => {
              event.preventDefault();
              onDeleteRequest(pkg);
            }}
          >
            Delete package
          </button>
        </div>
      </summary>

      <form
        className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          runAction(async () => {
            const result = await postJson(`/api/admin/packages/${pkg.id}`, {
              method: "PUT",
              ...Object.fromEntries(form),
              variantActive: form.get("variantActive") === "on",
            });
            onUpdated(result.package);
          });
        }}
      >
        <input type="hidden" name="packageId" value={pkg.id} />
        <input type="hidden" name="variantId" value={primaryVariant?.id ?? ""} />

        <label className={labelClass}>
          Title
          <input className={inputClass} name="title" defaultValue={pkg.title} />
        </label>
        <label className={labelClass}>
          Slug
          <input className={inputClass} name="slug" defaultValue={pkg.slug} />
        </label>
        <label className={labelClass}>
          Eyebrow
          <input className={inputClass} name="eyebrow" defaultValue={pkg.eyebrow} />
        </label>
        <label className={labelClass}>
          Thumbnail label
          <input
            className={inputClass}
            name="thumbnailLabel"
            defaultValue={pkg.thumbnailLabel}
          />
        </label>
        <label className={labelClass}>
          Best for
          <input className={inputClass} name="bestFor" defaultValue={pkg.bestFor} />
        </label>
        <label className={labelClass}>
          Timeline label
          <input
            className={inputClass}
            name="timelineLabel"
            defaultValue={pkg.timelineLabel}
          />
        </label>
        <label className={labelClass}>
          Thumbnail gradient
          <input
            className={inputClass}
            name="thumbnailGradient"
            defaultValue={pkg.thumbnailGradient}
          />
        </label>
        <label className={labelClass}>
          Status
          <select name="status" className={inputClass} defaultValue={pkg.status}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className={labelClass}>
          Sort order
          <input
            className={inputClass}
            type="number"
            name="sortOrder"
            defaultValue={pkg.sortOrder}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2 xl:col-span-4`}>
          Summary
          <textarea
            name="summary"
            rows={3}
            className={inputClass}
            defaultValue={pkg.summary}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Deliverables
          <textarea
            name="deliverables"
            rows={6}
            className={inputClass}
            defaultValue={arrayToLines(pkg.deliverables)}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Included items
          <textarea
            name="includedItems"
            rows={6}
            className={inputClass}
            defaultValue={arrayToLines(pkg.includedItems)}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Benefits
          <textarea
            name="benefits"
            rows={6}
            className={inputClass}
            defaultValue={arrayToLines(pkg.benefits)}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Process steps
          <textarea
            name="processSteps"
            rows={6}
            className={inputClass}
            defaultValue={arrayToLines(pkg.processSteps)}
          />
        </label>

        {primaryVariant && (
          <div className="grid gap-4 rounded-2xl border border-white/10 p-5 sm:col-span-2 xl:col-span-4 sm:grid-cols-2 xl:grid-cols-4">
            <label className={labelClass}>
              Variant name
              <input
                className={inputClass}
                name="variantName"
                defaultValue={primaryVariant.name}
              />
            </label>
            <label className={labelClass}>
              Billing
              <select
                name="billingType"
                className={inputClass}
                defaultValue={primaryVariant.billingType}
              >
                <option value="one_time">One time</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
            <label className={labelClass}>
              Regular price
              <input
                step="0.01"
                className={inputClass}
                type="number"
                name="regularPrice"
                defaultValue={primaryVariant.regularPrice}
              />
            </label>
            <label className={labelClass}>
              Offer price
              <input
                step="0.01"
                className={inputClass}
                type="number"
                name="offerPrice"
                defaultValue={primaryVariant.offerPrice ?? ""}
              />
            </label>
            <label className={labelClass}>
              Offer starts
              <input
                className={inputClass}
                type="datetime-local"
                name="offerStarts"
                defaultValue={toDatetimeLocalValue(primaryVariant.offerStarts)}
              />
            </label>
            <label className={labelClass}>
              Offer ends
              <input
                className={inputClass}
                type="datetime-local"
                name="offerEnds"
                defaultValue={toDatetimeLocalValue(primaryVariant.offerEnds)}
              />
            </label>
            <label className={labelClass}>
              Currency
              <select
                name="currency"
                className={inputClass}
                defaultValue={primaryVariant.currency}
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </label>
            <label className={labelClass}>
              Delivery days
              <input
                className={inputClass}
                type="number"
                name="deliveryDays"
                defaultValue={primaryVariant.deliveryDays}
              />
            </label>
            <label className={labelClass}>
              Revision rounds
              <input
                className={inputClass}
                type="number"
                name="revisionRounds"
                defaultValue={primaryVariant.revisionRounds}
              />
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="variantActive"
                defaultChecked={primaryVariant.active}
              />
              Variant active
            </label>
            <input
              type="hidden"
              name="variantDescription"
              value={primaryVariant.description}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sky-400 px-5 py-3 font-black text-black sm:col-span-2 xl:col-span-4 disabled:opacity-60"
        >
          Save package
        </button>
      </form>

      {pkg.variants.length > 1 && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Additional variants
          </p>
          <div className="mt-3 grid gap-3">
            {pkg.variants
              .filter((variant) => variant.id !== primaryVariant?.id)
              .map((variant) => (
                <div
                  key={variant.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-bold text-white">{variant.name}</p>
                    <p className="text-zinc-500">
                      {formatMoney(variant.regularPrice, variant.currency)} ·{" "}
                      {variant.billingType === "monthly" ? "Monthly" : "One time"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-black text-red-200"
                    onClick={() =>
                      runAction(async () => {
                        const result = await postJson(`/api/admin/packages/${pkg.id}`, {
                          method: "PUT",
                          action: "delete-variant",
                          variantId: variant.id,
                        });
                        onUpdated(result.package);
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      <form
        className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2 xl:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          runAction(async () => {
            const result = await postJson(`/api/admin/packages/${pkg.id}`, {
              method: "PUT",
              action: "add-variant",
              currency: primaryVariant?.currency ?? "usd",
              ...Object.fromEntries(form),
            });
            onUpdated(result.package);
            event.currentTarget.reset();
          });
        }}
      >
        <input required placeholder="New variant name" className={inputClass} name="name" />
        <select name="billingType" className={inputClass} defaultValue="one_time">
          <option value="one_time">One time</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          step="0.01"
          required
          placeholder="Price"
          className={inputClass}
          type="number"
          name="price"
        />
        <input
          placeholder="Delivery days"
          className={inputClass}
          type="number"
          defaultValue={10}
          name="deliveryDays"
        />
        <input
          placeholder="Revisions"
          className={inputClass}
          type="number"
          defaultValue={2}
          name="revisionRounds"
        />
        <input
          placeholder="Sort order"
          className={inputClass}
          type="number"
          defaultValue={20}
          name="sortOrder"
        />
        <input placeholder="Variant description" className={inputClass} name="description" />
        <button className="rounded-xl border border-sky-400/30 px-4 py-3 font-black text-sky-200">
          Add variant
        </button>
      </form>

      {pkg.addOns.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Add-ons
          </p>
          <div className="mt-3 grid gap-3">
            {pkg.addOns.map((addOn) => (
              <div
                key={addOn.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-bold text-white">{addOn.title}</p>
                  <p className="text-zinc-500">
                    {formatMoney(addOn.price)} · {addOn.billingBehavior}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-black text-red-200"
                  onClick={() =>
                    runAction(async () => {
                      const result = await postJson(`/api/admin/packages/${pkg.id}`, {
                        method: "PUT",
                        action: "delete-addon",
                        addOnId: addOn.id,
                      });
                      onUpdated(result.package);
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <form
        className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2 xl:grid-cols-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          runAction(async () => {
            const result = await postJson(`/api/admin/packages/${pkg.id}`, {
              method: "PUT",
              action: "add-addon",
              ...Object.fromEntries(form),
            });
            onUpdated(result.package);
            event.currentTarget.reset();
          });
        }}
      >
        <input required placeholder="New add-on title" className={inputClass} name="title" />
        <input placeholder="Description" className={inputClass} name="description" />
        <input
          step="0.01"
          required
          placeholder="Price"
          className={inputClass}
          type="number"
          name="price"
        />
        <select name="billingBehavior" className={inputClass} defaultValue="one_time">
          <option value="one_time">One-time add-on</option>
          <option value="recurring">Recurring add-on</option>
        </select>
        <input
          placeholder="Delivery day change"
          className={inputClass}
          type="number"
          name="deliveryDaysDelta"
        />
        <input
          placeholder="Extra revisions"
          className={inputClass}
          type="number"
          name="extraRevisions"
        />
        <button className="rounded-xl border border-sky-400/30 px-4 py-3 font-black text-sky-200">
          Add option
        </button>
      </form>
    </details>
  );
}

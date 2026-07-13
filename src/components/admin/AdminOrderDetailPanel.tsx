"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminSuccessModal } from "@/components/admin/AdminSuccessModal";
import type { AdminOrder, OrderStatus } from "@/lib/admin/order-types";
import { ORDER_STATUSES } from "@/lib/admin/order-types";
import {
  formatOrderAmount,
  getOrderAssetLinks,
  getOrderExternalDeliveryLinks,
  getOrderIntakeRows,
  getOrderUploadedDeliveryLinks,
  normalizeDeliveryUrl,
  toPublicDeliveryUrl,
} from "@/lib/admin/order-utils";
import { toDatetimeLocalValue } from "@/lib/admin/package-utils";

type Props = {
  order: AdminOrder;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-white outline-none focus:border-sky-300";

export function AdminOrderDetailPanel({ order: initialOrder }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [order, setOrder] = useState(initialOrder);
  const [status, setStatus] = useState<OrderStatus>(initialOrder.status);
  const [dueAt, setDueAt] = useState(toDatetimeLocalValue(initialOrder.dueAt ?? null));
  const [confirmKickoff, setConfirmKickoff] = useState(Boolean(initialOrder.confirmKickoff));
  const [statusNote, setStatusNote] = useState(initialOrder.statusNote ?? "");
  const [messageBody, setMessageBody] = useState("");
  const [deliveryLabel, setDeliveryLabel] = useState("");
  const [deliveryUrl, setDeliveryUrl] = useState("");
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [stagedFile, setStagedFile] = useState<{
    fileUrl: string;
    filename: string;
    label: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ title: string; description?: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const intakeRows = getOrderIntakeRows(order.intake);
  const assetLinks = getOrderAssetLinks(order);
  const uploadedDeliveryLinks = getOrderUploadedDeliveryLinks(order.deliveries);
  const externalDeliveryLinks = getOrderExternalDeliveryLinks(order.deliveries);

  function resolveDeliveryHref(url: string) {
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith("/") && typeof window !== "undefined") {
      return `${window.location.origin}${url}`;
    }
    return toPublicDeliveryUrl(url);
  }

  async function request(
    payload: Record<string, unknown>,
    successTitle: string,
    successDescription?: string,
  ) {
    setError(null);
    const response = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }
    setOrder(data.order);
    setStatus(data.order.status);
    setDueAt(toDatetimeLocalValue(data.order.dueAt ?? null));
    setConfirmKickoff(Boolean(data.order.confirmKickoff));
    setStatusNote(data.order.statusNote ?? "");
    setSuccess({ title: successTitle, description: successDescription });
    router.refresh();
  }

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      try {
        await action();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  function uploadDeliveryFile() {
    if (!deliveryFile) return;

    run(async () => {
      setError(null);
      const formData = new FormData();
      formData.append("file", deliveryFile);

      const response = await fetch(`/api/admin/orders/${order.id}/delivery-file`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setStagedFile({
        fileUrl: data.fileUrl,
        filename: data.filename,
        label: data.label || "Here's your delivery.",
      });
      setDeliveryFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess({
        title: "File ready to deliver.",
        description: "Add an optional link, then click Deliver to client.",
      });
    });
  }

  function deliverToClient() {
    const externalUrl = deliveryUrl.trim() ? normalizeDeliveryUrl(deliveryUrl) : "";
    if (!stagedFile && !externalUrl) {
      setError("Upload a file or add a delivery link before delivering.");
      return;
    }

    run(async () => {
      setError(null);
      const response = await fetch(`/api/admin/orders/${order.id}/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl: stagedFile?.fileUrl,
          fileLabel: stagedFile?.label,
          externalUrl: externalUrl || undefined,
          externalLabel: deliveryLabel.trim() || "Final exports",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not deliver order.");
      }

      setOrder(data.order);
      setStagedFile(null);
      setDeliveryLabel("");
      setDeliveryUrl("");
      setSuccess({
        title: "Delivered to client.",
        description: "The delivery message was saved and emailed to the customer.",
      });
      router.refresh();
    });
  }

  const hasStagedDelivery = Boolean(stagedFile || deliveryUrl.trim());

  return (
    <>
      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid gap-6">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
            <h2 className="font-display text-3xl font-black">Intake and assets</h2>
            <div className="mt-5 grid gap-4 text-sm">
              {intakeRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs font-black uppercase text-zinc-600">{row.label}</p>
                  <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">{row.value}</p>
                </div>
              ))}
            </div>
            {assetLinks.length > 0 || uploadedDeliveryLinks.length > 0 ? (
              <div className="mt-5 grid gap-2">
                {assetLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-sky-300 transition hover:border-sky-400/30 hover:text-white"
                  >
                    {link.label}: {link.url}
                  </a>
                ))}
                {uploadedDeliveryLinks.map((link) => (
                  <a
                    key={link.url}
                    href={resolveDeliveryHref(link.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm transition hover:border-emerald-300/30"
                  >
                    <p className="font-bold text-white">{link.label}</p>
                    <p className="mt-1 truncate text-emerald-200">{link.filename}</p>
                  </a>
                ))}
              </div>
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
            <h2 className="font-display text-3xl font-black">Messages</h2>
            <div className="mt-5 grid gap-3">
              {order.messages.length === 0 ? (
                <p className="text-sm text-zinc-500">No messages yet.</p>
              ) : (
                order.messages.map((message) => (
                  <article
                    key={message.id}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
                      {message.author} · {new Date(message.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">
                      {message.body}
                    </p>
                  </article>
                ))
              )}
            </div>
            <form
              className="mt-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (!messageBody.trim()) return;
                run(async () => {
                  await request(
                    { action: "message", body: messageBody },
                    "Message sent.",
                    "The client update was saved and emailed to the customer.",
                  );
                  setMessageBody("");
                });
              }}
            >
              <textarea
                name="body"
                required
                rows={4}
                value={messageBody}
                onChange={(event) => setMessageBody(event.target.value)}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={pending}
                className="mt-3 rounded-full bg-sky-400 px-5 py-3 font-black text-black disabled:opacity-60"
              >
                {pending ? "Sending..." : "Send and email client"}
              </button>
            </form>
          </section>
        </div>

        <aside className="grid content-start gap-6">
          <section className="rounded-[2rem] border border-sky-400/20 bg-sky-400/[0.05] p-6">
            <h2 className="font-display text-3xl font-black">Workflow control</h2>
            <form
              className="mt-5 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                run(() =>
                  request(
                    {
                      status,
                      dueAt,
                      statusNote,
                      confirmKickoff,
                    },
                    "Workflow saved.",
                    `Status is now ${status.replace(/_/g, " ")}.`,
                  ),
                );
              }}
            >
              <select
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as OrderStatus)}
                className={inputClass}
              >
                {ORDER_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <label className="text-xs font-black uppercase text-zinc-500">
                Due date
                <input
                  className={`${inputClass} mt-2`}
                  type="datetime-local"
                  name="dueAt"
                  value={dueAt}
                  onChange={(event) => setDueAt(event.target.value)}
                />
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="confirmKickoff"
                  checked={confirmKickoff}
                  onChange={(event) => setConfirmKickoff(event.target.checked)}
                />
                Confirm kickoff and start business-day countdown
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Client-facing status note"
                value={statusNote}
                onChange={(event) => setStatusNote(event.target.value)}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-sky-400 px-5 py-3 font-black text-black disabled:opacity-60"
              >
                {pending ? "Saving..." : "Save and notify"}
              </button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/[0.05] p-6">
            <h2 className="font-display text-3xl font-black">Delivery</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Upload a file and/or add a link, then deliver once to send a single client message.
            </p>
            {externalDeliveryLinks.length > 0 || uploadedDeliveryLinks.length > 0 ? (
              <div className="mt-5 grid gap-2">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Sent deliveries
                </p>
                {uploadedDeliveryLinks.map((delivery) => (
                  <a
                    key={delivery.url}
                    href={resolveDeliveryHref(delivery.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm transition hover:border-emerald-300/30"
                  >
                    <p className="font-bold text-white">{delivery.label}</p>
                    <p className="mt-1 truncate text-emerald-200">{delivery.filename}</p>
                  </a>
                ))}
                {externalDeliveryLinks.map((delivery) => (
                  <a
                    key={delivery.url}
                    href={resolveDeliveryHref(delivery.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm transition hover:border-emerald-300/30"
                  >
                    <p className="font-bold text-white">{delivery.label}</p>
                    <p className="mt-1 truncate text-emerald-200">{delivery.url}</p>
                  </a>
                ))}
              </div>
            ) : null}
            {stagedFile ? (
              <div className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">
                  Ready to deliver
                </p>
                <p className="mt-2 font-bold text-white">{stagedFile.label}</p>
                <p className="mt-1 truncate text-amber-100">{stagedFile.filename}</p>
                <button
                  type="button"
                  onClick={() => setStagedFile(null)}
                  className="mt-3 text-xs font-bold text-amber-200 underline"
                >
                  Remove staged file
                </button>
              </div>
            ) : null}
            <div className="mt-5 grid gap-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                Upload final file
              </p>

              <input
                ref={fileInputRef}
                type="file"
                className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:font-bold file:text-white`}
                onChange={(event) => setDeliveryFile(event.target.files?.[0] ?? null)}
              />

              <button
                type="button"
                disabled={pending || !deliveryFile}
                onClick={uploadDeliveryFile}
                className="rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                {pending ? "Uploading..." : "Stage file"}
              </button>

              <p className="pt-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                Or add external delivery link
              </p>

              <input
                placeholder="Deliverable label"
                className={inputClass}
                name="deliverableLabel"
                value={deliveryLabel}
                onChange={(event) => setDeliveryLabel(event.target.value)}
              />

              <input
                placeholder="Secure delivery URL (Google Drive, Dropbox...)"
                className={inputClass}
                type="url"
                name="url"
                value={deliveryUrl}
                onChange={(event) => setDeliveryUrl(event.target.value)}
              />

              <button
                type="button"
                disabled={pending || !hasStagedDelivery}
                onClick={deliverToClient}
                className="rounded-full bg-emerald-300 px-5 py-3 font-black text-black disabled:opacity-60"
              >
                {pending ? "Delivering..." : "Deliver to client"}
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-red-300/20 bg-red-400/[0.05] p-6">
            <h2 className="font-display text-2xl font-black">Pre-kickoff refund</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Only available before kickoff. The payment provider returns funds to the original
              method.
            </p>
            <button
              type="button"
              disabled={pending || order.confirmKickoff || order.status === "refunded"}
              onClick={() =>
                run(() =>
                  request({ action: "refund" }, "Refund issued.", "Order marked as refunded."),
                )
              }
              className="mt-4 rounded-full border border-red-300/30 px-5 py-3 font-black text-red-200 disabled:opacity-60"
            >
              Issue refund
            </button>
          </section>
        </aside>
      </div>

      <AdminSuccessModal
        open={!!success}
        title={success?.title ?? ""}
        description={success?.description}
        onClose={() => setSuccess(null)}
      />
    </>
  );
}

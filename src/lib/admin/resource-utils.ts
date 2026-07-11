import type { VaultResource } from "@/lib/data/resources";
import type { AdminResource } from "@/lib/admin/resource-types";
import { arrayToLines, formatMoney, linesToArray } from "@/lib/admin/package-utils";
import { slugifyName } from "@/lib/admin/team-utils";

export function toVaultResource(resource: AdminResource): VaultResource {
  return {
    slug: resource.slug,
    title: resource.title,
    categoryLabel: resource.category,
    formatLabel: resource.format,
    schemaCategory: resource.category,
    description: resource.description,
    heroDescription: resource.detailIntro,
    helpfulFor: resource.benefit,
    whyPurchase: resource.purchaseReason,
    socialPostAngle: resource.socialPostAngle,
    audiences: resource.audience,
    benefits: resource.benefits,
    whatYouGet: resource.includedItems,
    preview: resource.previewContent,
    price: formatMoney(resource.price, resource.currency),
    priceAmount: resource.price,
    thumbnail: resource.thumbnail ?? "/assets/thumbnails/resources/placeholder.svg",
    thumbnailAlt: `${resource.title} thumbnail`,
  };
}

export function parseResourceFromForm(
  form: FormData,
  existing?: AdminResource,
): AdminResource {
  const title = String(form.get("title") ?? existing?.title ?? "").trim();
  const slugInput = String(form.get("slug") ?? existing?.slug ?? "").trim();
  const slug = slugifyName(slugInput || title);
  const rawId = String(form.get("id") ?? "").trim();
  const audience = form.getAll("audience").map((value) => String(value).trim()).filter(Boolean);

  return {
    id: rawId || existing?.id || "",
    slug,
    title,
    category: String(form.get("category") ?? existing?.category ?? "AI UGC") as AdminResource["category"],
    format: String(form.get("format") ?? existing?.format ?? "Prompt pack") as AdminResource["format"],
    price: Number(form.get("price") ?? existing?.price ?? 0),
    currency: String(form.get("currency") ?? existing?.currency ?? "usd").toLowerCase() as AdminResource["currency"],
    status: String(form.get("status") ?? existing?.status ?? "draft") as AdminResource["status"],
    sortOrder: Number(form.get("sortOrder") ?? existing?.sortOrder ?? 0),
    audience: audience.length > 0 ? audience : existing?.audience ?? [],
    benefit: String(form.get("benefit") ?? existing?.benefit ?? "").trim(),
    description: String(form.get("description") ?? existing?.description ?? "").trim(),
    detailIntro: String(form.get("detailIntro") ?? existing?.detailIntro ?? "").trim(),
    purchaseReason: String(form.get("purchaseReason") ?? existing?.purchaseReason ?? "").trim(),
    benefits: linesToArray(String(form.get("benefits") ?? arrayToLines(existing?.benefits ?? []))),
    includedItems: linesToArray(
      String(form.get("includedItems") ?? arrayToLines(existing?.includedItems ?? [])),
    ),
    socialPostAngle: String(form.get("socialPostAngle") ?? existing?.socialPostAngle ?? "").trim(),
    previewContent: String(form.get("previewContent") ?? existing?.previewContent ?? "").trim(),
    lockedContent: String(form.get("lockedContent") ?? existing?.lockedContent ?? "").trim(),
    thumbnail: existing?.thumbnail ?? null,
    filePath: existing?.filePath ?? null,
    isPaid: form.get("isPaid") === "on" || form.get("isPaid") === "true",
  };
}

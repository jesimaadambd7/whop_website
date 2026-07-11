import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { createId, linesToArray } from "@/lib/admin/package-utils";
import {
  createAdminPackage,
  getPackageStore,
  listAdminPackages,
} from "@/lib/admin/package-store";
import type {
  AdminPackage,
  BillingType,
  PackageStatus,
} from "@/lib/admin/package-types";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await getPackageStore();
  return NextResponse.json(store);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim().toLowerCase();
  const summary = String(body.summary ?? "").trim();

  if (!title || !slug || !summary) {
    return NextResponse.json({ error: "Title, slug, and summary are required." }, { status: 400 });
  }

  const existing = await listAdminPackages();
  const maxSort = existing.reduce((max, pkg) => Math.max(max, pkg.sortOrder), 0);

  const pkg: AdminPackage = {
    id: createId(),
    slug,
    title,
    eyebrow: String(body.eyebrow ?? "").trim(),
    thumbnailLabel: String(body.thumbnailLabel ?? "").trim(),
    thumbnailGradient:
      String(body.thumbnailGradient ?? "").trim() ||
      "linear-gradient(135deg,#001b2c,#00a8ff)",
    bestFor: String(body.bestFor ?? "").trim(),
    timelineLabel: String(body.timelineLabel ?? "").trim(),
    status: (body.status as PackageStatus) || "draft",
    sortOrder: Number(body.sortOrder ?? maxSort + 10),
    summary,
    deliverables: Array.isArray(body.deliverables)
      ? body.deliverables
      : linesToArray(String(body.deliverables ?? "")),
    includedItems: Array.isArray(body.includedItems)
      ? body.includedItems
      : linesToArray(String(body.includedItems ?? "")),
    benefits: Array.isArray(body.benefits)
      ? body.benefits
      : linesToArray(String(body.benefits ?? "")),
    processSteps: Array.isArray(body.processSteps)
      ? body.processSteps
      : linesToArray(String(body.processSteps ?? "")),
    thumbnail: `/assets/thumbnails/packages/${slug}.svg`,
    variants: [
      {
        id: createId(),
        name: String(body.variantName ?? "Standard").trim() || "Standard",
        billingType: (body.billingType as BillingType) || "one_time",
        regularPrice: Number(body.regularPrice ?? 0),
        offerPrice: body.offerPrice ? Number(body.offerPrice) : null,
        offerStarts: body.offerStarts ?? null,
        offerEnds: body.offerEnds ?? null,
        currency: String(body.currency ?? "usd").toLowerCase(),
        deliveryDays: Number(body.deliveryDays ?? 10),
        revisionRounds: Number(body.revisionRounds ?? 2),
        active: body.variantActive !== false,
        description: String(body.variantDescription ?? "").trim(),
        sortOrder: 10,
      },
    ],
    addOns: [],
  };

  try {
    const created = await createAdminPackage(pkg);
    return NextResponse.json({ ok: true, package: created });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create package." },
      { status: 400 },
    );
  }
}

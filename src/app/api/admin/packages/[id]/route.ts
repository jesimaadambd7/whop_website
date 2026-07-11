import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { createId, linesToArray } from "@/lib/admin/package-utils";
import {
  deleteAdminPackage,
  getAdminPackageById,
  updateAdminPackage,
} from "@/lib/admin/package-store";
import type {
  AddOnBilling,
  AdminPackage,
  BillingType,
  PackageAddOn,
  PackageStatus,
  PackageVariant,
} from "@/lib/admin/package-types";

type RouteContext = { params: { id: string } };

function parseVariant(body: Record<string, unknown>, existing?: PackageVariant): PackageVariant {
  return {
    id: String(body.variantId ?? existing?.id ?? createId()),
    name: String(body.variantName ?? existing?.name ?? "Standard").trim(),
    billingType: (body.billingType as BillingType) ?? existing?.billingType ?? "one_time",
    regularPrice: Number(body.regularPrice ?? existing?.regularPrice ?? 0),
    offerPrice:
      body.offerPrice === "" || body.offerPrice == null
        ? null
        : Number(body.offerPrice ?? existing?.offerPrice),
    offerStarts: (body.offerStarts as string | null) ?? existing?.offerStarts ?? null,
    offerEnds: (body.offerEnds as string | null) ?? existing?.offerEnds ?? null,
    currency: String(body.currency ?? existing?.currency ?? "usd").toLowerCase(),
    deliveryDays: Number(body.deliveryDays ?? existing?.deliveryDays ?? 10),
    revisionRounds: Number(body.revisionRounds ?? existing?.revisionRounds ?? 2),
    active: body.variantActive === true || body.variantActive === "on",
    description: String(body.variantDescription ?? existing?.description ?? "").trim(),
    sortOrder: Number(existing?.sortOrder ?? 10),
  };
}

function parseAddOn(addOn: Record<string, unknown>, index: number): PackageAddOn {
  return {
    id: String(addOn.id ?? createId()),
    title: String(addOn.title ?? "").trim(),
    description: String(addOn.description ?? "").trim(),
    price: Number(addOn.price ?? 0),
    billingBehavior: (addOn.billingBehavior as AddOnBilling) ?? "one_time",
    deliveryDaysDelta:
      addOn.deliveryDaysDelta == null || addOn.deliveryDaysDelta === ""
        ? null
        : Number(addOn.deliveryDaysDelta),
    extraRevisions:
      addOn.extraRevisions == null || addOn.extraRevisions === ""
        ? null
        : Number(addOn.extraRevisions),
    sortOrder: Number(addOn.sortOrder ?? (index + 1) * 10),
  };
}

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getAdminPackageById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const body = await request.json();
  const primaryVariantId = String(body.variantId ?? existing.variants[0]?.id ?? "");
  const primaryVariant = existing.variants.find((variant) => variant.id === primaryVariantId);

  let variants = existing.variants;
  if (body.action === "add-variant") {
    variants = [
      ...existing.variants,
      {
        id: createId(),
        name: String(body.name ?? "New variant").trim(),
        billingType: (body.billingType as BillingType) ?? "one_time",
        regularPrice: Number(body.price ?? 0),
        offerPrice: null,
        offerStarts: null,
        offerEnds: null,
        currency: String(body.currency ?? "usd").toLowerCase(),
        deliveryDays: Number(body.deliveryDays ?? 10),
        revisionRounds: Number(body.revisionRounds ?? 2),
        active: true,
        description: String(body.description ?? "").trim(),
        sortOrder: Number(body.sortOrder ?? (existing.variants.length + 1) * 10),
      },
    ];
  } else if (body.action === "add-addon") {
    const addOns = [
      ...existing.addOns,
      parseAddOn(body, existing.addOns.length),
    ];
    const pkg: AdminPackage = { ...existing, addOns };
    try {
      const updated = await updateAdminPackage(pkg);
      return NextResponse.json({ ok: true, package: updated });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Could not add add-on." },
        { status: 400 },
      );
    }
  } else if (body.action === "delete-variant") {
    const variantId = String(body.variantId ?? "");
    if (existing.variants.length <= 1) {
      return NextResponse.json({ error: "Each package needs at least one variant." }, { status: 400 });
    }
    variants = existing.variants.filter((variant) => variant.id !== variantId);
  } else if (body.action === "delete-addon") {
    const addOnId = String(body.addOnId ?? "");
    const pkg: AdminPackage = {
      ...existing,
      addOns: existing.addOns.filter((addOn) => addOn.id !== addOnId),
    };
    const updated = await updateAdminPackage(pkg);
    return NextResponse.json({ ok: true, package: updated });
  } else {
    variants = existing.variants.map((variant) =>
      variant.id === primaryVariantId ? parseVariant(body, variant) : variant,
    );
    if (!variants.length) {
      variants = [parseVariant(body)];
    }
  }

  const pkg: AdminPackage = {
    ...existing,
    title: String(body.title ?? existing.title).trim(),
    slug: String(body.slug ?? existing.slug).trim().toLowerCase(),
    eyebrow: String(body.eyebrow ?? existing.eyebrow).trim(),
    thumbnailLabel: String(body.thumbnailLabel ?? existing.thumbnailLabel).trim(),
    thumbnailGradient: String(body.thumbnailGradient ?? existing.thumbnailGradient).trim(),
    bestFor: String(body.bestFor ?? existing.bestFor).trim(),
    timelineLabel: String(body.timelineLabel ?? existing.timelineLabel).trim(),
    status: (body.status as PackageStatus) ?? existing.status,
    sortOrder: Number(body.sortOrder ?? existing.sortOrder),
    summary: String(body.summary ?? existing.summary).trim(),
    deliverables: Array.isArray(body.deliverables)
      ? body.deliverables
      : linesToArray(String(body.deliverables ?? arrayToLines(existing.deliverables))),
    includedItems: Array.isArray(body.includedItems)
      ? body.includedItems
      : linesToArray(String(body.includedItems ?? arrayToLines(existing.includedItems))),
    benefits: Array.isArray(body.benefits)
      ? body.benefits
      : linesToArray(String(body.benefits ?? arrayToLines(existing.benefits))),
    processSteps: Array.isArray(body.processSteps)
      ? body.processSteps
      : linesToArray(String(body.processSteps ?? arrayToLines(existing.processSteps))),
    variants,
    addOns: existing.addOns,
  };

  try {
    const updated = await updateAdminPackage(pkg);
    return NextResponse.json({ ok: true, package: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update package." },
      { status: 400 },
    );
  }
}

function arrayToLines(value: string[]) {
  return value.join("\n");
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const removed = await deleteAdminPackage(params.id);
    return NextResponse.json({ ok: true, package: removed });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not delete package." },
      { status: 404 },
    );
  }
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  getCreatorPricing,
  saveCreatorPricing,
} from "@/lib/admin/package-store";
import type { CreatorPricing } from "@/lib/admin/package-types";
import { linesToArray } from "@/lib/admin/package-utils";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pricing = await getCreatorPricing();
  return NextResponse.json({ pricing });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const pricing: CreatorPricing = {
    regularPrice: Number(body.regularPrice ?? 0),
    offerPrice: Number(body.offerPrice ?? 0),
    offerStarts: body.offerStarts ? String(body.offerStarts) : null,
    offerEnds: body.offerEnds ? String(body.offerEnds) : null,
    currency: String(body.currency ?? "usd").toLowerCase(),
    ctaLabel: String(body.ctaLabel ?? "Start building").trim(),
    available: body.available !== false,
    features: Array.isArray(body.features)
      ? body.features
      : linesToArray(String(body.features ?? "")),
  };

  const saved = await saveCreatorPricing(pricing);
  return NextResponse.json({ ok: true, pricing: saved });
}

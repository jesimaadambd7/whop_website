import { NextResponse } from "next/server";
import { createOrder } from "@/lib/admin/order-store";
import type { BillingType, OrderSource } from "@/lib/admin/order-types";
import { loadPackageBySlug } from "@/lib/data/packages";
import { getPublishedVaultResourceBySlug } from "@/lib/data/load-resources";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || "");
    const source = (body.source || "package") as OrderSource;

    if (!slug) {
      return NextResponse.json({ error: "Missing package slug." }, { status: 400 });
    }

    const customerName = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    if (!customerName || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (source === "resource") {
      const resource = await getPublishedVaultResourceBySlug(slug);
      if (!resource) {
        return NextResponse.json({ error: "Resource not found." }, { status: 404 });
      }

      const order = await createOrder({
        source: "resource",
        packageSlug: resource.slug,
        packageTitle: resource.title,
        billingType: "one_time",
        customerName,
        email,
        company: String(body.company || "not applicable"),
        amount: resource.priceAmount ?? 0,
        currency: "usd",
        intake: {},
      });

      return NextResponse.json({ order });
    }

    const pkg = await loadPackageBySlug(slug);
    if (!pkg) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    const billingType: BillingType =
      pkg.priceNote === "Billed monthly" ? "monthly" : "one_time";

    const intake: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      if (
        ["slug", "source", "name", "email", "company", "website", "variantId"].includes(key)
      ) {
        continue;
      }
      if (value != null && String(value).trim()) {
        intake[key] = String(value);
      }
    }

    const order = await createOrder({
      source: "package",
      packageSlug: pkg.slug,
      packageTitle: pkg.title,
      variantId: body.variantId ? String(body.variantId) : pkg.variantId,
      billingType,
      customerName,
      email,
      company: String(body.company || "not applicable"),
      website: body.website ? String(body.website) : undefined,
      amount: pkg.priceAmount,
      currency: "usd",
      intake,
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  }
}

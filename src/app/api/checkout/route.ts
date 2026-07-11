import { NextRequest, NextResponse } from "next/server";
import { loadPackageBySlug } from "@/lib/data/packages";
import { getWhopPlanId } from "@/lib/whop";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, email, name, company } = body as {
      slug: string;
      email?: string;
      name?: string;
      company?: string;
    };

    const pkg = await loadPackageBySlug(slug);
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const planId = getWhopPlanId(slug);
    if (!planId) {
      return NextResponse.json(
        {
          error: "Whop plan not configured",
          hint: `Set NEXT_PUBLIC_WHOP_PLAN_${slug.toUpperCase().replace(/-/g, "_")} in .env.local`,
        },
        { status: 500 },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return NextResponse.json({
      planId,
      returnUrl: `${siteUrl}/checkout/${slug}/complete`,
      metadata: {
        package_slug: slug,
        package_name: pkg.title,
        customer_email: email || "",
        customer_name: name || "",
        customer_company: company || "",
      },
    });
  } catch {
    return NextResponse.json({ error: "Checkout initialization failed" }, { status: 500 });
  }
}

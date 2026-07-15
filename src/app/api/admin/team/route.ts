import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { createId, isUploadFile, slugifyName } from "@/lib/admin/team-utils";
import { createAdminTeamMember, listAdminTeamMembers } from "@/lib/admin/team-store";
import type { AdminTeamMember, TeamProfileStatus } from "@/lib/admin/team-types";
import { saveTeamImage } from "@/lib/admin/team-upload";

function parseMemberFromForm(form: FormData, existing?: AdminTeamMember): AdminTeamMember {
  const name = String(form.get("name") ?? existing?.name ?? "").trim();
  const slugInput = String(form.get("slug") ?? existing?.slug ?? "").trim();
  const slug = slugifyName(slugInput || name);
  const rawId = String(form.get("id") ?? "").trim();

  return {
    id: rawId || existing?.id || createId(),
    slug,
    name,
    role: String(form.get("role") ?? existing?.role ?? "Video Editor").trim(),
    initials: String(form.get("initials") ?? existing?.initials ?? "").trim(),
    bio: String(form.get("bio") ?? existing?.bio ?? "").trim(),
    image: existing?.image ?? null,
    linkedin: String(form.get("linkedin") ?? existing?.linkedin ?? "").trim(),
    twitter: String(form.get("twitter") ?? existing?.twitter ?? "").trim(),
    profileHref: String(form.get("profileHref") ?? existing?.profileHref ?? "").trim(),
    portfolioHref:
      String(form.get("portfolioHref") ?? existing?.portfolioHref ?? "").trim() ||
      `/portfolio/${slug}`,
    status: (String(form.get("status") ?? existing?.status ?? "published") as TeamProfileStatus),
    sortOrder: Number(form.get("sortOrder") ?? existing?.sortOrder ?? 50),
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const members = await listAdminTeamMembers();
  return NextResponse.json({ members });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const member = parseMemberFromForm(form);

    if (!member.name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!member.slug) {
      return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
    }

    const imageFile = form.get("image");
    if (isUploadFile(imageFile)) {
      member.image = await saveTeamImage(imageFile, member.slug);
    }

    const created = await createAdminTeamMember(member);
    return NextResponse.json({ ok: true, member: created });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create profile." },
      { status: 400 },
    );
  }
}

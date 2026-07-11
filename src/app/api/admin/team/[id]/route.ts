import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { isUploadFile, slugifyName } from "@/lib/admin/team-utils";
import {
  deleteAdminTeamMember,
  getAdminTeamMemberById,
  updateAdminTeamMember,
} from "@/lib/admin/team-store";
import type { AdminTeamMember, TeamProfileStatus } from "@/lib/admin/team-types";
import { saveTeamImage } from "@/lib/admin/team-upload";

type RouteContext = { params: { id: string } };

function parseMemberFromForm(form: FormData, existing: AdminTeamMember): AdminTeamMember {
  const name = String(form.get("name") ?? existing.name).trim();
  const slugInput = String(form.get("slug") ?? existing.slug).trim();
  const slug = slugifyName(slugInput || name);

  return {
    ...existing,
    slug,
    name,
    role: String(form.get("role") ?? existing.role).trim(),
    initials: String(form.get("initials") ?? existing.initials).trim(),
    bio: String(form.get("bio") ?? existing.bio).trim(),
    linkedin: String(form.get("linkedin") ?? existing.linkedin).trim(),
    profileHref: String(form.get("profileHref") ?? existing.profileHref).trim(),
    portfolioHref:
      String(form.get("portfolioHref") ?? existing.portfolioHref).trim() ||
      `/portfolio/${slug}`,
    status: String(form.get("status") ?? existing.status) as TeamProfileStatus,
    sortOrder: Number(form.get("sortOrder") ?? existing.sortOrder),
  };
}

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getAdminTeamMemberById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Team profile not found." }, { status: 404 });
  }

  try {
    const form = await request.formData();
    const member = parseMemberFromForm(form, existing);

    const imageFile = form.get("image");
    if (isUploadFile(imageFile)) {
      member.image = await saveTeamImage(imageFile, member.slug);
    }

    const updated = await updateAdminTeamMember(member);
    return NextResponse.json({ ok: true, member: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update profile." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const removed = await deleteAdminTeamMember(params.id);
    return NextResponse.json({ ok: true, member: removed });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not delete profile." },
      { status: 404 },
    );
  }
}

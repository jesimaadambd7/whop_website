import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { parseResourceFromForm } from "@/lib/admin/resource-utils";
import {
  deleteAdminResource,
  getAdminResourceById,
  updateAdminResource,
} from "@/lib/admin/resource-store";
import { saveResourceFile, saveResourceThumbnail } from "@/lib/admin/resource-upload";
import { isUploadFile } from "@/lib/admin/team-utils";

type RouteContext = { params: { id: string } };

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getAdminResourceById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Resource not found." }, { status: 404 });
  }

  try {
    const form = await request.formData();
    const resource = parseResourceFromForm(form, existing);
    resource.id = existing.id;

    const thumbnailFile = form.get("thumbnail");
    if (isUploadFile(thumbnailFile)) {
      resource.thumbnail = await saveResourceThumbnail(thumbnailFile, resource.slug);
    }

    const downloadFile = form.get("file");
    if (isUploadFile(downloadFile)) {
      resource.filePath = await saveResourceFile(downloadFile, resource.slug);
    }

    const updated = await updateAdminResource(resource);
    return NextResponse.json({ ok: true, resource: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update resource." },
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
    const removed = await deleteAdminResource(params.id);
    return NextResponse.json({ ok: true, resource: removed });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not delete resource." },
      { status: 404 },
    );
  }
}

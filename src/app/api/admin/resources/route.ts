import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { createId } from "@/lib/admin/package-utils";
import { parseResourceFromForm } from "@/lib/admin/resource-utils";
import { createAdminResource, listAdminResources } from "@/lib/admin/resource-store";
import { saveResourceFile, saveResourceThumbnail } from "@/lib/admin/resource-upload";
import { isUploadFile } from "@/lib/admin/team-utils";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resources = await listAdminResources();
  return NextResponse.json({ resources });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const resource = parseResourceFromForm(form);
    resource.id = resource.id || createId();

    if (!resource.title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!resource.slug) {
      return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
    }

    const thumbnailFile = form.get("thumbnail");
    if (isUploadFile(thumbnailFile)) {
      resource.thumbnail = await saveResourceThumbnail(thumbnailFile, resource.slug);
    }

    const downloadFile = form.get("file");
    if (isUploadFile(downloadFile)) {
      resource.filePath = await saveResourceFile(downloadFile, resource.slug);
    }

    const created = await createAdminResource(resource);
    return NextResponse.json({ ok: true, resource: created });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create resource." },
      { status: 400 },
    );
  }
}

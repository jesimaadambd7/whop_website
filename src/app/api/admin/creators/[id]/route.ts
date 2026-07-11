import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  deleteCreator,
  getCreator,
  updateCreator,
} from "@/lib/admin/creator-store";
import type { CreatorStatus } from "@/lib/admin/creator-types";
import { CREATOR_STATUSES } from "@/lib/admin/creator-types";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const creator = await getCreator(params.id);
  if (!creator) {
    return NextResponse.json({ error: "Creator not found." }, { status: 404 });
  }

  return NextResponse.json({ creator });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      status?: CreatorStatus;
      password?: string;
    };

    if (!body.status && body.password == null) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    if (body.status && !CREATOR_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const creator = await updateCreator(params.id, {
      status: body.status,
      password: body.password,
    });
    if (!creator) {
      return NextResponse.json({ error: "Creator not found." }, { status: 404 });
    }

    return NextResponse.json({ creator });
  } catch (error) {
    console.error("Update creator error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update creator." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteCreator(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Creator not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { getOrder } from "@/lib/admin/order-store";
import { getDeliveryFilename } from "@/lib/admin/order-utils";
import { getUploadableFile, saveOrderDeliveryFile } from "@/lib/admin/order-delivery-upload";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const file = getUploadableFile(formData);

    if (!file) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }

    const fileUrl = await saveOrderDeliveryFile(file, params.id);
    const filename = getDeliveryFilename(fileUrl);

    return NextResponse.json({
      fileUrl,
      filename,
      label: "Here's your delivery.",
    });
  } catch (error) {
    console.error("Delivery upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 },
    );
  }
}

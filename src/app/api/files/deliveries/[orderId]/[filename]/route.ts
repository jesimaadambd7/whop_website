import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getOrderDeliveryFilePath } from "@/lib/admin/order-delivery-upload";

type Params = { params: { orderId: string; filename: string } };

export async function GET(_request: Request, { params }: Params) {
  const filename = decodeURIComponent(params.filename);
  const { dataPath, publicPath } = getOrderDeliveryFilePath(params.orderId, filename);

  for (const filepath of [dataPath, publicPath]) {
    try {
      const data = await fs.readFile(filepath);
      const ext = path.extname(filename).toLowerCase();
      const contentType =
        ext === ".pdf"
          ? "application/pdf"
          : ext === ".mp4"
            ? "video/mp4"
            : ext === ".mov"
              ? "video/quicktime"
              : ext === ".zip"
                ? "application/zip"
                : "application/octet-stream";

      return new NextResponse(data, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${path.basename(filename)}"`,
        },
      });
    } catch {
      // try next path
    }
  }

  return NextResponse.json({ error: "File not found." }, { status: 404 });
}

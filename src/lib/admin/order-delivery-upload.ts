import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { getDataDir, isServerlessRuntime } from "@/lib/admin/data-dir";
import { useBlobStorage } from "@/lib/admin/persistent-storage";

type UploadableFile = Blob & { name?: string };

export async function saveOrderDeliveryFile(file: UploadableFile, orderId: string) {
  const originalName = file.name?.trim() || "delivery-file";
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const filename = `${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isServerlessRuntime() && useBlobStorage()) {
    const blob = await put(`deliveries/${orderId}/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const dir = isServerlessRuntime()
    ? path.join(getDataDir(), "deliveries", orderId)
    : path.join(process.cwd(), "public/assets/deliveries", orderId);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  if (isServerlessRuntime()) {
    return `/api/files/deliveries/${orderId}/${encodeURIComponent(filename)}`;
  }

  return `/assets/deliveries/${orderId}/${filename}`;
}

export function getOrderDeliveryFilePath(orderId: string, filename: string) {
  const safeName = path.basename(filename);
  return {
    dataPath: path.join(getDataDir(), "deliveries", orderId, safeName),
    publicPath: path.join(process.cwd(), "public/assets/deliveries", orderId, safeName),
  };
}

export function getUploadableFile(formData: FormData) {
  const entry = formData.get("file");
  if (!entry || typeof entry === "string") return null;
  if (!("arrayBuffer" in entry) || typeof entry.arrayBuffer !== "function") return null;

  const file = entry as UploadableFile & { size: number };
  if (!file.size) return null;
  return file;
}

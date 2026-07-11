import { promises as fs } from "fs";
import path from "path";

const THUMBNAIL_DIR = path.join(process.cwd(), "public/assets/thumbnails/resources");
const FILE_DIR = path.join(process.cwd(), "public/assets/downloads/resources");

export async function saveResourceThumbnail(file: Blob & { name?: string }, slug: string) {
  await fs.mkdir(THUMBNAIL_DIR, { recursive: true });

  const extension = file.name?.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "webp", "svg"].includes(extension)
    ? extension
    : "jpg";
  const filename = `${slug}.${safeExtension === "jpeg" ? "jpg" : safeExtension}`;
  const filepath = path.join(THUMBNAIL_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return `/assets/thumbnails/resources/${filename}`;
}

export async function saveResourceFile(file: Blob & { name?: string }, slug: string) {
  await fs.mkdir(FILE_DIR, { recursive: true });

  const originalName = file.name?.trim() || "download";
  const extension = originalName.split(".").pop()?.toLowerCase() || "zip";
  const baseName = originalName.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-");
  const filename = `${slug}-${baseName || "file"}.${extension}`;
  const filepath = path.join(FILE_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return `/assets/downloads/resources/${filename}`;
}

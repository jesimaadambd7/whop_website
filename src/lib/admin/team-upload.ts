import { promises as fs } from "fs";
import path from "path";

const TEAM_DIR = path.join(process.cwd(), "public/assets/team");

export async function saveTeamImage(file: Blob & { name?: string }, slug: string) {
  await fs.mkdir(TEAM_DIR, { recursive: true });

  const extension = file.name?.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "webp"].includes(extension)
    ? extension
    : "jpg";
  const filename = `${slug}.${safeExtension === "jpeg" ? "jpg" : safeExtension}`;
  const filepath = path.join(TEAM_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  return `/assets/team/${filename}`;
}

import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/admin/data-dir";

function storePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

export async function readJsonStore<T>(fileName: string, fallback: T): Promise<T> {
  const filePath = storePath(fileName);

  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`readJsonStore failed for ${fileName}:`, error);
    try {
      await writeJsonStore(fileName, fallback);
    } catch (seedError) {
      console.error(`readJsonStore seed failed for ${fileName}:`, seedError);
    }
    return fallback;
  }
}

export async function writeJsonStore<T>(fileName: string, data: T): Promise<void> {
  const dir = getDataDir();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(storePath(fileName), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`writeJsonStore failed for ${fileName}:`, error);
    throw error;
  }
}

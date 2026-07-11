import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/admin/data-dir";

function storePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

async function readBundledSeed<T>(fileName: string): Promise<T | null> {
  if (!process.env.VERCEL && !process.env.VERCEL_ENV) {
    return null;
  }

  try {
    const bundledPath = path.join(process.cwd(), "data", fileName);
    const raw = await fs.readFile(bundledPath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function readJsonStore<T>(
  fileName: string,
  fallback: T,
  isValid?: (value: unknown) => value is T,
): Promise<T> {
  const filePath = storePath(fileName);

  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (isValid && !isValid(parsed)) {
      throw new Error(`Invalid store payload for ${fileName}`);
    }
    return parsed as T;
  } catch (error) {
    console.error(`readJsonStore failed for ${fileName}:`, error);

    const bundled = await readBundledSeed<T>(fileName);
    if (bundled != null && (!isValid || isValid(bundled))) {
      try {
        await writeJsonStore(fileName, bundled);
      } catch (seedError) {
        console.error(`readJsonStore bundled seed failed for ${fileName}:`, seedError);
      }
      return bundled;
    }

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

import { promises as fs } from "fs";
import path from "path";
import { getBundledDataDir, getDataDir } from "@/lib/admin/data-dir";

function writableStorePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

function bundledStorePath(fileName: string) {
  return path.join(getBundledDataDir(), fileName);
}

function isReadOnlyFsError(error: unknown) {
  const code = (error as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function readBundledSeed<T>(fileName: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(bundledStorePath(fileName), "utf8");
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
  const writablePath = writableStorePath(fileName);

  const tryParse = (raw: string) => {
    const parsed = JSON.parse(raw) as unknown;
    if (isValid && !isValid(parsed)) {
      throw new Error(`Invalid store payload for ${fileName}`);
    }
    return parsed as T;
  };

  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    const raw = await fs.readFile(writablePath, "utf8");
    return tryParse(raw);
  } catch (writableError) {
    console.error(`readJsonStore writable read failed for ${fileName}:`, writableError);

    try {
      const bundledRaw = await fs.readFile(bundledStorePath(fileName), "utf8");
      const bundled = tryParse(bundledRaw);
      await writeJsonStore(fileName, bundled);
      return bundled;
    } catch {
      // Fall through to bundled seed object or coded fallback.
    }

    const bundled = await readBundledSeed<T>(fileName);
    if (bundled != null && (!isValid || isValid(bundled))) {
      await writeJsonStore(fileName, bundled);
      return bundled;
    }

    await writeJsonStore(fileName, fallback);
    return fallback;
  }
}

export async function writeJsonStore<T>(fileName: string, data: T): Promise<boolean> {
  const dir = getDataDir();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(writableStorePath(fileName), JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    if (isReadOnlyFsError(error)) {
      console.warn(
        `writeJsonStore skipped read-only filesystem for ${fileName} at ${writableStorePath(fileName)}`,
      );
      return false;
    }
    console.error(`writeJsonStore failed for ${fileName}:`, error);
    throw error;
  }
}

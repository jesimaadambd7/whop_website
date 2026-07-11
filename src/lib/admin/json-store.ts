import { promises as fs } from "fs";
import path from "path";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import {
  getBundledDataDir,
  getDataDir,
  isServerlessRuntime,
} from "@/lib/admin/data-dir";

const BLOB_PREFIX = "vidcarry-data";

function writableStorePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

function bundledStorePath(fileName: string) {
  return path.join(getBundledDataDir(), fileName);
}

function blobPath(fileName: string) {
  return `${BLOB_PREFIX}/${fileName}`;
}

export function useBlobStorage() {
  return isServerlessRuntime() && Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isReadOnlyFsError(error: unknown) {
  const code = (error as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function readBlobStore<T>(fileName: string): Promise<T | null> {
  try {
    const metadata = await head(blobPath(fileName));
    const response = await fetch(metadata.downloadUrl);
    if (!response.ok) {
      throw new Error(`Blob download failed with status ${response.status}`);
    }
    return JSON.parse(await response.text()) as T;
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return null;
    }
    console.error(`readBlobStore failed for ${fileName}:`, error);
    return null;
  }
}

async function writeBlobStore<T>(fileName: string, data: T): Promise<boolean> {
  try {
    await put(blobPath(fileName), JSON.stringify(data, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return true;
  } catch (error) {
    console.error(`writeBlobStore failed for ${fileName}:`, error);
    return false;
  }
}

async function readBundledSeed<T>(fileName: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(bundledStorePath(fileName), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function readWritableFile<T>(
  fileName: string,
  isValid?: (value: unknown) => value is T,
): Promise<T | null> {
  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    const raw = await fs.readFile(writableStorePath(fileName), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (isValid && !isValid(parsed)) {
      throw new Error(`Invalid store payload for ${fileName}`);
    }
    return parsed as T;
  } catch {
    return null;
  }
}

export async function readJsonStore<T>(
  fileName: string,
  fallback: T,
  isValid?: (value: unknown) => value is T,
): Promise<T> {
  if (useBlobStorage()) {
    const fromBlob = await readBlobStore<T>(fileName);
    if (fromBlob != null) {
      if (!isValid || isValid(fromBlob)) {
        return fromBlob;
      }
      console.error(`readJsonStore invalid blob payload for ${fileName}`);
    }
  }

  const fromWritable = await readWritableFile<T>(fileName, isValid);
  if (fromWritable != null) {
    if (useBlobStorage()) {
      await writeBlobStore(fileName, fromWritable);
    }
    return fromWritable;
  }

  try {
    const bundledRaw = await fs.readFile(bundledStorePath(fileName), "utf8");
    const bundled = JSON.parse(bundledRaw) as unknown;
    if (!isValid || isValid(bundled)) {
      await writeJsonStore(fileName, bundled as T);
      return bundled as T;
    }
  } catch {
    // Continue to coded fallback.
  }

  const bundled = await readBundledSeed<T>(fileName);
  if (bundled != null && (!isValid || isValid(bundled))) {
    await writeJsonStore(fileName, bundled);
    return bundled;
  }

  await writeJsonStore(fileName, fallback);
  return fallback;
}

export async function writeJsonStore<T>(fileName: string, data: T): Promise<boolean> {
  let blobSaved = false;
  if (useBlobStorage()) {
    blobSaved = await writeBlobStore(fileName, data);
  }

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
      return blobSaved;
    }
    console.error(`writeJsonStore failed for ${fileName}:`, error);
    if (blobSaved) return true;
    throw error;
  }
}

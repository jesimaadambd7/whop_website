import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { BlobNotFoundError, get, put } from "@vercel/blob";
import {
  getBundledDataDir,
  getDataDir,
  isServerlessRuntime,
} from "@/lib/admin/data-dir";
import {
  getPersistentStorageStatus,
  useBlobStorage,
  useRedisStorage,
} from "@/lib/admin/persistent-storage";

const BLOB_PREFIX = "ugcviss-data";

function writableStorePath(fileName: string) {
  return path.join(getDataDir(), fileName);
}

function bundledStorePath(fileName: string) {
  return path.join(getBundledDataDir(), fileName);
}

function blobPath(fileName: string) {
  return `${BLOB_PREFIX}/${fileName}`;
}

function redisKey(fileName: string) {
  return `ugcviss:store:${fileName}`;
}

export { getPersistentStorageStatus, useBlobStorage, useRedisStorage } from "@/lib/admin/persistent-storage";

function getRedisClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function isReadOnlyFsError(error: unknown) {
  const code = (error as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function readRedisStore<T>(fileName: string): Promise<T | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  try {
    const data = await redis.get<T>(redisKey(fileName));
    return data ?? null;
  } catch (error) {
    console.error(`readRedisStore failed for ${fileName}:`, error);
    return null;
  }
}

async function writeRedisStore<T>(fileName: string, data: T): Promise<boolean> {
  const redis = getRedisClient();
  if (!redis) return false;

  try {
    await redis.set(redisKey(fileName), data);
    return true;
  } catch (error) {
    console.error(`writeRedisStore failed for ${fileName}:`, error);
    return false;
  }
}

async function readBlobStore<T>(fileName: string): Promise<T | null> {
  try {
    const result = await get(blobPath(fileName), {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return null;
    }

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
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

function validateParsed<T>(parsed: unknown, isValid?: (value: unknown) => value is T): parsed is T {
  return !isValid || isValid(parsed);
}

export async function readJsonStore<T>(
  fileName: string,
  fallback: T,
  isValid?: (value: unknown) => value is T,
): Promise<T> {
  if (useRedisStorage()) {
    const fromRedis = await readRedisStore<T>(fileName);
    if (fromRedis != null && validateParsed(fromRedis, isValid)) {
      return fromRedis;
    }
  }

  if (useBlobStorage()) {
    const fromBlob = await readBlobStore<T>(fileName);
    if (fromBlob != null && validateParsed(fromBlob, isValid)) {
      return fromBlob;
    }
  }

  const fromWritable = await readWritableFile<T>(fileName, isValid);
  if (fromWritable != null) {
    await writeJsonStore(fileName, fromWritable);
    return fromWritable;
  }

  try {
    const bundledRaw = await fs.readFile(bundledStorePath(fileName), "utf8");
    const bundled = JSON.parse(bundledRaw) as unknown;
    if (validateParsed(bundled, isValid)) {
      await writeJsonStore(fileName, bundled as T);
      return bundled as T;
    }
  } catch {
    // Continue to coded fallback.
  }

  const bundled = await readBundledSeed<T>(fileName);
  if (bundled != null && validateParsed(bundled, isValid)) {
    await writeJsonStore(fileName, bundled);
    return bundled;
  }

  if (!isServerlessRuntime()) {
    await writeJsonStore(fileName, fallback);
  }

  return fallback;
}

export async function writeJsonStore<T>(fileName: string, data: T): Promise<boolean> {
  let persisted = false;

  if (useRedisStorage()) {
    persisted = (await writeRedisStore(fileName, data)) || persisted;
  }

  if (useBlobStorage()) {
    persisted = (await writeBlobStore(fileName, data)) || persisted;
  }

  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    await fs.writeFile(writableStorePath(fileName), JSON.stringify(data, null, 2), "utf8");
    if (!isServerlessRuntime()) {
      return true;
    }
  } catch (error) {
    if (!isReadOnlyFsError(error)) {
      console.error(`writeJsonStore filesystem cache failed for ${fileName}:`, error);
    }
  }

  if (isServerlessRuntime()) {
    return persisted;
  }

  return true;
}

export class PersistentStorageError extends Error {
  constructor(message = "Persistent storage is not configured for production.") {
    super(message);
    this.name = "PersistentStorageError";
  }
}

export async function requireJsonStoreWrite<T>(fileName: string, data: T) {
  const saved = await writeJsonStore(fileName, data);
  if (saved) return;

  const status = getPersistentStorageStatus();
  if (!status.configured) {
    throw new PersistentStorageError(
      "Inquiries cannot be saved on Vercel until you connect Redis or Blob storage.",
    );
  }

  throw new PersistentStorageError("Could not save admin data. Please try again.");
}

import { isServerlessRuntime } from "@/lib/admin/data-dir";

export type PersistentStorageBackend = "filesystem" | "redis" | "blob" | "none";

export function useRedisStorage() {
  if (!isServerlessRuntime()) return false;
  return Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  );
}

export function useBlobStorage() {
  if (!isServerlessRuntime()) return false;
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID),
  );
}

export function getPersistentStorageStatus(): {
  configured: boolean;
  backend: PersistentStorageBackend;
} {
  if (!isServerlessRuntime()) {
    return { configured: true, backend: "filesystem" };
  }
  if (useRedisStorage()) {
    return { configured: true, backend: "redis" };
  }
  if (useBlobStorage()) {
    return { configured: true, backend: "blob" };
  }
  return { configured: false, backend: "none" };
}

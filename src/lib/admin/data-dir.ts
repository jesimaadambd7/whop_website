import path from "path";

/**
 * Vercel serverless only allows writes under /tmp. Local dev uses ./data.
 */
export function getDataDir() {
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return path.join("/tmp", "vidcarry-data");
  }
  return path.join(process.cwd(), "data");
}

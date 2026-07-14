import path from "path";

/**
 * Vercel/AWS Lambda only allows writes under /tmp.
 * Local dev uses ./data.
 */
export function isServerlessRuntime() {
  if (process.env.VERCEL === "1") return true;
  if (process.env.VERCEL_ENV) return true;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  if (process.env.LAMBDA_TASK_ROOT) return true;
  if (process.env.AWS_EXECUTION_ENV?.includes("AWS_Lambda")) return true;
  // Vercel serverless bundles run from /var/task (read-only except /tmp).
  if (process.cwd().startsWith("/var/task")) return true;
  return false;
}

export function getDataDir() {
  if (isServerlessRuntime()) {
    return path.join("/tmp", "ugcviss-data");
  }
  return path.join(process.cwd(), "data");
}

export function getBundledDataDir() {
  return path.join(process.cwd(), "data");
}

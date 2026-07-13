import Whop from "@whop/sdk";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filename) {
  try {
    const text = readFileSync(resolve(process.cwd(), filename), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      if (!trimmed.includes("=")) continue;
      const eq = trimmed.indexOf("=");
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional file
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const apiKey = process.env.WHOP_API_KEY;
const isSandbox = process.env.WHOP_SANDBOX !== "false";
const webhookUrl =
  process.argv[2] || "https://whop-website.vercel.app/api/webhooks/whop";

if (!apiKey || apiKey.includes("your_key") || apiKey === "API key details") {
  console.error("Set WHOP_API_KEY in .env.local on a single line (apik_...).");
  process.exit(1);
}

const client = new Whop({
  apiKey,
  ...(isSandbox && { baseURL: "https://sandbox-api.whop.com/api/v1" }),
});

try {
  const companyId = process.env.WHOP_COMPANY_ID || (await client.accounts.me()).id;
  console.log("Using company:", companyId);

  const webhook = await client.webhooks.create({
    url: webhookUrl,
    api_version: "v1",
    events: ["payment.succeeded"],
    resource_id: companyId,
  });

  console.log("\nWebhook created successfully.\n");
  console.log("ID:", webhook.id);
  console.log("URL:", webhook.url);
  console.log("\nAdd this to .env.local and Vercel:\n");
  console.log(`WHOP_WEBHOOK_SECRET=${webhook.webhook_secret}`);
  console.log("\n(Save the secret now — Whop may not show it again.)\n");
} catch (error) {
  console.error("Failed to create webhook:\n");
  if (error?.status) console.error("Status:", error.status);
  if (error?.message) console.error(error.message);
  if (error?.error) console.error(JSON.stringify(error.error, null, 2));
  else console.error(error);
  process.exit(1);
}

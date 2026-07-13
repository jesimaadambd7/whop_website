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
    // optional
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const apiKey = process.env.WHOP_API_KEY;
const isSandbox = process.env.WHOP_SANDBOX !== "false";

if (!apiKey) {
  console.error("Set WHOP_API_KEY in .env.local");
  process.exit(1);
}

const client = new Whop({
  apiKey,
  ...(isSandbox && { baseURL: "https://sandbox-api.whop.com/api/v1" }),
});

const account = await client.accounts.me();
console.log("Company:", account.id, account.title || account.name || "");

const products = [];
for await (const product of client.products.list({ company_id: account.id })) {
  products.push(product);
}

console.log("\nProducts:");
for (const product of products) {
  console.log(`- ${product.id} | ${product.title || product.name || "Untitled"}`);
}

const plans = [];
for await (const plan of client.plans.list({ company_id: account.id })) {
  plans.push(plan);
}

console.log("\nPlans (use these in .env.local):");
for (const plan of plans) {
  const title = plan.title || plan.product?.title || plan.product_id || "Plan";
  console.log(`- ${plan.id} | ${title} | $${plan.initial_price ?? plan.price ?? "?"}`);
}

if (plans.length === 1) {
  console.log(`\nSuggested:\nNEXT_PUBLIC_WHOP_PLAN_UGC_AD_SPRINT=${plans[0].id}`);
}

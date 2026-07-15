import Whop from "@whop/sdk";
import { getPublicWhopPlanId } from "@/lib/whop-plans";

const apiKey = process.env.WHOP_API_KEY;
const isSandbox = process.env.WHOP_SANDBOX === "true";

export const whop = apiKey
  ? new Whop({
      apiKey,
      ...(isSandbox && { baseURL: "https://sandbox-api.whop.com/api/v1" }),
    })
  : null;

export function getWhopPlanId(slug: string): string | undefined {
  return getPublicWhopPlanId(slug);
}

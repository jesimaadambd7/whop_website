import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/data/site";

const SESSION_COOKIE = "ugcviss_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "ugcviss-dev-admin-secret";
}

export function getAdminEmails() {
  const fromEnv = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase());
  if (fromEnv?.length) return fromEnv;
  return [siteConfig.email.toLowerCase()];
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function signPayload(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

function encodeSession(email: string) {
  const payload = JSON.stringify({
    email: email.toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${signPayload(encoded)}`;
}

function decodeSession(token: string | undefined) {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signPayload(encoded);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };
    if (!parsed.email || parsed.exp < Date.now()) return null;
    if (!getAdminEmails().includes(parsed.email.toLowerCase())) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export function createSessionCookie(email: string) {
  return {
    name: SESSION_COOKIE,
    value: encodeSession(email),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

export function clearSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export function verifyAdminCredentials(email: string, password: string) {
  const allowedEmails = getAdminEmails();
  const adminPassword = getAdminPassword();
  if (!adminPassword) return false;

  return (
    allowedEmails.includes(email.trim().toLowerCase()) && password === adminPassword
  );
}

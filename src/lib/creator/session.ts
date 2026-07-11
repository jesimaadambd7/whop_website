import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCreatorById } from "@/lib/admin/creator-store";
import type { CreatorAccountPublic } from "@/lib/admin/creator-types";

const SESSION_COOKIE = "vidcarry_creator_session";
const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function sessionSecret() {
  return process.env.CREATOR_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || "vidcarry-dev-creator-secret";
}

function signPayload(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

function encodeSession(creatorId: string) {
  const payload = JSON.stringify({
    creatorId,
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
      creatorId: string;
      exp: number;
    };
    if (!parsed.creatorId || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function toSessionProfile(
  creator: Awaited<ReturnType<typeof getCreatorById>>,
): CreatorAccountPublic | null {
  if (!creator) return null;
  const { password: _password, ...profile } = creator;
  return profile;
}

export async function getCreatorSession() {
  const cookieStore = await cookies();
  const decoded = decodeSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!decoded) return null;

  const creator = await getCreatorById(decoded.creatorId);
  if (!creator || creator.status !== "approved") return null;
  return toSessionProfile(creator);
}

export async function requireCreatorSession() {
  const session = await getCreatorSession();
  if (!session) redirect("/creator/login");
  return session;
}

export function createCreatorSessionCookie(creatorId: string) {
  return {
    name: SESSION_COOKIE,
    value: encodeSession(creatorId),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

export function clearCreatorSessionCookie() {
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

export function decodeCreatorSessionToken(token: string | undefined) {
  return decodeSession(token);
}

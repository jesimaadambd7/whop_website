import { hashPassword, verifyPassword, isValidCreatorPassword } from "@/lib/admin/creator-auth";
import { deleteCreatorInquiries } from "@/lib/admin/submissions";
import { readJsonStore, writeJsonStore } from "@/lib/admin/json-store";
import type {
  CreatorAccount,
  CreatorAccountAdmin,
  CreatorAccountPublic,
  CreatorStats,
  CreatorStatus,
} from "@/lib/admin/creator-types";
import { createOrderId } from "@/lib/admin/order-utils";

const STORE_FILE = "creators-store.json";

function toAdmin(account: CreatorAccount): CreatorAccountAdmin {
  const { passwordHash: _passwordHash, ...adminAccount } = account;
  return {
    ...adminAccount,
    password: adminAccount.password ?? "",
  };
}

function toPublic(account: CreatorAccount): CreatorAccountPublic {
  const { passwordHash: _passwordHash, password: _password, ...publicAccount } = account;
  return publicAccount;
}

function normalizeAccount(account: CreatorAccount): CreatorAccount {
  return {
    ...account,
    password: account.password ?? "",
  };
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function readAll(): Promise<CreatorAccount[]> {
  const creators = await readJsonStore<CreatorAccount[]>(STORE_FILE, []);
  if (!Array.isArray(creators)) return [];
  return creators.filter((creator) => creator?.id && creator?.status).map(normalizeAccount);
}

async function writeAll(creators: CreatorAccount[]) {
  await writeJsonStore(STORE_FILE, creators);
}

export async function getCreatorById(id: string) {
  const creators = await readAll();
  const creator = creators.find((item) => item.id === id);
  return creator ? toAdmin(creator) : null;
}

export async function authenticateCreator(email: string, password: string) {
  const creators = await readAll();
  const normalized = normalizeEmail(email);
  const creator = creators.find((item) => normalizeEmail(item.email) === normalized);
  if (!creator || !verifyPassword(password, creator.passwordHash)) {
    return null;
  }
  return toAdmin(creator);
}

export async function listCreators(filters?: {
  status?: CreatorStatus | "";
}): Promise<CreatorAccountAdmin[]> {
  const creators = await readAll();
  return creators
    .filter((creator) => !filters?.status || creator.status === filters.status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(toAdmin);
}

export async function getCreator(id: string) {
  const creators = await readAll();
  const creator = creators.find((item) => item.id === id);
  return creator ? toAdmin(creator) : null;
}

export async function getCreatorStats(): Promise<CreatorStats> {
  const creators = await readAll();
  return creators.reduce(
    (stats, creator) => {
      if (creator.status in stats) {
        stats[creator.status] += 1;
      }
      stats.total += 1;
      return stats;
    },
    { pending: 0, approved: 0, rejected: 0, total: 0 },
  );
}

export async function createCreatorAccount(input: {
  displayName: string;
  username: string;
  email: string;
  password: string;
}) {
  const creators = await readAll();
  const username = input.username.trim();
  const email = normalizeEmail(input.email);
  const usernameKey = normalizeUsername(username);

  if (creators.some((creator) => normalizeUsername(creator.username) === usernameKey)) {
    throw new Error("That portfolio username is already taken.");
  }

  if (creators.some((creator) => normalizeEmail(creator.email) === email)) {
    throw new Error("An account with this email already exists.");
  }

  const now = new Date().toISOString();
  const account: CreatorAccount = {
    id: createOrderId(),
    displayName: input.displayName.trim(),
    username,
    email,
    password: input.password,
    passwordHash: hashPassword(input.password),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  creators.unshift(account);
  await writeAll(creators);
  return toPublic(account);
}

export async function updateCreatorStatus(id: string, status: CreatorStatus) {
  return updateCreator(id, { status });
}

export async function updateCreator(
  id: string,
  patch: { status?: CreatorStatus; password?: string },
) {
  const creators = await readAll();
  const index = creators.findIndex((creator) => creator.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const current = creators[index];
  const next: CreatorAccount = {
    ...current,
    updatedAt: now,
  };

  if (patch.status) {
    next.status = patch.status;
    next.reviewedAt = now;
  }

  if (patch.password != null) {
    if (!isValidCreatorPassword(patch.password)) {
      throw new Error(
        "Password must be 10+ characters with uppercase, lowercase, and a number.",
      );
    }
    next.password = patch.password;
    next.passwordHash = hashPassword(patch.password);
  }

  creators[index] = next;
  await writeAll(creators);
  return toAdmin(creators[index]);
}

export async function deleteCreator(id: string) {
  const creators = await readAll();
  const creator = creators.find((item) => item.id === id);
  if (!creator) return false;

  await deleteCreatorInquiries(creator.email, creator.username);

  const next = creators.filter((item) => item.id !== id);
  await writeAll(next);
  return true;
}

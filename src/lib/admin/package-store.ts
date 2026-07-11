import type {
  AdminPackage,
  CreatorPricing,
  PackageStoreData,
} from "@/lib/admin/package-types";
import {
  defaultAdminPackages,
  defaultCreatorPricing,
} from "@/lib/admin/package-seed";
import { readJsonStore, requireJsonStoreWrite } from "@/lib/admin/json-store";

const STORE_FILE = "packages-store.json";

const defaultStore = (): PackageStoreData => ({
  packages: defaultAdminPackages,
  creatorPricing: defaultCreatorPricing,
});

function isPackageStore(value: unknown): value is PackageStoreData {
  if (!value || typeof value !== "object") return false;
  const store = value as PackageStoreData;
  return (
    Array.isArray(store.packages) &&
    !!store.creatorPricing &&
    typeof store.creatorPricing.regularPrice === "number"
  );
}

function normalizePackageStore(
  value: unknown,
  fallback: PackageStoreData,
): PackageStoreData {
  if (!value || typeof value !== "object") return fallback;

  const store = value as Partial<PackageStoreData>;
  const creatorPricing =
    store.creatorPricing && typeof store.creatorPricing.regularPrice === "number"
      ? { ...fallback.creatorPricing, ...store.creatorPricing }
      : fallback.creatorPricing;

  return {
    packages: Array.isArray(store.packages) ? store.packages : fallback.packages,
    creatorPricing,
  };
}

async function readStore(): Promise<PackageStoreData> {
  const fallback = defaultStore();
  const data = await readJsonStore(STORE_FILE, fallback, isPackageStore);
  return normalizePackageStore(data, fallback);
}

async function writeStore(data: PackageStoreData) {
  await requireJsonStoreWrite(STORE_FILE, data);
}

export async function getPackageStore() {
  return readStore();
}

export async function listAdminPackages() {
  const store = await readStore();
  return [...store.packages].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAdminPackageById(id: string) {
  const store = await readStore();
  return store.packages.find((pkg) => pkg.id === id);
}

export async function getCreatorPricing() {
  const store = await readStore();
  return store.creatorPricing;
}

export async function saveCreatorPricing(pricing: CreatorPricing) {
  const store = await readStore();
  store.creatorPricing = pricing;
  await writeStore(store);
  return pricing;
}

export async function createAdminPackage(pkg: AdminPackage) {
  const store = await readStore();
  if (store.packages.some((item) => item.slug === pkg.slug)) {
    throw new Error("A package with this slug already exists.");
  }
  store.packages.push(pkg);
  await writeStore(store);
  return pkg;
}

export async function updateAdminPackage(pkg: AdminPackage) {
  const store = await readStore();
  const index = store.packages.findIndex((item) => item.id === pkg.id);
  if (index === -1) {
    throw new Error("Package not found.");
  }
  if (
    store.packages.some(
      (item) => item.slug === pkg.slug && item.id !== pkg.id,
    )
  ) {
    throw new Error("Another package already uses this slug.");
  }
  store.packages[index] = pkg;
  await writeStore(store);
  return pkg;
}

export async function deleteAdminPackage(id: string) {
  const store = await readStore();
  const index = store.packages.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Package not found.");
  }
  const [removed] = store.packages.splice(index, 1);
  await writeStore(store);
  return removed;
}

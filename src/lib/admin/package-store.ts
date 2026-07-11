import { promises as fs } from "fs";
import path from "path";
import type {
  AdminPackage,
  CreatorPricing,
  PackageStoreData,
} from "@/lib/admin/package-types";
import {
  defaultAdminPackages,
  defaultCreatorPricing,
} from "@/lib/admin/package-seed";
import { getDataDir } from "@/lib/admin/data-dir";

const DATA_DIR = getDataDir();
const STORE_PATH = path.join(DATA_DIR, "packages-store.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<PackageStoreData> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as PackageStoreData;
  } catch {
    const initial: PackageStoreData = {
      packages: defaultAdminPackages,
      creatorPricing: defaultCreatorPricing,
    };
    try {
      await writeStore(initial);
    } catch (error) {
      console.error("Could not persist package store seed:", error);
    }
    return initial;
  }
}

async function writeStore(data: PackageStoreData) {
  await ensureDataDir();
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
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

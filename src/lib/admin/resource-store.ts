import { promises as fs } from "fs";
import path from "path";
import type { AdminResource } from "@/lib/admin/resource-types";
import { defaultAdminResources } from "@/lib/admin/resource-seed";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "resources-store.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<AdminResource[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as AdminResource[];
  } catch {
    await writeStore(defaultAdminResources);
    return defaultAdminResources;
  }
}

async function writeStore(resources: AdminResource[]) {
  await ensureDataDir();
  await fs.writeFile(STORE_PATH, JSON.stringify(resources, null, 2), "utf8");
}

export async function listAdminResources() {
  const resources = await readStore();
  return [...resources].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function listPublishedAdminResources() {
  const resources = await readStore();
  return resources
    .filter((resource) => resource.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAdminResourceById(id: string) {
  const resources = await readStore();
  return resources.find((resource) => resource.id === id);
}

export async function getAdminResourceBySlug(slug: string) {
  const resources = await readStore();
  return resources.find((resource) => resource.slug === slug);
}

export async function createAdminResource(resource: AdminResource) {
  const resources = await readStore();
  if (resources.some((item) => item.slug === resource.slug)) {
    throw new Error("A resource with this slug already exists.");
  }
  resources.push(resource);
  await writeStore(resources);
  return resource;
}

export async function updateAdminResource(resource: AdminResource) {
  const resources = await readStore();
  const index = resources.findIndex((item) => item.id === resource.id);
  if (index === -1) {
    throw new Error("Resource not found.");
  }
  if (resources.some((item) => item.slug === resource.slug && item.id !== resource.id)) {
    throw new Error("Another resource already uses this slug.");
  }
  resources[index] = resource;
  await writeStore(resources);
  return resource;
}

export async function deleteAdminResource(id: string) {
  const resources = await readStore();
  const index = resources.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Resource not found.");
  }
  const [removed] = resources.splice(index, 1);
  await writeStore(resources);
  return removed;
}

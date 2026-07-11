import type { AdminResource } from "@/lib/admin/resource-types";
import { defaultAdminResources } from "@/lib/admin/resource-seed";
import { readJsonStore, writeJsonStore } from "@/lib/admin/json-store";

const STORE_FILE = "resources-store.json";

function isAdminResource(value: unknown): value is AdminResource {
  if (!value || typeof value !== "object") return false;
  const resource = value as AdminResource;
  return Boolean(resource.id && resource.slug && resource.title);
}

async function readStore(): Promise<AdminResource[]> {
  const fallback = defaultAdminResources;
  const data = await readJsonStore(STORE_FILE, fallback);
  if (!Array.isArray(data)) return fallback;
  const resources = data.filter(isAdminResource);
  return resources.length > 0 ? resources : fallback;
}

async function writeStore(resources: AdminResource[]) {
  await writeJsonStore(STORE_FILE, resources);
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

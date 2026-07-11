import type { VaultResource } from "@/lib/data/resources";
import { toVaultResource } from "@/lib/admin/resource-utils";

export async function loadPublishedVaultResources(): Promise<VaultResource[]> {
  const { listPublishedAdminResources } = await import("@/lib/admin/resource-store");
  const resources = await listPublishedAdminResources();
  return resources.map(toVaultResource);
}

export async function getPublishedVaultResourceBySlug(
  slug: string,
): Promise<VaultResource | undefined> {
  const { getAdminResourceBySlug } = await import("@/lib/admin/resource-store");
  const resource = await getAdminResourceBySlug(slug);
  if (!resource || resource.status !== "published") {
    return undefined;
  }
  return toVaultResource(resource);
}

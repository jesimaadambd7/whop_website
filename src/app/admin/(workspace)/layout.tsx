import { AdminWorkspace } from "@/components/admin/AdminWorkspace";
import { getAdminNotificationSnapshot } from "@/lib/admin/notifications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const initialSnapshot = await getAdminNotificationSnapshot();

  return <AdminWorkspace initialSnapshot={initialSnapshot}>{children}</AdminWorkspace>;
}

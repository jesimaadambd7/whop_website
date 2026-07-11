import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <AdminWorkspace>{children}</AdminWorkspace>;
}

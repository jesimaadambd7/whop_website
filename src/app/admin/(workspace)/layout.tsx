import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <AdminWorkspace>{children}</AdminWorkspace>;
}

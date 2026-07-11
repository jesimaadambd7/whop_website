import { AdminFooter } from "@/components/admin/AdminFooter";
import { AdminNotificationProvider } from "@/components/admin/AdminNotificationProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { AdminNotificationSnapshot } from "@/lib/admin/notification-types";

type Props = {
  children: React.ReactNode;
  initialSnapshot?: AdminNotificationSnapshot;
};

export function AdminWorkspace({ children, initialSnapshot }: Props) {
  return (
    <AdminNotificationProvider initialSnapshot={initialSnapshot}>
      <div className="min-h-screen bg-[#05070b] pb-28 text-white sm:pb-20 lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="min-w-0 overflow-hidden lg:h-screen lg:overflow-y-auto lg:pb-20">
          {children}
        </div>
        <AdminFooter />
      </div>
    </AdminNotificationProvider>
  );
}

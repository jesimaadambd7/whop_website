"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminNotifications } from "@/components/admin/AdminNotificationProvider";
import type { AdminNotificationCounts } from "@/lib/admin/notification-types";
import { adminNavItems } from "@/lib/data/admin-nav";
import { cn } from "@/lib/utils";

const NAV_BADGE_KEYS: Partial<Record<string, keyof AdminNotificationCounts>> = {
  "/admin/inquiries": "inquiries",
  "/admin/creators": "creators",
  "/admin/orders": "orders",
  "/admin/clients": "orders",
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { counts } = useAdminNotifications();

  return (
    <aside className="z-30 border-b border-white/10 bg-[#080b11] px-4 py-5 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden lg:border-b-0 lg:border-r lg:px-5 lg:pb-24 lg:pt-7">
      <div className="hidden shrink-0 lg:block">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-sky-300">
              UGCViss OS
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.04em]">Admin workspace</h2>
            <p className="mt-2 text-xs leading-5 text-zinc-600">
              Content, creators, leads, and commerce.
            </p>
          </div>

          {counts.total > 0 && (
            <div className="admin-notification-bell relative grid size-11 shrink-0 place-items-center rounded-2xl border border-sky-400/25 bg-sky-400/10">
              <span className="text-sm" aria-hidden>
                🔔
              </span>
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-sky-400 px-1.5 py-0.5 text-[10px] font-black text-black admin-notification-badge-pulse">
                {counts.total > 99 ? "99+" : counts.total}
              </span>
            </div>
          )}
        </div>
      </div>

      <nav
        className="flex gap-2 overflow-x-auto lg:mt-8 lg:min-h-0 lg:flex-1 lg:grid lg:auto-rows-max lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1"
        aria-label="Admin navigation"
      >
        {adminNavItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const badgeKey = NAV_BADGE_KEYS[item.href];
          const badgeCount = badgeKey ? counts[badgeKey] : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-bold transition",
                isActive
                  ? "border-sky-400/35 bg-sky-400/12 text-white"
                  : "border-transparent text-zinc-500 hover:border-white/10 hover:bg-white/[0.035] hover:text-white",
              )}
            >
              <span
                className={cn(
                  "relative grid size-8 place-items-center rounded-xl text-[10px] font-black tracking-[0.08em]",
                  isActive ? "bg-sky-400 text-black" : "bg-white/[0.05] text-zinc-500",
                )}
              >
                {item.badge}
                {badgeCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-rose-400 px-1 text-[9px] font-black text-black admin-notification-badge-pulse">
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <span>{item.label}</span>
                {badgeCount > 0 && (
                  <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-rose-100 lg:hidden">
                    {badgeCount}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

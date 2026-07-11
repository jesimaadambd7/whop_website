"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AdminNotificationCounts,
  AdminNotificationEvent,
  AdminNotificationSnapshot,
} from "@/lib/admin/notification-types";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "vidcarry_admin_notification_seen_v1";
const POLL_MS = 20_000;
const TOAST_LIFETIME_MS = 9_000;
const MAX_TOASTS = 4;

type AdminNotificationContextValue = {
  counts: AdminNotificationCounts;
  toasts: AdminNotificationEvent[];
  dismissToast: (id: string) => void;
};

const AdminNotificationContext = createContext<AdminNotificationContextValue | null>(null);

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error("useAdminNotifications must be used within AdminNotificationProvider.");
  }
  return context;
}

function readSeenIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function writeSeenIds(ids: Set<string>) {
  const trimmed = [...ids].slice(-300);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

const ACCENT_STYLES = {
  sky: {
    ring: "border-sky-400/35",
    glow: "admin-toast-glow-sky",
    badge: "bg-sky-400/15 text-sky-200",
    icon: "✦",
  },
  amber: {
    ring: "border-amber-300/35",
    glow: "admin-toast-glow-amber",
    badge: "bg-amber-300/15 text-amber-100",
    icon: "◎",
  },
  emerald: {
    ring: "border-emerald-400/35",
    glow: "admin-toast-glow-emerald",
    badge: "bg-emerald-400/15 text-emerald-100",
    icon: "✓",
  },
  violet: {
    ring: "border-violet-400/35",
    glow: "admin-toast-glow-violet",
    badge: "bg-violet-400/15 text-violet-100",
    icon: "◈",
  },
  rose: {
    ring: "border-rose-400/35",
    glow: "admin-toast-glow-rose",
    badge: "bg-rose-400/15 text-rose-100",
    icon: "✉",
  },
} as const;

function AdminNotificationToast({
  event,
  onDismiss,
}: {
  event: AdminNotificationEvent;
  onDismiss: () => void;
}) {
  const accent = ACCENT_STYLES[event.accent];

  return (
    <div
      className={cn(
        "admin-toast-enter pointer-events-auto relative overflow-hidden rounded-[1.6rem] border bg-[#0a0f18]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl",
        accent.ring,
        accent.glow,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent admin-toast-shimmer" />

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-2xl border text-sm font-black admin-toast-icon-pulse",
            accent.badge,
            accent.ring,
          )}
        >
          {accent.icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
            New activity
          </p>
          <p className="mt-1 font-display text-base font-black tracking-[-0.03em] text-white">
            {event.title}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-400">{event.message}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={event.href}
              onClick={onDismiss}
              className="rounded-full bg-sky-400 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
            >
              Open
            </Link>
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminNotificationProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<AdminNotificationCounts>({
    inquiries: 0,
    creators: 0,
    orders: 0,
    total: 0,
  });
  const [toasts, setToasts] = useState<AdminNotificationEvent[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const enqueueToasts = useCallback((events: AdminNotificationEvent[]) => {
    if (events.length === 0) return;

    setToasts((current) => {
      const existing = new Set(current.map((event) => event.id));
      const next = [...current];

      for (const event of events) {
        if (existing.has(event.id)) continue;
        next.unshift(event);
        existing.add(event.id);
      }

      return next.slice(0, MAX_TOASTS);
    });
  }, []);

  const applySnapshot = useCallback(
    (snapshot: AdminNotificationSnapshot, announce: boolean) => {
      setCounts(snapshot.counts);

      if (!announce) {
        for (const event of snapshot.events) {
          seenIdsRef.current.add(event.id);
        }
        writeSeenIds(seenIdsRef.current);
        return;
      }

      const fresh = snapshot.events.filter((event) => !seenIdsRef.current.has(event.id));
      for (const event of fresh) {
        seenIdsRef.current.add(event.id);
      }
      if (fresh.length > 0) {
        writeSeenIds(seenIdsRef.current);
        enqueueToasts(fresh);
      }
    },
    [enqueueToasts],
  );

  useEffect(() => {
    seenIdsRef.current = readSeenIds();

    async function poll(announce: boolean) {
      try {
        const response = await fetch("/api/admin/notifications", {
          credentials: "same-origin",
          cache: "no-store",
        });
        if (!response.ok) return;
        const snapshot = (await response.json()) as AdminNotificationSnapshot;
        applySnapshot(snapshot, announce);
      } catch {
        // Ignore transient polling errors.
      }
    }

    void poll(false).then(() => {
      initializedRef.current = true;
    });

    const interval = window.setInterval(() => {
      if (!initializedRef.current) return;
      void poll(true);
    }, POLL_MS);

    function onFocus() {
      if (!initializedRef.current) return;
      void poll(true);
    }

    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [applySnapshot]);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismissToast(toast.id), TOAST_LIFETIME_MS),
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [toasts, dismissToast]);

  const value = useMemo(
    () => ({
      counts,
      toasts,
      dismissToast,
    }),
    [counts, toasts, dismissToast],
  );

  return (
    <AdminNotificationContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 top-4 z-[180] flex flex-col items-end gap-3 px-4 sm:top-6 sm:px-6">
        {toasts.map((toast) => (
          <div key={toast.id} className="w-full max-w-sm">
            <AdminNotificationToast event={toast} onDismiss={() => dismissToast(toast.id)} />
          </div>
        ))}
      </div>
    </AdminNotificationContext.Provider>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CreatorAccountPublic } from "@/lib/admin/creator-types";

type Props = {
  creator: CreatorAccountPublic;
  children: React.ReactNode;
};

export function CreatorDashboardShell({ creator, children }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/creators/logout", { method: "POST" });
    router.push("/creator/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-[#05070b]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="UGCViss home">
              <Image
                src="/assets/brand/vidcarry-logo-transparent.png"
                alt="UGCViss"
                width={1774}
                height={267}
                className="h-auto w-[140px] object-contain sm:w-[160px]"
              />
            </Link>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                Creator dashboard
              </p>
              <p className="mt-1 text-sm text-zinc-400">{creator.displayName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/creator/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
            >
              Purchases
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-300 transition hover:border-red-300/40 hover:text-red-200"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">{children}</main>
    </div>
  );
}

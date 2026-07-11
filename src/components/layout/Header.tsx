"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group" aria-label="VidCarry home">
          <span className="inline-flex items-center">
            <Image
              src="/assets/brand/vidcarry-logo-transparent.png"
              alt="VidCarry"
              width={1774}
              height={267}
              priority
              className="h-auto w-[180px] object-contain transition duration-300 group-hover:brightness-125 sm:w-[210px] lg:w-[230px]"
            />
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => {
            const base = item.href.split("#")[0];
            const isActive =
              pathname === item.href ||
              (base !== "/" && pathname.startsWith(base));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-bold transition hover:bg-white/10 hover:text-white xl:px-4",
                  isActive ? "text-white" : "text-zinc-400",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          href="/contact#book-call"
          size="sm"
          className="hidden lg:inline-flex"
        >
          Book a Call
        </Button>

        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span>Menu</span>
            <span className="grid gap-1">
              <span
                className={cn(
                  "h-0.5 w-4 rounded-full bg-current transition",
                  mobileOpen && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-4 rounded-full bg-current transition",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-4 rounded-full bg-current transition",
                  mobileOpen && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 text-sm font-bold text-zinc-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 border-t border-white/10 pt-4">
                <Button href="/contact#book-call" className="w-full">
                  Book a Call
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reset scroll position on route changes. Hash links (e.g. /contact#book-call)
 * are left to the browser and page-specific hash scroll handlers.
 */
export function RouteScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

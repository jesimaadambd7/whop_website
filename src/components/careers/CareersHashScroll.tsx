"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const APPLY_HASHES = new Set(["apply", "application-form"]);

export function CareersHashScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentHash = window.location.hash.replace("#", "");
    if (!APPLY_HASHES.has(currentHash)) return;

    const target = document.getElementById("application-form");
    if (!target) return;

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [searchParams]);

  return null;
}

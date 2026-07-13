"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CinematicHeadlineShineProps = {
  children: React.ReactNode;
  className?: string;
};

export function CinematicHeadlineShine({
  children,
  className,
}: CinematicHeadlineShineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={cn("cine-headline-shine relative inline-block", className)}>
      {children}
      {!prefersReducedMotion && (
        <span className="cine-headline-shine__beam pointer-events-none absolute inset-0" aria-hidden="true" />
      )}
    </span>
  );
}

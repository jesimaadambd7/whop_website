"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedGlassCardProps = {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  variant?: "card" | "panel" | "chip";
  rounded?: string;
  /** Stretch card + body to fill grid row height */
  stretch?: boolean;
};

const roundedByVariant = {
  card: "rounded-3xl",
  panel: "rounded-[2.5rem]",
  chip: "rounded-2xl",
};

export function AnimatedGlassCard({
  children,
  className,
  bodyClassName,
  variant = "card",
  rounded,
  stretch = false,
}: AnimatedGlassCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const radius = rounded ?? roundedByVariant[variant];
  const fillHeight = stretch || variant !== "chip";

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { y: variant === "panel" ? -5 : -4 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div
      className={cn(
        "glass-card group/glass relative isolate",
        fillHeight && "h-full",
        variant === "panel" && "glass-card--panel",
        variant === "chip" && "glass-card--chip",
        radius,
        className,
      )}
      {...motionProps}
    >
      <div
        className={cn(
          "glass-card__body relative z-10 flex",
          fillHeight && "h-full flex-col",
          radius,
          bodyClassName,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

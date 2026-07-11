"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export function AnimatedCard({
  children,
  className,
  glow = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "animated-border group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6",
        "transition-colors duration-500",
        "hover:border-sky-400/40 hover:bg-sky-400/[0.04]",
        "hover:shadow-[0_16px_48px_rgba(0,188,254,0.12)]",
        glow && "glow-sky-hover",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

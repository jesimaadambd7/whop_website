"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const floatingDots = [
  { left: "14%", top: "20%", delay: 0 },
  { left: "82%", top: "16%", delay: 0.5 },
  { left: "88%", top: "68%", delay: 0.9 },
  { left: "20%", top: "74%", delay: 1.2 },
];

export function CareersApplicationSuccessCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="inquiry-success-shell relative overflow-hidden rounded-[2.5rem]">
      <div className="inquiry-success-border pointer-events-none absolute -inset-[1px] rounded-[2.55rem]" />

      <div className="inquiry-success-card relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(155deg,rgba(8,47,73,0.55),rgba(2,6,23,0.98))] p-8 text-center sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(56,189,248,0.22),transparent_58%)]" />
        <div className="inquiry-success-scanline pointer-events-none absolute inset-0 opacity-25" />

        {!prefersReducedMotion &&
          floatingDots.map((dot, index) => (
            <motion.span
              key={index}
              aria-hidden
              className="pointer-events-none absolute h-2 w-2 rounded-full bg-sky-400/80 shadow-[0_0_16px_rgba(56,189,248,0.9)]"
              style={{ left: dot.left, top: dot.top }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.35, 1, 0.35],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
            />
          ))}

        <div className="relative z-[1]">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.05 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-400/12 text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.25)]"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.34em] text-sky-300"
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
            />
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            Application received
          </motion.p>

          <motion.h3
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl"
          >
            Thanks for applying to VidCarry.
          </motion.h3>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8"
          >
            We review portfolio quality and communication first. If your work is a strong fit, we
            will follow up about next steps.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AuditThankYou() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card audit-success-card relative flex min-h-[28rem] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-sky-400/30 bg-white/[0.035] p-10 text-center sm:min-h-[32rem] sm:p-14"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(56,189,248,0.12),transparent_60%)]"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.h3
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl"
      >
        Thank you! We&apos;ll review your brief.
      </motion.h3>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8"
      >
        We review fit first, then reply with the clearest next creative move.
      </motion.p>
    </motion.div>
  );
}

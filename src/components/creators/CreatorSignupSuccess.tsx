"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function CreatorSignupSuccess() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[24rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-sky-400/30 bg-black/35 p-8 text-center sm:min-h-[28rem] sm:p-10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(56,189,248,0.14),transparent_60%)]"
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

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] grid h-16 w-16 place-items-center rounded-full border border-sky-400/40 bg-sky-400/10 text-2xl font-black text-sky-300"
      >
        ✓
      </motion.div>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mt-6 text-xs font-black uppercase tracking-[0.28em] text-sky-400"
      >
        Account created
      </motion.p>

      <motion.h3
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mt-4 font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl"
      >
        Please wait for admin approval.
      </motion.h3>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8"
      >
        Your creator account is in review. After approval, log in to open your dashboard and view
        purchases, status updates, replies, and delivery links.
      </motion.p>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          href="/creator-portfolios"
          className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-black text-black transition hover:bg-white"
        >
          How it works
        </Link>
        <Link
          href="/creator/login"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300"
        >
          Back to login
        </Link>
      </motion.div>
    </motion.div>
  );
}

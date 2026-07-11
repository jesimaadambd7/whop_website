"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CheckCircle2, Mail, Sparkles } from "lucide-react";

const floatingDots = [
  { left: "12%", top: "18%", delay: 0 },
  { left: "78%", top: "14%", delay: 0.4 },
  { left: "86%", top: "62%", delay: 0.8 },
  { left: "18%", top: "72%", delay: 1.1 },
  { left: "52%", top: "8%", delay: 0.6 },
];

const nextSteps = [
  "We review your product, audience, and creative bottleneck.",
  "You get scope questions or a direct call link by email.",
  "Pick a time below if you want to move faster.",
];

export function InquirySuccessCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="inquiry-success-shell relative overflow-hidden rounded-[2.5rem]">
      <div className="inquiry-success-border pointer-events-none absolute -inset-[1px] rounded-[2.55rem]" />

      <div className="inquiry-success-card relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(155deg,rgba(8,47,73,0.55),rgba(2,6,23,0.98))] p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.28),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(34,211,238,0.16),transparent_42%)]" />
        <div className="inquiry-success-scanline pointer-events-none absolute inset-0 opacity-25" />

        {!prefersReducedMotion &&
          floatingDots.map((dot, index) => (
            <motion.span
              key={index}
              aria-hidden
              className="pointer-events-none absolute h-2 w-2 rounded-full bg-sky-400/80 shadow-[0_0_16px_rgba(56,189,248,0.9)]"
              style={{ left: dot.left, top: dot.top }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.35, 1, 0.35],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: 3.2,
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
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-sky-300"
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
            />
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            Inquiry sent
          </motion.p>

          <motion.h3
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl"
          >
            Thanks — we will review your brief.
          </motion.h3>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4 max-w-xl text-base leading-8 text-zinc-300"
          >
            We usually reply with next steps, shoot or ad scope questions, and a call link.
            You can also pick a time below while you wait.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            className="mt-7 grid gap-3"
          >
            {nextSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + index * 0.08, duration: 0.35 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
              >
                <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-xs font-black text-sky-300">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-7 text-zinc-300">{step}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.4 }}
            className="mt-7 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5 text-sm text-zinc-400"
          >
            <span className="inline-flex items-center gap-2 font-semibold text-sky-200/90">
              <Mail className="h-4 w-4" />
              Watch your inbox for our reply
            </span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="inline-flex items-center gap-2 font-bold text-sky-300"
            >
              <ArrowDown className="h-4 w-4" />
              Book a call below
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

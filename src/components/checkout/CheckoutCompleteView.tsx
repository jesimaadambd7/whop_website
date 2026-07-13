"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

type CheckoutCompleteViewProps = {
  status: "success" | "error" | "processing";
  itemTitle: string;
  slug: string;
  isResource: boolean;
  orderId?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function StatusIcon({
  status,
  prefersReducedMotion,
}: {
  status: CheckoutCompleteViewProps["status"];
  prefersReducedMotion: boolean | null;
}) {
  if (status === "processing") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease }}
        className="relative grid h-20 w-20 place-items-center"
      >
        <span className="absolute inset-0 rounded-full border border-sky-400/25" />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Wait</span>
      </motion.div>
    );
  }

  const isSuccess = status === "success";
  const ringClass = isSuccess ? "border-emerald-400/45" : "border-red-400/45";
  const glowClass = isSuccess ? "bg-emerald-400/15" : "bg-red-400/15";
  const iconClass = isSuccess ? "text-emerald-300" : "text-red-300";

  return (
    <div className="relative grid h-20 w-20 place-items-center">
      {!prefersReducedMotion && (
        <>
          <motion.span
            aria-hidden
            className={`absolute inset-0 rounded-full ${glowClass}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.45, 0.15, 0.45], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className={`absolute -inset-3 rounded-full border ${ringClass}`}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: [0.55, 0], scale: [1, 1.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </>
      )}

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease }}
        className={`relative z-[1] grid h-20 w-20 place-items-center rounded-full border ${ringClass} ${glowClass}`}
      >
        {isSuccess ? (
          <motion.svg
            viewBox="0 0 24 24"
            className={`h-9 w-9 ${iconClass}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.18, ease }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            viewBox="0 0 24 24"
            className={`h-9 w-9 ${iconClass}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            aria-hidden
          >
            <motion.path
              d="M6 6l12 12M18 6L6 18"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.12, ease }}
            />
          </motion.svg>
        )}
      </motion.div>
    </div>
  );
}

export function CheckoutCompleteView({
  status,
  itemTitle,
  slug,
  isResource,
  orderId,
}: CheckoutCompleteViewProps) {
  const prefersReducedMotion = useReducedMotion();

  const title =
    status === "success"
      ? "Payment successful!"
      : status === "error"
        ? "Payment failed"
        : "Processing...";

  const description =
    status === "success"
      ? isResource
        ? `Your ${itemTitle} is unlocked. Log in with the same checkout email to access downloads in your library.`
        : `Your ${itemTitle} is confirmed. We'll open your private client workspace and contact you shortly.`
      : status === "error"
        ? "Something went wrong while processing your payment. Please try again or contact support if the issue continues."
        : "We're confirming your payment. This usually takes just a moment.";

  const accent =
    status === "success" ? "emerald" : status === "error" ? "red" : "sky";

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.08),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative z-[1] w-full max-w-xl px-5"
      >
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/40 px-8 py-12 text-center shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-12 sm:py-14">
          <motion.div
            aria-hidden
            className={
              accent === "emerald"
                ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.12),transparent_58%)]"
                : accent === "red"
                  ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,113,113,0.1),transparent_58%)]"
                  : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_58%)]"
            }
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          />

          <div className="relative z-[1] flex flex-col items-center">
            <StatusIcon status={status} prefersReducedMotion={prefersReducedMotion} />

            {status === "success" && !prefersReducedMotion ? (
              <motion.div aria-hidden className="pointer-events-none absolute top-2 flex gap-3">
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-300/80"
                    initial={{ opacity: 0, y: 8, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], y: [-4, -18, -28], scale: [0.6, 1, 0.4] }}
                    transition={{
                      duration: 1.6,
                      delay: 0.35 + index * 0.12,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            ) : null}

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease }}
              className={`mt-8 text-xs font-black uppercase tracking-[0.28em] ${
                accent === "emerald"
                  ? "text-emerald-400"
                  : accent === "red"
                    ? "text-red-400"
                    : "text-sky-400"
              }`}
            >
              {status === "success"
                ? "Order confirmed"
                : status === "error"
                  ? "Payment issue"
                  : "Almost there"}
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="mt-4 font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-5 max-w-md text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8"
            >
              {description}
            </motion.p>

            {orderId && status === "success" ? (
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.48, ease }}
                className="mt-5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-500"
              >
                Reference: <span className="font-mono text-zinc-300">{orderId}</span>
              </motion.p>
            ) : null}

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55, ease }}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              {status === "success" && isResource ? (
                <Button href="/resources/library" size="lg">
                  Go to My Library
                </Button>
              ) : null}

              {status === "error" ? (
                <Button href={`/checkout/${slug}`} size="lg">
                  Try Again
                </Button>
              ) : null}

              {status !== "error" && !isResource ? (
                <Button href="/" variant="secondary" size="lg">
                  Back to Home
                </Button>
              ) : null}

              {status === "success" && !isResource ? (
                <Link
                  href={`/packages/${slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:border-sky-400/40 hover:text-white"
                >
                  View package
                </Link>
              ) : null}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

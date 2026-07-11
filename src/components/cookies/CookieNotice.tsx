"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { cn } from "@/lib/utils";

const outlineButtonClass =
  "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition hover:border-sky-400/45 hover:bg-sky-400/10 hover:text-sky-100";

const acceptButtonClass =
  "inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_28px_rgba(0,168,255,0.22)] transition hover:bg-white hover:border-white";

export function CookieNotice() {
  const { showBanner, acceptAll, declineAll, openPreferences } = useCookieConsent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {showBanner ? (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-notice-title"
          aria-describedby="cookie-notice-description"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 pt-2 sm:px-6 sm:pb-6"
        >
          <div
            className={cn(
              "mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-black/88 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6",
              "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8",
            )}
          >
            <div>
              <p
                id="cookie-notice-title"
                className="text-xs font-black uppercase tracking-[0.34em] text-sky-400"
              >
                Cookie Notice
              </p>
              <p
                id="cookie-notice-description"
                className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300 sm:text-[15px] sm:leading-8"
              >
                We use essential cookies to make our site work. With your consent, we may also use
                non-essential cookies to improve user experience and analyze website traffic. By
                clicking &apos;Accept,&apos; you agree to our website&apos;s cookie use as described
                in our Cookie Policy. You can review options before saving by clicking
                &apos;Preferences.&apos;
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <Link href="/cookie-policy" className="text-sky-400 transition hover:text-white">
                  Read Cookie Policy
                </Link>
                <Link href="/privacy-policy" className="text-sky-400 transition hover:text-white">
                  Read Privacy Policy
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
              <button type="button" onClick={openPreferences} className={outlineButtonClass}>
                Preferences
              </button>
              <button type="button" onClick={declineAll} className={outlineButtonClass}>
                Decline
              </button>
              <button type="button" onClick={acceptAll} className={acceptButtonClass}>
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

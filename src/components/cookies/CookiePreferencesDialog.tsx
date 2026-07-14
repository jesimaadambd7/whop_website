"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { cn } from "@/lib/utils";

type PreferenceRowProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative mt-1 h-7 w-12 shrink-0 rounded-full border transition",
          disabled
            ? "cursor-not-allowed border-white/10 bg-white/10"
            : checked
              ? "border-sky-400 bg-sky-400"
              : "border-white/15 bg-white/[0.04]",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition",
            checked ? "left-[1.35rem]" : "left-1",
            disabled && "bg-zinc-300",
          )}
        />
      </button>
    </div>
  );
}

export function CookiePreferencesDialog() {
  const {
    showPreferences,
    draftPreferences,
    closePreferences,
    setDraftPreference,
    savePreferences,
    acceptAll,
    declineAll,
  } = useCookieConsent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {showPreferences ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close cookie preferences"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closePreferences}
          />

          <motion.div
            role="dialog"
            aria-labelledby="cookie-preferences-title"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] w-full max-w-2xl rounded-[2rem] border border-white/10 bg-black/92 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Cookie Preferences
            </p>
            <h2
              id="cookie-preferences-title"
              className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white"
            >
              Choose which optional cookies to allow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Essential cookies stay on so the site works and your consent choice is remembered.
              Optional cookies help improve experience and analytics only when enabled.
            </p>

            <div className="mt-6 grid gap-3">
              <PreferenceRow
                title="Essential cookies"
                description="Required for security, page loading, and saving your cookie consent choice."
                checked
                disabled
              />
              <PreferenceRow
                title="Experience cookies"
                description="Help remember preferences and improve how the website feels on future visits."
                checked={draftPreferences.experience}
                onChange={(value) => setDraftPreference("experience", value)}
              />
              <PreferenceRow
                title="Analytics cookies"
                description="Help UGCViss understand traffic, page performance, and campaign behavior."
                checked={draftPreferences.analytics}
                onChange={(value) => setDraftPreference("analytics", value)}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/cookie-policy" className="text-sky-400 transition hover:text-white">
                Read Cookie Policy
              </Link>
              <Link href="/privacy-policy" className="text-sky-400 transition hover:text-white">
                Read Privacy Policy
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={declineAll}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition hover:border-sky-400/45 hover:bg-sky-400/10"
              >
                Decline optional
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition hover:border-sky-400/45 hover:bg-sky-400/10"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_28px_rgba(0,168,255,0.22)] transition hover:bg-white hover:border-white"
              >
                Accept all
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, CheckCircle2, ExternalLink, Radio } from "lucide-react";
import { BookingCalendar } from "@/components/contact/BookingCalendar";
import {
  calendlySchedulingUrl,
  calendlyUrl,
  formatCalendlyDate,
  getCalendlyEmbedUrl,
  getDefaultBookingDate,
} from "@/lib/data/contact";

function CalendarEmbedSkeleton() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col gap-5 bg-[#020617]/96 p-6 backdrop-blur-md">
      <div className="space-y-3">
        <div className="booking-shimmer h-5 w-44 rounded-full" />
        <div className="booking-shimmer h-4 w-72 rounded-full opacity-70" />
      </div>
      <div className="mt-1 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="booking-shimmer min-h-[72px] rounded-2xl border border-white/5"
          />
        ))}
      </div>
      <motion.p
        className="text-center text-xs font-bold uppercase tracking-[0.24em] text-sky-300/80"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Loading time slots
      </motion.p>
    </div>
  );
}

function BookingSuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]/92 p-6 backdrop-blur-md"
    >
      <div className="booking-success-card relative w-full max-w-md overflow-hidden rounded-[2rem] border border-sky-400/30 bg-[linear-gradient(155deg,rgba(8,47,73,0.92),rgba(2,6,23,0.98))] p-8 text-center shadow-[0_0_60px_rgba(56,189,248,0.22)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_55%)]" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 18, delay: 0.08 }}
          className="relative z-[1] mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/15 text-emerald-300"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>
        <h3 className="relative z-[1] mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white">
          You are scheduled
        </h3>
        <p className="relative z-[1] mt-3 text-sm leading-7 text-zinc-300">
          Calendar invite sent. We will use the call to map your next creative sprint.
        </p>
        <div className="relative z-[1] mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-sky-400/50 hover:bg-sky-400/10"
          >
            Open invitation
            <ExternalLink className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-5 py-3 text-sm font-black text-black transition hover:border-sky-300 hover:bg-sky-300"
          >
            Book another time
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function CalendlyBookingPanel() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedDate, setSelectedDate] = useState(getDefaultBookingDate);
  const [embedDomain, setEmbedDomain] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setEmbedDomain(window.location.hostname);
  }, []);

  const embedUrl = useMemo(() => {
    if (!embedDomain) return null;
    return getCalendlyEmbedUrl({
      date: formatCalendlyDate(selectedDate),
      embedDomain,
    });
  }, [selectedDate, embedDomain]);

  const openCalendlyUrl = useMemo(() => {
    const date = formatCalendlyDate(selectedDate);
    return `${calendlySchedulingUrl}?date=${date}`;
  }, [selectedDate]);

  const selectedLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    function handleCalendlyMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (
        typeof event.data === "object" &&
        event.data !== null &&
        "event" in event.data &&
        event.data.event === "calendly.event_scheduled"
      ) {
        setScheduled(true);
      }
    }

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  function handleDateSelect(date: Date) {
    setIframeLoaded(false);
    setScheduled(false);
    setSelectedDate(date);
  }

  function handleResetBooking() {
    setScheduled(false);
    setIframeLoaded(false);
    setIframeKey((value) => value + 1);
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="booking-panel-shell relative z-[1] overflow-hidden rounded-[1.65rem]"
    >
      <div className="booking-panel-border pointer-events-none absolute -inset-[1px] rounded-[1.7rem]" />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-zinc-950 shadow-[0_0_80px_rgba(0,168,255,0.14)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/80 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-3 border-b border-white/10 bg-black/55 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-sky-400">
              <motion.span
                className="relative flex h-2 w-2"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </motion.span>
              Live booking
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-400">
              Pick a date, then choose your time slot on the right.
            </p>
          </div>
          <Link
            href={openCalendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 justify-center rounded-full border border-sky-400/35 bg-sky-400 px-4 py-2 text-sm font-black text-black transition hover:border-sky-300 hover:bg-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Open Calendly
          </Link>
        </div>

        <div className="grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:divide-x lg:divide-white/10">
          <div className="border-b border-white/10 p-3 sm:p-4 lg:border-b-0">
            <BookingCalendar selected={selectedDate} onSelect={handleDateSelect} />
          </div>

          <div className="relative min-h-[520px] overflow-hidden bg-[#020617] sm:min-h-[560px] lg:min-h-[620px]">
            <div className="relative z-[1] border-b border-white/10 bg-black/35 px-4 py-3 sm:px-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLabel}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/25 bg-sky-400/10 text-sky-300">
                    <CalendarClock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-zinc-500">
                      Selected day
                    </p>
                    <p className="text-sm font-bold text-white">{selectedLabel}</p>
                  </div>
                  <span className="ml-auto hidden items-center gap-1.5 text-xs font-bold text-sky-300/80 sm:inline-flex">
                    <Radio className="h-3.5 w-3.5" />
                    Slots updating
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {!iframeLoaded && !scheduled && (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CalendarEmbedSkeleton />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {scheduled && <BookingSuccessCard onReset={handleResetBooking} />}
            </AnimatePresence>

            <motion.div
              key={`${embedUrl ?? "loading"}-${iframeKey}`}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: iframeLoaded ? 1 : 0.35, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative p-3 sm:p-4"
            >
              <div className="calendly-embed-frame overflow-hidden rounded-[1.35rem] border border-sky-400/20 bg-white shadow-[0_0_48px_rgba(56,189,248,0.14)]">
                {embedUrl ? (
                  <iframe
                    title="Book a UGCViss strategy call on Calendly"
                    src={embedUrl}
                    onLoad={() => setIframeLoaded(true)}
                    className="block h-[460px] w-full bg-white sm:h-[500px] lg:h-[560px]"
                  />
                ) : (
                  <div className="flex h-[460px] items-center justify-center bg-white sm:h-[500px] lg:h-[560px]">
                    <p className="text-sm font-semibold text-zinc-500">Preparing scheduler…</p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-xs leading-6 text-zinc-500">
                If the embed shows an error,{" "}
                <Link
                  href={openCalendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-sky-400 underline-offset-2 hover:text-sky-300 hover:underline"
                >
                  open Calendly in a new tab
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { formatCalendlyDate } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type BookingCalendarProps = {
  selected: Date;
  onSelect: (date: Date) => void;
};

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const cells: Array<Date | null> = [];

  for (let i = 0; i < mondayOffset; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      animate={{
        y: [0, -14, 0],
        x: [0, 8, 0],
        opacity: [0.35, 0.65, 0.35],
        scale: [1, 1.12, 1],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function BookingCalendar({ selected, onSelect }: BookingCalendarProps) {
  const prefersReducedMotion = useReducedMotion();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => ({
    year: selected.getFullYear(),
    month: selected.getMonth(),
  }));
  const [pulseKey, setPulseKey] = useState(0);

  const cells = useMemo(
    () => buildMonthGrid(viewMonth.year, viewMonth.month),
    [viewMonth.month, viewMonth.year]
  );

  const monthLabel = new Date(viewMonth.year, viewMonth.month, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  function shiftMonth(delta: number) {
    setViewMonth((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  function handleSelect(date: Date) {
    setPulseKey((value) => value + 1);
    onSelect(date);
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="booking-calendar-shell relative"
    >
      <div className="booking-calendar-border pointer-events-none absolute -inset-[1px] rounded-[1.75rem]" />

      <div className="booking-calendar relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(155deg,rgba(2,6,23,0.98),rgba(8,47,73,0.55))] p-5 sm:p-6">
        <FloatingOrb
          className="left-[-12%] top-[-8%] h-28 w-28 bg-sky-400/25"
          delay={0}
        />
        <FloatingOrb
          className="bottom-[-10%] right-[-8%] h-32 w-32 bg-cyan-400/20"
          delay={1.4}
        />
        <div className="booking-calendar-scanline pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.22),transparent_42%),radial-gradient(circle_at_90%_100%,rgba(14,165,233,0.16),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-[1]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <motion.p
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-sky-300"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: [0.75, 1, 0.75] }
                }
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                Select date
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={monthLabel}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: -10, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-1 font-display text-2xl font-black tracking-[-0.04em] text-white"
                >
                  {monthLabel}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              {[
                { delta: -1, label: "Previous month", Icon: ChevronLeft },
                { delta: 1, label: "Next month", Icon: ChevronRight },
              ].map(({ delta, label, Icon }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => shiftMonth(delta)}
                  aria-label={label}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-sky-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-sky-400/55 hover:bg-sky-400/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2">
            {weekdayLabels.map((label) => (
              <div
                key={label}
                className="pb-1 text-center text-[0.68rem] font-black uppercase tracking-[0.2em] text-zinc-500"
              >
                {label}
              </div>
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMonth.year}-${viewMonth.month}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: 28, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, x: -28, filter: "blur(8px)" }
                }
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="contents"
              >
                {cells.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const isPast = date < today;
                  const isSelected = isSameDay(date, selected);
                  const isToday = isSameDay(date, today);
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const isAvailable = !isPast;

                  return (
                    <motion.button
                      key={formatCalendlyDate(date)}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleSelect(date)}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, scale: 0.72, y: 10 }
                      }
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 26,
                        delay: prefersReducedMotion ? 0 : 0.02 + (index % 7) * 0.03,
                      }}
                      whileHover={
                        isAvailable && !prefersReducedMotion
                          ? { scale: 1.1, y: -3 }
                          : undefined
                      }
                      whileTap={
                        isAvailable && !prefersReducedMotion
                          ? { scale: 0.92 }
                          : undefined
                      }
                      className={cn(
                        "booking-date-cell group relative flex aspect-square items-center justify-center rounded-2xl text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80",
                        isPast && "cursor-not-allowed text-zinc-600",
                        isAvailable &&
                          !isSelected &&
                          "booking-date-cell--available border border-white/10 bg-white/[0.04] text-zinc-100",
                        isAvailable &&
                          !isSelected &&
                          isWeekend &&
                          "text-zinc-400",
                        isSelected && "booking-date-cell--selected z-[2] text-black",
                        isToday && !isSelected && "ring-1 ring-sky-300/35"
                      )}
                    >
                      {isAvailable && !isSelected && (
                        <span className="booking-date-cell__ring pointer-events-none absolute inset-0 rounded-2xl" />
                      )}

                      <span className="relative z-[2]">{date.getDate()}</span>

                      {isAvailable && !isSelected && (
                        <motion.span
                          className="absolute bottom-1.5 left-1/2 z-[2] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }
                          }
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: (index % 5) * 0.15,
                          }}
                        />
                      )}

                      {isSelected && (
                        <>
                          <motion.span
                            key={pulseKey}
                            className="pointer-events-none absolute inset-0 rounded-2xl bg-sky-300/35"
                            initial={{ scale: 0.7, opacity: 0.8 }}
                            animate={{ scale: 1.45, opacity: 0 }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                          />
                          <span className="booking-date-cell__selected-fill pointer-events-none absolute inset-0 rounded-2xl" />
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs font-semibold text-zinc-400"
          >
            <span className="inline-flex items-center gap-2">
              <span className="booking-legend-dot relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-300 to-cyan-400" />
              Available
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-white/25 bg-white/10" />
              Unavailable
            </span>
            <span className="inline-flex items-center gap-2 text-sky-200/80">
              <CalendarCheck2 className="h-3.5 w-3.5" />
              {selected.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

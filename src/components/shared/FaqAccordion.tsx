"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FaqAccordionItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FaqAccordionItem({
  question,
  answer,
  defaultOpen = false,
}: FaqAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "glass-card group overflow-hidden rounded-[1.75rem] border bg-black/45 transition-colors duration-300",
        open ? "border-sky-400/45" : "border-white/10 hover:border-sky-400/45",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="relative z-[1] flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
      >
        <span className="font-display text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-2xl font-black text-sky-400 group-hover:border-sky-400/45"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7">
              <motion.p
                initial={prefersReducedMotion ? false : { y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { y: -6, opacity: 0 }}
                transition={{ duration: 0.32, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FaqAccordionListProps = {
  items: { question: string; answer: string }[];
  defaultOpenIndex?: number | null;
};

function FaqAccordionGroup({
  items,
  defaultOpenIndex = null,
}: FaqAccordionListProps) {
  return (
    <div className="grid gap-4">
      {items.map((faq, i) => (
        <FaqAccordionItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          defaultOpen={defaultOpenIndex === i}
        />
      ))}
    </div>
  );
}

export function FaqAccordionList({ items }: FaqAccordionListProps) {
  return <FaqAccordionGroup items={items} defaultOpenIndex={0} />;
}

type FaqAccordionProps = {
  items: { question: string; answer: string }[];
  defaultOpen?: number | null;
};

export function FaqAccordion({ items, defaultOpen = null }: FaqAccordionProps) {
  return <FaqAccordionGroup items={items} defaultOpenIndex={defaultOpen} />;
}

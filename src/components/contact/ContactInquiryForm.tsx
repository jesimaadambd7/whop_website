"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { InquirySuccessCard } from "@/components/contact/InquirySuccessCard";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { contactBudgetOptions, contactServiceOptions } from "@/lib/data/contact";
import { submitAdminForm } from "@/lib/admin/submit-form";

const labelClass =
  "text-sm font-black uppercase tracking-[0.2em] text-zinc-500";

const inputClass =
  "mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

export function ContactInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitAdminForm("contact", e.currentTarget, (payload) =>
        `Project inquiry: ${payload.service ?? "General"}`,
      );
      setSubmitted(true);
    } catch {
      window.alert("Unable to send inquiry right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="inquiry-success"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <InquirySuccessCard />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="contact-form"
        initial={false}
        exit={
          prefersReducedMotion
            ? undefined
            : { opacity: 0, scale: 0.98, y: -12, filter: "blur(4px)" }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatedGlassCard
          variant="panel"
          rounded="rounded-[2.5rem]"
          className="w-full"
          bodyClassName="contact-inquiry-form__body p-5 sm:p-8"
        >
          <form
            id="inquiry-form"
            onSubmit={handleSubmit}
            className="relative z-[1]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  placeholder="Brand or agency"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="website" className={labelClass}>
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {contactServiceOptions.map((option) => (
                    <option key={option} value={option} className="bg-zinc-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className={labelClass}>
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {contactBudgetOptions.map((option) => (
                    <option key={option} value={option} className="bg-zinc-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="details" className={labelClass}>
                  Project Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  rows={6}
                  placeholder="Tell us about the product, audience, timeline, creative needs, and where the ads will run."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full border border-sky-400 bg-sky-400 px-6 py-4 text-sm font-black text-black transition hover:border-sky-300 hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
              <p className="text-sm leading-6 text-zinc-500">
                We usually reply with next steps, shoot or ad scope questions, and a call
                link.
              </p>
            </div>
          </form>
        </AnimatedGlassCard>
      </motion.div>
    </AnimatePresence>
  );
}

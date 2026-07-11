"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AuditThankYou } from "@/components/shared/AuditThankYou";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { submitAdminForm } from "@/lib/admin/submit-form";

const adSpendOptions = [
  "Not running ads yet",
  "$1k - $5k / month",
  "$5k - $20k / month",
  "$20k - $50k / month",
  "$50k+ / month",
];

const reviewItems = [
  "Your current offer and landing promise",
  "Your strongest and weakest hooks",
  "What footage or proof is missing",
  "What the next creative sprint should test",
];

const labelClass =
  "text-sm font-black uppercase tracking-[0.2em] text-zinc-500";

const inputClass =
  "mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

export function AuditFormSection({
  id = "creative-audit",
  bordered = false,
}: {
  id?: string;
  bordered?: boolean;
} = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitAdminForm("creative-audit", e.currentTarget, (payload) =>
        `Creative audit: ${payload.website ?? "No website provided"}`,
      );
      setSubmitted(true);
    } catch {
      window.alert("Unable to submit audit request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SectionShell id={id} withGrid={false} bordered={bordered} className={bordered ? "border-t" : undefined}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <aside>
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
                  Creative audit
                </p>
                <h2 className="font-display text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl">
                  Get a free ad creative audit before the next sprint.
                </h2>
                <p className="mt-5 text-base leading-8 text-zinc-400">
                  Share your site, current creative context, and bottleneck. We will review
                  the fit and suggest the clearest next creative move.
                </p>
              </div>

              <div className="glass-card mt-8 rounded-[2.25rem] border border-white/10 bg-black/45 p-6 sm:p-7">
                <div className="relative z-[1]">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-400">
                    What we review
                  </p>
                  <div className="mt-5 grid gap-3">
                    {reviewItems.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                        <p className="text-sm font-bold leading-6 text-zinc-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <AuditThankYou key="thanks" />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={false}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, scale: 0.98, y: -16, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 sm:p-8"
                >
                <div className="relative z-[1] grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="audit-name" className={labelClass}>
                      Name<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <input
                      id="audit-name"
                      name="name"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-email" className={labelClass}>
                      Email<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <input
                      id="audit-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@brand.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="audit-company"
                      name="company"
                      placeholder="Brand name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-website" className={labelClass}>
                      Website<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <input
                      id="audit-website"
                      name="website"
                      type="url"
                      required
                      placeholder="https://"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-spend" className={labelClass}>
                      Monthly ad spend<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <select
                      id="audit-spend"
                      name="monthlySpend"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select range
                      </option>
                      {adSpendOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-zinc-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="audit-current" className={labelClass}>
                      Current creative link
                    </label>
                    <input
                      id="audit-current"
                      name="currentCreative"
                      type="url"
                      placeholder="Ad library, Drive, TikTok, Meta, YouTube..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-bottleneck" className={labelClass}>
                      Creative bottleneck<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <textarea
                      id="audit-bottleneck"
                      name="bottleneck"
                      required
                      rows={5}
                      placeholder="What is not working right now? Hooks, footage, editing, ad fatigue, conversions?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-goal" className={labelClass}>
                      Campaign goal<span className="ml-1 text-sky-400">*</span>
                    </label>
                    <textarea
                      id="audit-goal"
                      name="goal"
                      required
                      rows={5}
                      placeholder="What do you want the next creative sprint to improve?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="relative z-[1] mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full border border-sky-400 bg-sky-400 px-7 py-4 text-sm font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Get Free Creative Audit"}
                  </button>
                  <p className="text-sm leading-6 text-zinc-500">
                    We review fit first, then reply with the clearest next creative move.
                  </p>
                </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

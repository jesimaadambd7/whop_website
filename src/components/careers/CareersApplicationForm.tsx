"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CareersApplicationSuccessCard } from "@/components/careers/CareersApplicationSuccessCard";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { useScrollSuccessIntoView } from "@/hooks/useScrollSuccessIntoView";
import {
  careerRoles,
  experienceLevels,
  workPreferences,
  type CareerRole,
} from "@/lib/data/careers";
import { submitAdminForm } from "@/lib/admin/submit-form";

const labelClass = "text-sm font-black uppercase tracking-[0.2em] text-zinc-500";
const inputClass =
  "mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

type CareersApplicationFormProps = {
  selectedRoleId?: string;
};

function getDefaultRoleTitle(roleId?: string) {
  if (!roleId) return "";
  return careerRoles.find((role) => role.id === roleId)?.title ?? "";
}

export function CareersApplicationForm({ selectedRoleId }: CareersApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState(() => getDefaultRoleTitle(selectedRoleId));
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useScrollSuccessIntoView(submitted, {
    containerRef,
    successRef,
    targetId: "application-form",
    waitMs: prefersReducedMotion ? 0 : 400,
  });

  useEffect(() => {
    const nextRole = getDefaultRoleTitle(selectedRoleId);
    if (nextRole) setRole(nextRole);
  }, [selectedRoleId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setSubmitting(true);
    try {
      await submitAdminForm("career", event.currentTarget, (payload) =>
        `Career application: ${payload.role ?? "General application"}`,
      );
      setSubmitted(true);
    } catch {
      window.alert("Unable to submit application right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={containerRef} className="w-full min-h-[28rem] sm:min-h-[36rem]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="careers-success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full outline-none"
          >
            <CareersApplicationSuccessCard />
          </motion.div>
        ) : (
        <motion.div
          key="careers-form"
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
          bodyClassName="careers-application-form__body p-5 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="relative z-[1]">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full name<span className="ml-1 text-sky-400">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email<span className="ml-1 text-sky-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  WhatsApp / phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="off"
                  placeholder="+1 000 000 0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>
                  Location<span className="ml-1 text-sky-400">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  required
                  placeholder="Country, city, timezone"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="role" className={labelClass}>
                  Role applying for<span className="ml-1 text-sky-400">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {careerRoles.map((careerRole: CareerRole) => (
                    <option key={careerRole.id} value={careerRole.title}>
                      {careerRole.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="experienceLevel" className={labelClass}>
                  Experience level<span className="ml-1 text-sky-400">*</span>
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select experience
                  </option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="portfolioLink" className={labelClass}>
                  Portfolio / reel link<span className="ml-1 text-sky-400">*</span>
                </label>
                <input
                  id="portfolioLink"
                  name="portfolioLink"
                  type="url"
                  required
                  placeholder="https://"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cvLink" className={labelClass}>
                  CV / resume link
                </label>
                <input
                  id="cvLink"
                  name="cvLink"
                  type="url"
                  placeholder="Google Drive, Dropbox, personal site..."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="linkedin" className={labelClass}>
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="socialLinks" className={labelClass}>
                  Social links
                </label>
                <input
                  id="socialLinks"
                  name="socialLinks"
                  placeholder="Instagram, TikTok, YouTube, Behance..."
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tools" className={labelClass}>
                  Tools you use
                </label>
                <input
                  id="tools"
                  name="tools"
                  placeholder="Premiere Pro, After Effects, DaVinci, CapCut, Meta Ads, Notion..."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="availability" className={labelClass}>
                  Availability<span className="ml-1 text-sky-400">*</span>
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  required
                  rows={4}
                  placeholder="Hours per week, timezone overlap, earliest start date..."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="expectedRate" className={labelClass}>
                  Expected rate
                </label>
                <textarea
                  id="expectedRate"
                  name="expectedRate"
                  rows={4}
                  placeholder="Hourly, per video, per project, monthly retainer, or salary expectation."
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="workPreference" className={labelClass}>
                  Work preference<span className="ml-1 text-sky-400">*</span>
                </label>
                <select
                  id="workPreference"
                  name="workPreference"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select preference
                  </option>
                  {workPreferences.map((preference) => (
                    <option key={preference} value={preference}>
                      {preference}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="productionExperience" className={labelClass}>
                  Production experience
                </label>
                <textarea
                  id="productionExperience"
                  name="productionExperience"
                  rows={4}
                  placeholder="Tell us about shoot, creator, ad, ecommerce, or agency experience."
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="intro" className={labelClass}>
                  Short intro<span className="ml-1 text-sky-400">*</span>
                </label>
                <textarea
                  id="intro"
                  name="intro"
                  required
                  rows={6}
                  placeholder="Why do you want to work with UGCViss? What type of production work are you strongest at? Share 2-3 specific examples."
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <label className="flex gap-3 text-sm font-bold leading-6 text-zinc-300">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  value="yes"
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-sky-400 focus:ring-sky-400"
                />
                <span>
                  I agree that UGCViss can review my application, portfolio links, and contact
                  details for hiring, freelance, or production network opportunities under the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-sky-300 underline decoration-sky-300/40 underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full border border-sky-400 bg-sky-400 px-7 py-4 text-sm font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Apply Now"}
              </button>
              <p className="text-sm leading-6 text-zinc-500">
                Portfolio links matter most. Show the kind of work you want to do more of.
              </p>
            </div>
          </form>
        </AnimatedGlassCard>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CareerRoleCard } from "@/components/careers/CareerRoleCard";
import { CareersApplicationForm } from "@/components/careers/CareersApplicationForm";
import { CareersHashScroll } from "@/components/careers/CareersHashScroll";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  applicationChecklist,
  buildJobPostingSchema,
  careerRoles,
  careerStats,
  careerValues,
  getRoleById,
  hiringProcess,
  productionStandards,
} from "@/lib/data/careers";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "UGCViss Careers - Production, Video Editing & Creative Jobs",
  description:
    "Apply to join UGCViss's global production network across video editing, motion graphics, UGC creative strategy, shoot production, videography, casting, creator partnerships, and paid social ads.",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/careers#webpage`,
  url: `${siteConfig.url}/careers`,
  name: "UGCViss Careers - Production, Video Editing & Creative Jobs",
  description:
    "Apply to join UGCViss's global production network across video editing, motion graphics, UGC creative strategy, shoot production, videography, casting, creator partnerships, and paid social ads.",
  inLanguage: "en",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "UGCViss Careers - Production, Video Editing & Creative Jobs",
      item: `${siteConfig.url}/careers`,
    },
  ],
};

type CareersPageProps = {
  searchParams?: {
    role?: string;
  };
};

export default function CareersPage({ searchParams }: CareersPageProps) {
  const selectedRoleId = searchParams?.role;
  const selectedRole = selectedRoleId ? getRoleById(selectedRoleId) : undefined;
  const applyHeading = selectedRole
    ? `Apply for ${selectedRole.title}.`
    : "Apply to join the UGCViss production network.";

  return (
    <>
      <Suspense fallback={null}>
        <CareersHashScroll />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {careerRoles.map((role) => (
        <script
          key={role.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJobPostingSchema(role)) }}
        />
      ))}

      <PageHero
        eyebrow="Careers"
        title="Join UGCViss's production network."
        description="We are building a global team of editors, motion designers, strategists, producers, videographers, casting partners, and paid ads specialists who can turn products into sales-focused creative."
      />

      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,168,255,0.14),transparent_28%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.06),transparent_22%)]"
        />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
                Production hiring
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
                We hire people who can make campaign work move faster.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                UGCViss works with ecommerce and DTC brands that need model shoots, UGC ads, paid
                social creatives, editing, motion graphics, creator production, and ad campaign
                support. If your work can lift that standard, we want to see it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#open-roles"
                  className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-sky-400 px-6 py-4 text-sm font-bold tracking-tight text-black shadow-[0_0_32px_rgba(0,168,255,0.28)] transition hover:border-white hover:bg-white sm:px-7"
                >
                  View Open Roles
                </Link>
                <Link
                  href="#application-form"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold tracking-tight text-white transition hover:border-sky-400/80 hover:bg-sky-400/10 sm:px-7"
                >
                  Apply Now
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {careerStats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08}>
                  <AnimatedGlassCard
                    variant="panel"
                    rounded="rounded-[2rem]"
                    className="w-full"
                    bodyClassName="p-6"
                  >
                    <p className="relative z-[1] font-display text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="relative z-[1] mt-2 text-sm font-bold leading-6 text-zinc-400">
                      {stat.label}
                    </p>
                  </AnimatedGlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              What we value
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              The kind of people who fit UGCViss.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              We are a production and performance creative team. The best fit is someone who brings
              craft, speed, communication, and commercial thinking together.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {careerValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <AnimatedGlassCard
                  variant="panel"
                  rounded="rounded-[2rem]"
                  className="w-full h-full"
                  bodyClassName="p-7"
                >
                  <article className="relative z-[1]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-sky-400/25 bg-sky-400/10 font-display text-lg font-black text-sky-300">
                      {value.number}
                    </span>
                    <h2 className="mt-6 font-display text-3xl font-black tracking-[-0.05em] text-white">
                      {value.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-400">{value.description}</p>
                  </article>
                </AnimatedGlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="open-roles"
        className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24"
      >
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Open roles
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Production roles we are hiring for.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              These roles can be remote, project-based, part-time, retainer, or future full-time
              depending on fit, workload, location, and campaign needs.
            </p>
          </Reveal>

          <div className="grid gap-6">
              {careerRoles.map((role, index) => (
              <Reveal key={role.id} delay={index * 0.05}>
                <CareerRoleCard
                  role={role}
                  highlighted={selectedRoleId === role.id}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Hiring process
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              How applications move through UGCViss.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              We keep the process practical. Portfolio quality and communication matter more than
              long interviews.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {hiringProcess.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08}>
                <AnimatedGlassCard
                  variant="panel"
                  rounded="rounded-[2rem]"
                  className="w-full h-full"
                  bodyClassName="p-6"
                >
                  <article className="relative z-[1]">
                    <p className="font-display text-5xl font-black tracking-[-0.06em] text-sky-400">
                      {step.step}
                    </p>
                    <h2 className="mt-5 font-display text-2xl font-black tracking-[-0.04em] text-white">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{step.description}</p>
                  </article>
                </AnimatedGlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-white/[0.02] py-20 sm:scroll-mt-28 sm:py-24">
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Production standards
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              What your application should prove.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              When you apply, make it easy for us to understand your best work, your workflow, and
              where you can help the UGCViss production system.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <AnimatedGlassCard
                variant="panel"
                rounded="rounded-[2.5rem]"
                className="w-full border-sky-400/25 bg-sky-400"
                bodyClassName="p-7 text-black sm:p-9"
              >
                <p className="relative z-[1] text-xs font-black uppercase tracking-[0.3em]">
                  Show proof
                </p>
                <h2 className="relative z-[1] mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  Send the work you want us to judge you by.
                </h2>
                <p className="relative z-[1] mt-5 text-base font-semibold leading-8 text-black/70">
                  A strong application includes a reel, 3 to 5 relevant work samples, your exact
                  role in each project, tools used, turnaround speed, and the type of projects you
                  want more of.
                </p>
              </AnimatedGlassCard>
            </aside>

            <div className="grid gap-4">
              {productionStandards.map((standard, index) => (
                <Reveal key={standard} delay={index * 0.06}>
                  <AnimatedGlassCard
                    variant="panel"
                    rounded="rounded-[1.75rem]"
                    className="w-full"
                    bodyClassName="p-5"
                  >
                    <div className="relative z-[1] flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-sky-400/25 bg-sky-400/10 text-sm font-black text-sky-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-bold leading-7 text-zinc-300">{standard}</p>
                    </div>
                  </AnimatedGlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="apply"
        className="relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24"
      >
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Apply
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {applyHeading}
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Fill this out with your best links and clear availability. This application saves your
              details for UGCViss review, but it does not guarantee hiring or project assignment.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <AnimatedGlassCard
                variant="panel"
                rounded="rounded-[2.5rem]"
                className="w-full"
                bodyClassName="p-7 sm:p-9"
              >
                <p className="relative z-[1] text-xs font-black uppercase tracking-[0.3em] text-sky-400">
                  Application checklist
                </p>
                <h2 className="relative z-[1] mt-4 font-display text-4xl font-black tracking-[-0.05em] text-white">
                  Before you submit.
                </h2>
                <div className="relative z-[1] mt-6 grid gap-4">
                  {applicationChecklist.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                      <p className="text-sm font-bold leading-6 text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="relative z-[1] mt-6 text-sm leading-7 text-zinc-500">
                  Actors, models, UGC creators, influencers, and celebrity talent can also use the
                  dedicated{" "}
                  <Link
                    href="/talent/invitation"
                    className="text-sky-300 underline decoration-sky-300/40 underline-offset-4"
                  >
                    talent video submission page
                  </Link>
                  .
                </p>
              </AnimatedGlassCard>
            </aside>

            <div id="application-form" className="scroll-mt-28">
              <CareersApplicationForm selectedRoleId={selectedRoleId} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import type { FounderJourney } from "@/lib/data/founder-journey";
import { siteConfig } from "@/lib/data/site";

type FounderJourneyPageProps = {
  journey: FounderJourney;
};

export function FounderJourneyPage({ journey }: FounderJourneyPageProps) {
  const { member } = journey;
  const pageUrl = `${siteConfig.url}/team/${member.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${member.name} - ${member.role} of VidCarry`,
    description: journey.heroDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Team", item: `${siteConfig.url}/team` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${member.name} - ${member.role} of VidCarry`,
        item: pageUrl,
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: journey.profileBio,
    image: member.image ? `${siteConfig.url}${member.image}` : undefined,
    sameAs: member.linkedin,
    url: pageUrl,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="aurora-orb absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,168,255,0.13),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%)]"
        />

        <Container className="relative">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-sky-400/50 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span aria-hidden="true">&lt;-</span>
            Team
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-sky-400">
                {journey.heroEyebrow}
              </p>
              <h1 className="mt-5 font-display text-5xl font-black tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                {journey.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl sm:leading-9">
                {journey.heroDescription}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {journey.heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
                  >
                    <p className="font-display text-2xl font-black tracking-[-0.05em] text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="premium-panel glow-card rounded-[2rem] border border-white/10 bg-black/50 p-5">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-white/10 bg-sky-400/10">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name} profile photo`}
                    fill
                    sizes="380px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#020617,#0369a1)] font-display text-6xl font-black text-sky-100">
                    {member.initials}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                    {member.role}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.05em] text-white">
                    {member.name}
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-zinc-400">{journey.profileBio}</p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full border border-sky-400/35 bg-sky-400/10 px-4 py-2 text-sm font-black text-sky-100 transition hover:border-sky-400 hover:bg-sky-400 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  View LinkedIn
                </a>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      <SectionShell>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              {journey.timelineEyebrow}
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {journey.timelineTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              {journey.timelineDescription}
            </p>
          </Reveal>

          <div className="relative mx-auto max-w-5xl">
            <div
              aria-hidden
              className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-sky-400 via-white/15 to-transparent sm:block"
            />

            <div className="grid gap-5">
              {journey.chapters.map((chapter) => (
                <article
                  key={chapter.step}
                  className="premium-panel glow-card grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-400/45 sm:grid-cols-[72px_1fr] sm:p-7"
                >
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-sky-400/30 bg-sky-400/10 font-black text-sky-300 shadow-[0_0_35px_rgba(0,168,255,0.12)]">
                      {chapter.step}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.26em] text-sky-400">
                      {chapter.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white">
                      {chapter.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-zinc-400">{chapter.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              {journey.founderNoteEyebrow}
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {journey.founderNoteTitle}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="premium-panel glow-card mx-auto max-w-4xl rounded-[2.25rem] border border-white/10 bg-black/45 p-7 sm:p-10">
              <p className="text-lg leading-9 text-zinc-300">{journey.founderNoteBody}</p>
            </div>
          </Reveal>
        </Container>
      </SectionShell>

      <CtaBanner title={journey.ctaTitle} />
    </>
  );
}

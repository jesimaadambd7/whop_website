import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Service } from "@/lib/data/services";
import { services } from "@/lib/data/services";

type ServiceDetailViewProps = {
  service: Service;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const related = services.filter((item) => item.id !== service.id).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.description}
      />

      <SectionShell>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
                <Image
                  src={service.image}
                  alt={`${service.title} — UGCViss service`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]"
                />
                <div className="absolute bottom-5 left-5">
                  <span className="icon-box">{service.abbr}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-400">
                  Deliverables
                </p>
                <ul className="mt-4 space-y-3">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-sky-400/25 bg-sky-400/10 p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                  Ideal for
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-200">{service.idealFor}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-sky-400 bg-sky-400 px-5 py-2.5 text-sm font-black text-black transition hover:bg-sky-300"
                >
                  Book a strategy call
                </Link>
                <Link
                  href="/services"
                  className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-black text-white transition hover:border-sky-400 hover:text-sky-300"
                >
                  All services
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </SectionShell>

      <SectionShell bordered>
        <Container>
          <Reveal className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.34em] text-sky-400">
              Related services
            </p>
            <h2 className="font-display text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Explore more production and paid creative services.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.id}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-sky-400/40 hover:bg-sky-400/5"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                  {item.abbr}
                </p>
                <h3 className="mt-2 font-display text-xl font-black tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </SectionShell>

      <CtaBanner title={`Start a ${service.title.toLowerCase()} sprint with UGCViss.`} />
    </>
  );
}

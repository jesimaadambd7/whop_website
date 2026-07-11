"use client";

import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { ServiceCardMedia } from "@/components/shared/ServiceCardMedia";
import type { Service } from "@/lib/data/services";

type ServiceDetailCardProps = {
  service: Service;
  eager?: boolean;
};

export function ServiceDetailCard({ service, eager = false }: ServiceDetailCardProps) {
  return (
    <article id={service.id} className="scroll-mt-28">
      <AnimatedGlassCard
        stretch
        rounded="rounded-[2rem]"
        bodyClassName="flex h-full flex-col overflow-hidden bg-white/[0.035] p-0"
      >
        <ServiceCardMedia service={service} eager={eager} />

        <div className="relative z-[1] flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-white transition duration-400 group-hover/glass:text-sky-100">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
            {service.description}
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-400">
                Deliverables
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-bold text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
                Ideal for
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{service.idealFor}</p>
            </div>
          </div>
        </div>
      </AnimatedGlassCard>
    </article>
  );
}

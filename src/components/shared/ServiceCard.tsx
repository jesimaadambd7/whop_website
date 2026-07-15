"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import { ServiceCardMedia } from "@/components/shared/ServiceCardMedia";
import type { Service } from "@/lib/data/services";

type ServiceCardProps = {
  service: Service;
  eager?: boolean;
};

export function ServiceCard({ service, eager = false }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link href={`/services/${service.id}`} className="group/service block h-full">
      <AnimatedGlassCard
        variant="card"
        className="service-card h-full"
        bodyClassName="flex h-full flex-col overflow-hidden p-0"
      >
        <ServiceCardMedia service={service} eager={eager} />

        <div className="relative z-[1] flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold text-white transition duration-400 group-hover/glass:text-sky-300">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400 transition duration-400 group-hover/glass:text-zinc-300">
            {service.description}
          </p>

          <motion.p
            className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-400 opacity-0 transition-all duration-300 group-hover/glass:translate-x-1 group-hover/glass:opacity-100"
            initial={false}
          >
            Learn more
            <motion.span
              aria-hidden
              className="inline-block"
              animate={prefersReducedMotion ? undefined : { x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.p>
        </div>
      </AnimatedGlassCard>
    </Link>
  );
}

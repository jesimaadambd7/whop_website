"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { marqueeClients } from "@/lib/data/clients";
import { cn } from "@/lib/utils";

export function ProofClientCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="proof-client-card group relative overflow-hidden rounded-[2rem] bg-sky-400 p-6 sm:p-8"
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.005 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
      </div>

      <p className="relative text-[10px] font-black uppercase tracking-[0.28em] text-black/70 sm:text-xs">
        Client proof
      </p>
      <h3 className="relative mt-3 font-display text-2xl font-black leading-tight tracking-[-0.04em] text-black sm:text-3xl">
        Work libraries for brands we have produced ads for.
      </h3>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-black/75">
        The portfolio is organized around client-specific libraries so new prospects
        can review campaign formats, deliverables, creative angles, and video slots
        by brand.
      </p>

      <div className="relative mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
        {marqueeClients.map((client) => (
          <Link
            key={client.slug}
            href={`/portfolio/${client.slug}`}
            aria-label={`${client.name} video portfolio`}
            className={cn(
              "proof-logo-tile group/tile flex h-14 items-center justify-center rounded-xl border border-black/10 p-2.5 transition duration-300 sm:h-16",
              client.tileClass === "border-white/10 bg-white"
                ? "bg-white hover:bg-white/95"
                : "bg-zinc-950 hover:bg-black",
              "hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
            )}
          >
            {client.raster ? (
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={96}
                height={40}
                className="max-h-7 w-auto max-w-[88px] object-contain transition duration-300 group-hover/tile:scale-105 sm:max-h-8 sm:max-w-[100px]"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                width={96}
                height={40}
                className="max-h-7 w-auto max-w-[88px] object-contain transition duration-300 group-hover/tile:scale-105 sm:max-h-8 sm:max-w-[100px]"
              />
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data/services";

type ServiceCardMediaProps = {
  service: Service;
  eager?: boolean;
};

export function ServiceCardMedia({ service, eager = false }: ServiceCardMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "60px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "service-media group/thumb relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-950",
        inView && !prefersReducedMotion && "service-media--in-view",
      )}
    >
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={
          inView || prefersReducedMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 1.08, opacity: 0 }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${service.title} illustration`}
          className="service-media__visual service-media__image h-full w-full object-cover"
          loading={eager ? "eager" : "lazy"}
          src={service.image}
        />
      </motion.div>

      <div aria-hidden className="service-media__mesh pointer-events-none absolute inset-0" />
      <div aria-hidden className="service-media__shine pointer-events-none absolute inset-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.2)_52%,rgba(0,0,0,0.78))]"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <motion.div
          className="icon-box shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-400 group-hover/glass:border-sky-400/60 group-hover/glass:bg-sky-400/20 group-hover/glass:shadow-[0_0_20px_rgba(0,188,254,0.2)]"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.06, rotate: -2 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        >
          {service.abbr}
        </motion.div>
        <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
          Service
        </span>
      </div>
    </div>
  );
}

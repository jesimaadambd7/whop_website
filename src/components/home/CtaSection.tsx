"use client";

import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section className="relative py-12 sm:py-16">
      <Container>
        <Reveal>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cine-cta-export relative overflow-hidden rounded-[2rem] border border-sky-300/30 bg-sky-400 px-8 py-14 shadow-[0_0_80px_rgba(0,188,254,0.25)] sm:rounded-[2.5rem] sm:px-12 sm:py-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
            <div className="cine-film-grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-black/10 blur-3xl" />

            <div className="cine-viewfinder cine-viewfinder--tl pointer-events-none absolute left-4 top-4 h-10 w-10 opacity-40" aria-hidden="true" />
            <div className="cine-viewfinder cine-viewfinder--tr pointer-events-none absolute right-4 top-4 h-10 w-10 opacity-40" aria-hidden="true" />
            <div className="cine-viewfinder cine-viewfinder--bl pointer-events-none absolute bottom-4 left-4 h-10 w-10 opacity-40" aria-hidden="true" />
            <div className="cine-viewfinder cine-viewfinder--br pointer-events-none absolute bottom-4 right-4 h-10 w-10 opacity-40" aria-hidden="true" />

            <div className="relative mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center justify-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-black/70">
                <Clapperboard size={14} />
                Final cut — ready to export
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
                Ready to turn your product into sales creative?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-black/80 sm:text-lg">
                Tell us what you are launching, scaling, or fixing. We will help shape
                the shoot, creative, and paid ads sprint around your goals.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact#book-call"
                    className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg"
                  >
                    Book a Call
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-lg"
                  >
                    View Portfolio
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

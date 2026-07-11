import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CreatorAuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function CreatorAuthLayout({
  eyebrow,
  title,
  description,
  children,
}: CreatorAuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-5 py-16 text-white sm:px-8">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,168,255,0.2),transparent_30%),radial-gradient(circle_at_85%_90%,rgba(255,255,255,0.07),transparent_28%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section>
          <Link href="/" className="group" aria-label="VidCarry home">
            <span className="inline-flex items-center">
              <Image
                src="/assets/brand/vidcarry-logo-transparent.png"
                alt="VidCarry"
                width={1774}
                height={267}
                priority
                className="h-auto w-[180px] object-contain transition duration-300 group-hover:brightness-125 sm:w-[210px] lg:w-[230px]"
              />
            </span>
          </Link>

          <p className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-sky-400">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl font-display text-5xl font-black tracking-[-0.065em] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">{description}</p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-zinc-500">
            <Link href="/creator-portfolios" className="hover:text-sky-300">
              How it works
            </Link>
            <span>/</span>
            <Link href="/creators" className="hover:text-sky-300">
              Creator directory
            </Link>
          </div>
        </section>

        <section className="premium-panel rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-9">
          {children}
        </section>
      </div>
    </div>
  );
}

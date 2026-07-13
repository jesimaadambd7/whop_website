import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { marqueeClients } from "@/lib/data/clients";
import { cn } from "@/lib/utils";

function ClientLogoTile({
  client,
  duplicate = false,
}: {
  client: (typeof marqueeClients)[number];
  duplicate?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${client.slug}`}
      tabIndex={duplicate ? -1 : undefined}
      aria-label={`${client.name} video portfolio`}
      className={cn(
        "group flex h-14 w-36 shrink-0 items-center justify-center rounded-2xl border p-3 transition duration-300 hover:-translate-y-1 hover:border-sky-400/70 hover:shadow-[0_8px_32px_rgba(0,188,254,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:h-16 sm:w-44 sm:p-4",
        client.tileClass,
      )}
    >
      {client.raster ? (
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={132}
          height={52}
          className="max-h-8 w-auto max-w-[112px] object-contain transition duration-300 group-hover:scale-105 sm:max-h-9 sm:max-w-[136px]"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          width={132}
          height={52}
          className="max-h-8 w-auto max-w-[112px] object-contain transition duration-300 group-hover:scale-105 sm:max-h-9 sm:max-w-[136px]"
        />
      )}
    </Link>
  );
}

export function ClientsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-6 backdrop-blur-[2px]">
      <div className="cine-film-divider pointer-events-none absolute inset-x-0 top-0 h-3 opacity-30" aria-hidden="true" />
      <Container>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sky-500/80">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Client work
            </p>
            <h2 className="mt-2 font-display text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
              Trusted by ecommerce teams we have produced ads for.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Click any brand to open its dedicated video work library.
          </p>
        </div>
      </Container>

      <div className="client-marquee relative overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />
        <div className="client-marquee-track flex w-max items-center">
          <div aria-hidden={false} className="flex min-w-max shrink-0 items-center gap-3 pr-3">
            {marqueeClients.map((client) => (
              <ClientLogoTile key={`${client.slug}-primary`} client={client} />
            ))}
          </div>
          <div aria-hidden className="flex min-w-max shrink-0 items-center gap-3 pr-3">
            {marqueeClients.map((client) => (
              <ClientLogoTile key={`${client.slug}-duplicate`} client={client} duplicate />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

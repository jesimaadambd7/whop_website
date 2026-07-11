export type MarqueeClient = {
  name: string;
  slug: string;
  logo: string;
  /** Light logos need a white tile; dark logos use zinc-950. */
  tileClass: string;
  /** Use next/image for raster logos. */
  raster?: boolean;
};

export const marqueeClients: MarqueeClient[] = [
  {
    name: "RYZE",
    slug: "ryze",
    logo: "/assets/clients/ryze.svg",
    tileClass: "border-white/10 bg-zinc-950",
  },
  {
    name: "WOW Skin Science",
    slug: "wow-skin-science",
    logo: "/assets/clients/wow-skin-science.png",
    tileClass: "border-white/10 bg-white",
    raster: true,
  },
  {
    name: "SHINE Armor",
    slug: "shine-armor",
    logo: "/assets/clients/shine-armor.png",
    tileClass: "border-white/10 bg-zinc-950",
    raster: true,
  },
  {
    name: "Woxer",
    slug: "woxer",
    logo: "/assets/clients/woxer.svg",
    tileClass: "border-white/10 bg-white",
  },
  {
    name: "Javy",
    slug: "javy",
    logo: "/assets/clients/javy.svg",
    tileClass: "border-white/10 bg-white",
  },
  {
    name: "Blissal",
    slug: "blissal",
    logo: "/assets/clients/blissal.png",
    tileClass: "border-white/10 bg-white",
    raster: true,
  },
];

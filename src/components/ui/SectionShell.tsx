import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withGrid?: boolean;
  withOrb?: boolean;
  bordered?: boolean;
  cinematic?: boolean;
  tone?: "default" | "elevated" | "deep";
};

export function SectionShell({
  children,
  className,
  id,
  withGrid = true,
  withOrb = false,
  bordered = false,
  cinematic = false,
  tone = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden bg-transparent py-20 sm:scroll-mt-28 sm:py-24",
        bordered && "border-y border-white/10",
        tone === "elevated" && "bg-white/[0.025] backdrop-blur-[2px]",
        tone === "deep" && "bg-black/20 backdrop-blur-[2px]",
        !bordered && tone === "default" && "border-b border-white/5",
        className,
      )}
    >
      {withGrid && (
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14]" />
      )}
      {cinematic && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
          <div className="cine-film-grain pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden="true" />
        </>
      )}
      {withOrb && (
        <>
          <div className="orb orb-sky -right-32 top-0 h-64 w-64" />
          <div className="orb orb-amber -left-32 bottom-0 h-48 w-48" />
        </>
      )}
      {tone === "deep" && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(0,188,254,0.1),transparent_62%)]" />
      )}
      {tone === "elevated" && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(0,188,254,0.06),transparent_55%)]" />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

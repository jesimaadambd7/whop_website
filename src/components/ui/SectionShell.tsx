import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withGrid?: boolean;
  withOrb?: boolean;
  bordered?: boolean;
};

export function SectionShell({
  children,
  className,
  id,
  withGrid = true,
  withOrb = false,
  bordered = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28 sm:py-24",
        bordered && "border-y border-white/10 bg-white/[0.02]",
        !bordered && "border-b border-white/5",
        className,
      )}
    >
      {withGrid && (
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" />
      )}
      {withOrb && (
        <>
          <div className="orb orb-sky -right-32 top-0 h-64 w-64" />
          <div className="orb orb-amber -left-32 bottom-0 h-48 w-48" />
        </>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

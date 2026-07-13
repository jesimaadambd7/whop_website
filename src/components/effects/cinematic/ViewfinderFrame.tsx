import { cn } from "@/lib/utils";

type ViewfinderFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function ViewfinderFrame({ children, className }: ViewfinderFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute -inset-3 z-10 sm:-inset-5" aria-hidden="true">
        <div className="cine-viewfinder cine-viewfinder--tl absolute left-0 top-0 h-10 w-10 sm:h-14 sm:w-14" />
        <div className="cine-viewfinder cine-viewfinder--tr absolute right-0 top-0 h-10 w-10 sm:h-14 sm:w-14" />
        <div className="cine-viewfinder cine-viewfinder--bl absolute bottom-0 left-0 h-10 w-10 sm:h-14 sm:w-14" />
        <div className="cine-viewfinder cine-viewfinder--br absolute bottom-0 right-0 h-10 w-10 sm:h-14 sm:w-14" />

        <div className="absolute left-1/2 top-3 h-px w-8 -translate-x-1/2 bg-white/20 sm:top-4 sm:w-12" />
        <div className="absolute bottom-3 left-1/2 h-px w-8 -translate-x-1/2 bg-white/20 sm:bottom-4 sm:w-12" />

        <div className="absolute right-4 top-4 rounded border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 sm:right-6 sm:top-6">
          4K · 24fps
        </div>
      </div>

      <div className="cine-monitor-glow relative rounded-[2rem]">{children}</div>
    </div>
  );
}

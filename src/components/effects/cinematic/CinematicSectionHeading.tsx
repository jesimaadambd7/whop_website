import { cn } from "@/lib/utils";

type CinematicSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large";
  className?: string;
};

export function CinematicSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  className,
}: CinematicSectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-sky-400",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.75)]" />
        {eyebrow}
      </p>

      <h2
        className={cn(
          "font-display font-black tracking-[-0.05em] text-white",
          size === "large"
            ? "text-4xl leading-[0.95] sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-5xl",
        )}
      >
        <span className="cine-title-shine">{title}</span>
      </h2>

      {description && (
        <p
          className={cn(
            "mt-5 border-l-2 border-sky-400/25 pl-5 text-base leading-8 text-zinc-400 sm:text-lg",
            align === "center" && "border-l-0 pl-0",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

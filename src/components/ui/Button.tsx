import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-sky-400 text-zinc-950 hover:bg-sky-300 border border-sky-400/50 shadow-[0_0_30px_rgba(0,188,254,0.2)] hover:shadow-[0_8px_40px_rgba(0,188,254,0.35)]",
  secondary:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm hover:border-white/20",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent",
  outline:
    "border border-white/20 text-white hover:border-sky-400/50 hover:bg-sky-400/5 hover:text-sky-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

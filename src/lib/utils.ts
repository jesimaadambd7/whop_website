export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function cardHoverClass(extra?: string) {
  return cn(
    "group transition-all duration-500 ease-out",
    "hover:-translate-y-1.5 hover:border-sky-400/45",
    "hover:bg-sky-400/[0.04] hover:shadow-[0_12px_48px_rgba(0,188,254,0.1)]",
    extra,
  );
}

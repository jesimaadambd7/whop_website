import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";

type AdminSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  showSignOut?: boolean;
};

export function AdminSectionHeader({
  eyebrow = "VidCarry admin",
  title,
  description,
  showSignOut = true,
}: AdminSectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-6">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.28em] text-sky-300">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">{description}</p>
        )}
      </div>
      {showSignOut && <SignOutButton />}
    </div>
  );
}

type AdminPlaceholderPanelProps = {
  title: string;
  description: string;
  actions?: { label: string; href: string; external?: boolean }[];
};

export function AdminPlaceholderPanel({
  title,
  description,
  actions = [],
}: AdminPlaceholderPanelProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">Control panel</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">{description}</p>

      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action) =>
            action.external ? (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-sky-400/35 bg-sky-400/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:border-sky-400 hover:bg-sky-400 hover:text-black"
              >
                {action.label}
              </a>
            ) : (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-full border border-sky-400/35 bg-sky-400/10 px-5 py-3 text-sm font-black text-sky-100 transition hover:border-sky-400 hover:bg-sky-400 hover:text-black"
              >
                {action.label}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}

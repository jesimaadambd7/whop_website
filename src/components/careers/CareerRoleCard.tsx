import Link from "next/link";
import { AnimatedGlassCard } from "@/components/ui/AnimatedGlassCard";
import type { CareerRole } from "@/lib/data/careers";

type CareerRoleCardProps = {
  role: CareerRole;
  highlighted?: boolean;
};

function BulletList({
  title,
  items,
  variant = "default",
}: {
  title: string;
  items: string[];
  variant?: "default" | "accent";
}) {
  const isAccent = variant === "accent";

  return (
    <div
      className={
        isAccent
          ? "rounded-[1.75rem] border border-sky-400/20 bg-sky-400/10 p-5"
          : "rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5"
      }
    >
      <h3
        className={
          isAccent
            ? "text-sm font-black uppercase tracking-[0.24em] text-sky-300"
            : "text-sm font-black uppercase tracking-[0.24em] text-sky-400"
        }
      >
        {title}
      </h3>
      <ul className={`mt-4 grid gap-3 text-sm leading-6 ${isAccent ? "text-sky-50/80" : "text-zinc-400"}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isAccent ? "bg-sky-300" : "bg-sky-400"}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareerRoleCard({ role, highlighted = false }: CareerRoleCardProps) {
  return (
    <AnimatedGlassCard
      variant="panel"
      rounded="rounded-[2.25rem]"
      className={`w-full transition ${highlighted ? "border-sky-400/45" : "hover:border-sky-400/45"}`}
      bodyClassName="career-role-card__body p-5 sm:p-7"
    >
      <article className="relative z-[1] grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-sky-300">
              {role.department}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-zinc-300">
              {role.location}
            </span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            {role.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{role.description}</p>

          <div className="mt-5 grid gap-3 text-sm font-bold text-zinc-300 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-zinc-500">Type</span>
              <p className="mt-1 text-white">{role.type}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-zinc-500">Commitment</span>
              <p className="mt-1 text-white">{role.commitment}</p>
            </div>
          </div>

          <Link
            href={`/careers?role=${role.id}#application-form`}
            className="mt-6 inline-flex rounded-full border border-sky-400 bg-sky-400 px-5 py-3 text-sm font-black text-black transition hover:bg-white"
          >
            Apply for this role
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <BulletList title="Responsibilities" items={role.responsibilities} />
          <BulletList title="Requirements" items={role.requirements} />
          <BulletList title="Nice to have" items={role.niceToHave} variant="accent" />
        </div>
      </article>
    </AnimatedGlassCard>
  );
}

import Link from "next/link";
import {
  submissionStatusFilters,
  submissionTypeFilters,
} from "@/lib/data/admin-nav";
import { cn } from "@/lib/utils";

type SubmissionFiltersProps = {
  activeType?: string;
  activeStatus?: string;
  basePath?: string;
};

function buildHref(basePath: string, type?: string, status?: string) {
  const params = new URLSearchParams();
  if (type && type !== "all") params.set("type", type);
  if (status && status !== "all") params.set("status", status);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function SubmissionFilters({
  activeType = "all",
  activeStatus = "all",
  basePath = "/admin/inquiries",
}: SubmissionFiltersProps) {
  return (
    <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 sm:p-6">
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
          Filter by type
        </p>
        <div className="flex flex-wrap gap-2">
          {submissionTypeFilters.map((filter) => (
            <Link
              key={filter.value}
              href={buildHref(basePath, filter.value, activeStatus)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition",
                activeType === filter.value
                  ? "border-sky-300 bg-sky-300 text-black"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-sky-300/50 hover:text-white",
              )}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
          Filter by status
        </p>
        <div className="flex flex-wrap gap-2">
          {submissionStatusFilters.map((filter) => (
            <Link
              key={filter.value}
              href={buildHref(basePath, activeType, filter.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition",
                activeStatus === filter.value
                  ? "border-sky-300 bg-sky-300 text-black"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-sky-300/50 hover:text-white",
              )}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

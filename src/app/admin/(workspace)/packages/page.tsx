import { AdminPackagesPanel } from "@/components/admin/AdminPackagesPanel";
import { getPackageStore } from "@/lib/admin/package-store";

export default async function AdminPackagesPage() {
  const store = await getPackageStore();

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">
        Commerce control
      </p>
      <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.06em]">
        Packages and pricing.
      </h1>
      <p className="mt-4 max-w-3xl text-zinc-400">
        Control public prices, scheduled offers, billing type, timelines, revisions,
        package copy, and optional add-ons without redeploying the website.
      </p>

      <AdminPackagesPanel initialStore={store} />
    </main>
  );
}

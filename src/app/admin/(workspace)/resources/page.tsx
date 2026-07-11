import Link from "next/link";
import { AdminResourcesPanel } from "@/components/admin/AdminResourcesPanel";
import { listAdminResources } from "@/lib/admin/resource-store";

export default async function AdminResourcesPage() {
  const resources = await listAdminResources();

  return (
    <main className="min-h-screen bg-black px-5 py-24 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="text-sm font-black uppercase tracking-[0.2em] text-sky-300"
        >
          Back to admin
        </Link>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
          Resource store control
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
          Create locked resources for editors, strategists, designers, AI UGC creators, and buyers
          who pay to download VidCarry assets.
        </p>

        <AdminResourcesPanel initialResources={resources} />
      </section>
    </main>
  );
}

import { getPersistentStorageStatus } from "@/lib/admin/persistent-storage";

export function AdminStorageBanner() {
  const status = getPersistentStorageStatus();
  if (status.configured) return null;

  return (
    <div className="border-b border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm leading-6 text-amber-100">
      <p className="font-black text-amber-50">Production storage is not connected.</p>
      <p className="mt-1 text-amber-100/90">
        Contact forms and admin saves will not persist on Vercel until you connect storage. In Vercel
        Dashboard → your project → <strong>Storage</strong> → create <strong>Redis</strong>{" "}
        (recommended) or <strong>Blob</strong> → connect to this project → redeploy.
      </p>
    </div>
  );
}

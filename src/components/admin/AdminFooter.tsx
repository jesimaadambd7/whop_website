import Link from "next/link";

export function AdminFooter() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 px-4 py-3 text-xs text-zinc-500 shadow-[0_-18px_60px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 VidCarry. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/terms-conditions" className="transition hover:text-sky-400">
            Terms
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-sky-400">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="transition hover:text-sky-400">
            Cookie Policy
          </Link>
          <Link href="/contact" className="transition hover:text-sky-400">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

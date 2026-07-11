export function SignOutButton() {
  return (
    <form action="/api/admin/logout" method="post">
      <button
        type="submit"
        className="rounded-full border border-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-sky-300/50 hover:text-white"
      >
        Sign out
      </button>
    </form>
  );
}

type FilmStripDividerProps = {
  label?: string;
};

export function FilmStripDivider({ label }: FilmStripDividerProps) {
  return (
    <div className="relative py-2" aria-hidden="true">
      <div className="cine-film-divider mx-auto h-5 max-w-7xl opacity-50" />
      {label && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/90 px-4 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">
          {label}
        </div>
      )}
    </div>
  );
}

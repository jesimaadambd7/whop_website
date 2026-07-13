export function CinematicHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Cinematic color wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_10%,rgba(0,188,254,0.16),transparent_50%),radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(255,210,54,0.08),transparent_45%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,100,180,0.12),transparent_55%)]" />

      {/* Soft bokeh orbs */}
      <div className="cine-bokeh cine-bokeh--1 absolute left-[6%] top-[18%] h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="cine-bokeh cine-bokeh--2 absolute right-[10%] top-[32%] h-64 w-64 rounded-full bg-amber-300/8 blur-3xl" />
      <div className="cine-bokeh cine-bokeh--3 absolute bottom-[20%] left-[30%] h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl" />

      {/* Film strip perforations */}
      <div className="cine-film-strip absolute inset-x-0 top-0 h-3 opacity-40" />

      {/* Letterbox bars */}
      <div className="cine-letterbox cine-letterbox--top absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="cine-letterbox cine-letterbox--bottom absolute inset-x-0 bottom-0 h-px bg-white/10" />

      {/* Light leak sweep */}
      <div className="cine-light-leak absolute inset-0" />

      {/* Film grain */}
      <div className="cine-film-grain absolute inset-0 opacity-[0.045]" />

      {/* Vignette */}
      <div className="cine-vignette absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030308]/90 via-[#030308]/40 to-transparent" />
    </div>
  );
}

export function CinematicHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_10%,rgba(0,188,254,0.16),transparent_50%),radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(255,210,54,0.08),transparent_45%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,100,180,0.12),transparent_55%)]" />

      {/* Soft gradient orbs — no blur-3xl filters */}
      <div className="cine-bokeh cine-bokeh--1 absolute left-[6%] top-[18%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_70%)]" />
      <div className="cine-bokeh cine-bokeh--2 absolute right-[10%] top-[32%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.1),transparent_70%)]" />

      <div className="cine-film-strip absolute inset-x-0 top-0 h-3 opacity-40" />

      <div className="cine-letterbox cine-letterbox--top absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="cine-letterbox cine-letterbox--bottom absolute inset-x-0 bottom-0 h-px bg-white/10" />

      {/* Static vignette only — grain/light-leak disabled for scroll perf */}
      <div className="cine-vignette absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030308]/90 via-[#030308]/40 to-transparent" />
    </div>
  );
}

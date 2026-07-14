export function GlobalAmbientBackground() {
  return (
    <div className="site-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Soft gradients only — no live CSS filter blur (major scroll jank source) */}
      <div className="site-ambient__base absolute inset-0" />
      <div className="site-ambient__glow site-ambient__glow--1 absolute -left-[10%] top-[8%] h-[42rem] w-[42rem]" />
      <div className="site-ambient__glow site-ambient__glow--2 absolute -right-[8%] top-[32%] h-[36rem] w-[36rem]" />
      <div className="site-ambient__glow site-ambient__glow--3 absolute bottom-[4%] left-[18%] h-[28rem] w-[28rem]" />
      <div className="site-ambient__mesh absolute inset-0 opacity-40" />
    </div>
  );
}

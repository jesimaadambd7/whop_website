export function GlobalAmbientBackground() {
  return (
    <div className="site-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="site-ambient__base absolute inset-0" />
      <div className="site-ambient__orb site-ambient__orb--1 absolute -left-24 top-[12%] h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-[100px]" />
      <div className="site-ambient__orb site-ambient__orb--2 absolute -right-20 top-[38%] h-[32rem] w-[32rem] rounded-full bg-cyan-400/12 blur-[110px]" />
      <div className="site-ambient__orb site-ambient__orb--3 absolute bottom-[8%] left-[22%] h-80 w-80 rounded-full bg-sky-600/15 blur-[90px]" />
      <div className="site-ambient__orb site-ambient__orb--4 absolute bottom-[22%] right-[12%] h-72 w-72 rounded-full bg-amber-300/10 blur-[80px]" />
      <div className="site-ambient__mesh absolute inset-0 opacity-60" />
    </div>
  );
}

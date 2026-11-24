import React from 'react';

/* Neon: a saturated orange tube with a hot, almost white core and a glow that spreads in layers —
   tight and bright near the glass, wide and deep red-orange further out. */
const CORE = '#fff4ec';                 // the hot centre of the tube
const TUBE = 'hsl(18 100% 64%)';        // the lit glass
const GLOW = 'hsl(var(--glow))';        // brand orange (#ff6b35)
const DEEP = 'hsl(10 100% 50%)';        // the outer, redder halo
const glow = {
  color: TUBE,
  WebkitTextStroke: `1px ${CORE}`,
  textShadow: [
    `0 0 1px ${CORE}`, `0 0 4px ${GLOW}`, `0 0 10px ${GLOW}`, `0 0 20px ${GLOW}`,
    `0 0 40px ${DEEP}`, `0 0 80px ${DEEP}`, `0 0 120px ${DEEP}`,
  ].join(', '),
};
const tube = {
  background: CORE,
  boxShadow: `0 0 2px ${CORE}, 0 0 6px ${GLOW}, 0 0 14px ${GLOW}, 0 0 28px ${DEEP}, 0 0 50px ${DEEP}`,
};
const frame = {
  borderColor: CORE,
  boxShadow: [
    `0 0 2px ${CORE}`, `0 0 6px ${GLOW}`, `0 0 16px ${GLOW}`, `0 0 36px ${DEEP}`, `0 0 70px ${DEEP}`,
    `inset 0 0 2px ${CORE}`, `inset 0 0 10px ${GLOW}`, `inset 0 0 28px ${DEEP}`,
  ].join(', '),
};

/** Home hero: one neon sign — 寿司 above, a lit divider, "Maneki Sushi" below — over the dimmed nigiri slate. */
function NeonHero() {
  return (
    <section className="relative min-h-[420px] md:min-h-[58dvh] flex items-center justify-center overflow-hidden bg-black">
      <style>{`
        @keyframes mk-flicker{0%,18%,22%,25%,53%,57%,100%{opacity:1}20%,24%,55%{opacity:.45}}
        @keyframes mk-hum{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}
        @media (prefers-reduced-motion: reduce){.mk-flicker,.mk-hum{animation:none!important}}`}</style>
      <img src="/hero-mobile.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" fetchpriority="high" loading="eager" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_75%)]" />
      {/* The sign lights the wall behind it */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] max-w-[120vw] rounded-full blur-3xl opacity-40"
        style={{ background: `radial-gradient(ellipse, ${DEEP} 0%, transparent 65%)` }} aria-hidden="true" />

      <div className="mk-hum relative z-10 flex flex-col items-center rounded-[28px] sm:rounded-[36px] border-[2.5px] px-10 sm:px-16 pt-6 sm:pt-8 pb-7 sm:pb-10"
        style={{ ...frame, animation: 'mk-hum 4s ease-in-out infinite' }}>
        <div className="mk-flicker text-[84px] sm:text-[140px] font-bold leading-none" style={{ ...glow, animation: 'mk-flicker 6s infinite' }} aria-hidden="true">寿司</div>

        {/* Lit divider: two tubes and a dot */}
        <div className="my-4 sm:my-6 flex items-center gap-3 sm:gap-4" aria-hidden="true">
          <span className="h-[2.5px] w-12 sm:w-20 rounded-full" style={tube} />
          <span className="h-2 w-2 rounded-full" style={tube} />
          <span className="h-[2.5px] w-12 sm:w-20 rounded-full" style={tube} />
        </div>

        <h1 className="text-[34px] sm:text-6xl leading-none tracking-wide whitespace-nowrap" style={{ ...glow, fontFamily: 'Wonton, sans-serif' }}>Maneki Sushi</h1>
      </div>
    </section>
  );
}

export default NeonHero;

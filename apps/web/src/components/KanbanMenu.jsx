import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, getCategoryTranslationKey } from '@/data/menuData';
import { translations } from '@/i18n/translations';

const INK = '#17100a';
const PAPER = '#e08a3e';

/* Aged-paper texture + hand-brushed double frame, like a traditional kanban sign */
function PlaqueFrame({ id }) {
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 240 700" aria-hidden="true">
      <defs>
        <filter id={`${id}-rough`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.24  0 0 0 0 0.13  0 0 0 0 0.04  0 0 0 0.5 0" />
        </filter>
      </defs>
      <rect x="0" y="0" width="240" height="700" fill="none" />
      <rect x="2" y="2" width="236" height="696" filter={`url(#${id}-grain)`} opacity="0.5" />
      <g filter={`url(#${id}-rough)`} stroke={INK} fill="none" strokeLinecap="round">
        <rect x="9" y="9" width="222" height="682" strokeWidth="8" />
        <rect x="22" y="22" width="196" height="656" strokeWidth="3" opacity="0.9" />
        <g fill={INK} stroke="none" opacity="0.7">
          <circle cx="36" cy="120" r="2.2" />
          <circle cx="205" cy="88" r="1.6" />
          <circle cx="48" cy="420" r="1.8" />
          <circle cx="198" cy="360" r="2.4" />
          <circle cx="60" cy="620" r="1.5" />
          <circle cx="188" cy="580" r="2" />
          <circle cx="120" cy="666" r="1.7" />
        </g>
      </g>
    </svg>
  );
}

/* Vertical Japanese-style signboard listing every category (English labels in
   the brush "Wonton" face). Hangs on the right edge; unrolls like a scroll. */
function KanbanMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { category: rawCategory } = useParams();
  const current = rawCategory ? decodeURIComponent(rawCategory) : null;

  const items = [
    { cat: 'Discount', label: 'Promotion' },
    ...categories.map(cat => ({
      cat,
      label: translations.en.categories[getCategoryTranslationKey(cat)] || cat,
    })),
  ];

  const go = cat => {
    setOpen(false);
    navigate(`/category/${encodeURIComponent(cat)}`);
  };

  return (
    <>
      {/* Closed state: small hanging tab */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Category menu"
          className="hidden lg:flex items-center justify-center fixed right-0 top-1/2 -translate-y-1/2 z-40 w-11 h-40 transition-transform hover:-translate-x-1"
          style={{ background: PAPER, borderRadius: '6px 0 0 6px', boxShadow: '0 4px 18px rgba(0,0,0,0.5)' }}
        >
          <PlaqueFrame id="kbt" />
          <span
            className="font-samurai relative z-10 select-none"
            style={{ writingMode: 'vertical-rl', color: INK, fontSize: 17, letterSpacing: '0.35em', fontWeight: 700 }}
          >
            MENU
          </span>
        </button>
      )}

      {/* Open state: the unrolled signboard */}
      {open && (
        <>
          <div className="hidden lg:block fixed inset-0 z-40 bg-black/45" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="kanban-unroll hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40 w-[240px]"
            style={{ background: PAPER, borderRadius: 4, boxShadow: '0 12px 44px rgba(0,0,0,0.65)' }}
            role="dialog" aria-label="Categories"
          >
            <PlaqueFrame id="kbp" />
            <div className="relative z-10 px-7 py-7 max-h-[82vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-samurai" style={{ color: INK, fontSize: 24, letterSpacing: '0.18em' }}>MENU</h2>
                <button onClick={() => setOpen(false)} aria-label="Close"
                  className="font-samurai leading-none transition-transform hover:rotate-90"
                  style={{ color: INK, fontSize: 20 }}>✕</button>
              </div>
              <div className="h-[3px] mb-3" style={{ background: INK, opacity: 0.8, borderRadius: 2 }} />
              <ul>
                {items.map(({ cat, label }) => (
                  <li key={cat}>
                    <button
                      onClick={() => go(cat)}
                      className="font-samurai block w-full text-left py-[7px] px-2 rounded transition-colors"
                      style={{
                        color: INK,
                        fontSize: 16,
                        letterSpacing: '0.08em',
                        background: current === cat ? 'rgba(23,16,10,0.14)' : 'transparent',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(23,16,10,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = current === cat ? 'rgba(23,16,10,0.14)' : 'transparent'; }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default KanbanMenu;

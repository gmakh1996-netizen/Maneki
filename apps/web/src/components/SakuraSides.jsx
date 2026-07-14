import React from 'react';

const PINK = '#f2a9bd';
const PINK_SOFT = 'rgba(242, 169, 189, 0.22)';

/* Deterministic petal configs: top offset (% of strip height), horizontal position (%),
   size, duration (s), delay (s), opacity */
const PETALS = [
  { top: 0,  left: 12, size: 11, dur: 16, delay: 0,   o: 0.55 },
  { top: 8,  left: 46, size: 9,  dur: 21, delay: 4,   o: 0.4  },
  { top: 18, left: 70, size: 12, dur: 18, delay: 9,   o: 0.5  },
  { top: 30, left: 28, size: 8,  dur: 24, delay: 13,  o: 0.35 },
  { top: 42, left: 58, size: 10, dur: 19, delay: 6.5, o: 0.45 },
  { top: 55, left: 8,  size: 9,  dur: 23, delay: 17,  o: 0.4  },
  { top: 68, left: 40, size: 11, dur: 20, delay: 2,   o: 0.5  },
  { top: 80, left: 64, size: 8,  dur: 22, delay: 11,  o: 0.35 },
];

/* Mobile: sparse petals drifting across the full width of the section */
const MOBILE_PETALS = [
  { top: 0,  left: 8,  size: 11, dur: 18, delay: 0,    o: 0.45 },
  { top: 5,  left: 72, size: 9,  dur: 23, delay: 6,    o: 0.35 },
  { top: 12, left: 38, size: 12, dur: 20, delay: 11,   o: 0.4  },
  { top: 20, left: 88, size: 8,  dur: 25, delay: 3,    o: 0.3  },
  { top: 28, left: 18, size: 10, dur: 21, delay: 15,   o: 0.4  },
  { top: 36, left: 58, size: 9,  dur: 24, delay: 8,    o: 0.35 },
  { top: 45, left: 80, size: 12, dur: 19, delay: 1.5,  o: 0.45 },
  { top: 53, left: 30, size: 8,  dur: 26, delay: 12,   o: 0.3  },
  { top: 61, left: 66, size: 10, dur: 22, delay: 5,    o: 0.4  },
  { top: 70, left: 10, size: 11, dur: 20, delay: 17,   o: 0.4  },
  { top: 78, left: 46, size: 9,  dur: 24, delay: 9,    o: 0.35 },
  { top: 86, left: 84, size: 10, dur: 21, delay: 2,    o: 0.4  },
];

/* Strip fades in at the very top and out before the section ends */
const STRIP_MASK = 'linear-gradient(to bottom, transparent 0, black 60px, black calc(100% - 140px), transparent 100%)';

function Petal({ top, left, size, dur, delay, o }) {
  return (
    <svg
      viewBox="0 0 12 12" width={size} height={size}
      className="sakura-petal"
      style={{ top: `${top}%`, left: `${left}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s`, '--petal-o': o }}
    >
      <path
        d="M6 0.6 C8.9 2.1 10.1 5.4 8.4 8.8 C7.6 8.1 6.7 8.4 6 9.6 C5.3 8.4 4.4 8.1 3.6 8.8 C1.9 5.4 3.1 2.1 6 0.6 Z"
        fill={PINK}
      />
    </svg>
  );
}

/* One 900-unit branch segment. The trunk enters at (55,0) and exits at (55,900)
   with matching tangents, so stacked copies read as one continuous branch.
   preserveAspectRatio="none" makes the drawing fill the tile exactly — no gaps. */
function BranchSvg() {
  return (
    <svg
      viewBox="0 0 110 900" preserveAspectRatio="none"
      className="w-full h-full" aria-hidden="true"
    >
      <defs>
        <g id="blossom">
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a} cx="0" cy="-6.2" rx="3.1" ry="5"
              transform={`rotate(${a})`}
              fill={PINK_SOFT} stroke={PINK} strokeWidth="1" strokeOpacity="0.8" />
          ))}
          <circle cx="0" cy="0" r="1.6" fill="hsl(16 100% 60% / 0.85)" />
        </g>
        <g id="bud">
          <circle cx="0" cy="0" r="3" fill={PINK_SOFT} stroke={PINK} strokeWidth="1" strokeOpacity="0.7" />
        </g>
      </defs>

      <g fill="none" stroke="hsl(16 100% 60%)" strokeOpacity="0.6" strokeLinecap="round">
        {/* Trunk: starts and ends dead-centre so tiles chain seamlessly */}
        <path strokeWidth="2.2" d="M55 0 C40 100 76 210 55 330 C36 450 74 560 55 680 C42 770 66 845 55 900" />
        {/* Twigs, anchored on the trunk curve */}
        <path strokeWidth="1.4" d="M52 92 C42 104 33 102 23 118" />
        <path strokeWidth="1.4" d="M60 190 C71 200 79 198 89 214" />
        <path strokeWidth="1.4" d="M55 330 C44 342 36 340 26 358" />
        <path strokeWidth="1.4" d="M45 468 C57 478 65 476 77 492" />
        <path strokeWidth="1.4" d="M59 585 C47 597 39 595 29 613" />
        <path strokeWidth="1.4" d="M52 775 C63 785 71 783 81 799" />
        <path strokeWidth="1.1" d="M48 114 C44 122 44 128 48 136" />
        <path strokeWidth="1.1" d="M83 206 C87 214 87 220 83 228" />
      </g>

      {/* Blossoms on twig tips + along the trunk */}
      <use href="#blossom" transform="translate(23 120) scale(1.55)" />
      <use href="#blossom" transform="translate(89 216) scale(1.3) rotate(20)" />
      <use href="#blossom" transform="translate(26 360) scale(1.6) rotate(-15)" />
      <use href="#blossom" transform="translate(77 494) scale(1.4) rotate(35)" />
      <use href="#blossom" transform="translate(29 615) scale(1.5) rotate(10)" />
      <use href="#blossom" transform="translate(81 801) scale(1.25) rotate(-25)" />
      <use href="#blossom" transform="translate(60 212) scale(0.95) rotate(45)" />
      <use href="#blossom" transform="translate(57 545) scale(0.9) rotate(-40)" />

      {/* Buds scattered along the trunk */}
      <use href="#bud" transform="translate(48 150)" />
      <use href="#bud" transform="translate(74 235)" />
      <use href="#bud" transform="translate(48 385)" />
      <use href="#bud" transform="translate(66 515)" />
      <use href="#bud" transform="translate(48 650)" />
      <use href="#bud" transform="translate(60 830)" />
    </svg>
  );
}

/* The branch tiled down the whole strip as one continuous vine */
function BranchColumn() {
  return (
    <div className="flex flex-col h-full">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="h-[900px] shrink-0">
          <BranchSvg />
        </div>
      ))}
    </div>
  );
}

/* Ambient sakura decoration on both edges of the parent section.
   Parent must be position:relative; content should sit above via z-10. */
function SakuraSides() {
  return (
    <>
      {/* Mobile/tablet: petals drift across the whole section */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {MOBILE_PETALS.map((p, i) => <Petal key={i} {...p} />)}
      </div>
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-24 z-0 pointer-events-none overflow-hidden"
        style={{ WebkitMaskImage: STRIP_MASK, maskImage: STRIP_MASK }}
        aria-hidden="true"
      >
        <BranchColumn />
        {PETALS.map((p, i) => <Petal key={i} {...p} />)}
      </div>
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-24 z-0 pointer-events-none overflow-hidden"
        style={{ WebkitMaskImage: STRIP_MASK, maskImage: STRIP_MASK }}
        aria-hidden="true"
      >
        <div className="h-full" style={{ transform: 'scaleX(-1)' }}>
          <BranchColumn />
        </div>
        {PETALS.map((p, i) => (
          <Petal key={i} {...p} delay={p.delay + 2.5} left={100 - p.left - 12} />
        ))}
      </div>
    </>
  );
}

export default SakuraSides;

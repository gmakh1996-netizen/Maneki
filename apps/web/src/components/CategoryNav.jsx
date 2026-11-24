import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, UtensilsCrossed } from 'lucide-react';

/** One category as a round photo "story"; the active one gets a coloured ring. */
function Story({ active, label, img, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className="shrink-0 snap-start select-none w-[76px] sm:w-[88px] flex flex-col items-center gap-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl group">
      <span className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full p-[2.5px] transition-transform group-hover:-translate-y-0.5 ${active ? 'bg-[conic-gradient(from_180deg,hsl(var(--primary)),#f5c26b,#f2a9bd,hsl(var(--primary)))]' : 'bg-border group-hover:bg-accent2/50'}`}>
        <span className="block w-full h-full rounded-full overflow-hidden border-2 border-background bg-muted">
          {img
            ? <img src={img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            : <span className="w-full h-full grid place-items-center text-accent2"><UtensilsCrossed className="w-6 h-6" /></span>}
        </span>
      </span>
      <span className={`text-[11px] font-semibold text-center leading-tight line-clamp-2 ${active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{label}</span>
    </button>
  );
}

/**
 * Horizontal category menu under the sticky header: round photo stories that scroll sideways.
 * Picking one filters the menu below; the active one is kept in view.
 */
export function CategoryNav({ categories, active, onSelect, labelFor, imageFor }) {
  const scroller = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const update = () => {
    const el = scroller.current;
    if (el) setEdges({ left: el.scrollLeft > 16, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 16 });
  };
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, [categories.length]);
  useEffect(() => { scroller.current?.querySelector('[data-active="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); }, [active]);

  const items = ['ALL', ...categories];
  const by = dir => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.7, behavior: 'smooth' });
  const Arrow = ({ dir }) => (
    <button onClick={() => by(dir)} aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
      className={`hidden sm:grid absolute top-1/2 -translate-y-1/2 ${dir < 0 ? 'left-0' : 'right-0'} z-10 w-9 h-9 place-items-center rounded-full bg-card/95 border border-border text-foreground shadow-lg hover:border-accent2/60 transition-opacity ${(dir < 0 ? edges.left : edges.right) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {dir < 0 ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );

  return (
    <nav aria-label="Menu categories" className="sticky top-20 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="relative max-w-7xl mx-auto px-2 sm:px-12">
        <Arrow dir={-1} />
        <div ref={scroller} onScroll={update} className="no-scrollbar overflow-x-auto scroll-smooth snap-x"
          style={{ maskImage: `linear-gradient(to right, ${edges.left ? 'transparent' : 'black'} 0, black 32px, black calc(100% - 32px), ${edges.right ? 'transparent' : 'black'} 100%)` }}>
          <div className="flex w-max mx-auto px-2 gap-1 sm:gap-2 py-3">
            {items.map(cat => (
              <div key={cat} data-active={active === cat}>
                <Story active={active === cat} label={labelFor(cat)} img={imageFor(cat)} onClick={() => onSelect(cat)} />
              </div>
            ))}
          </div>
        </div>
        <Arrow dir={1} />
      </div>
    </nav>
  );
}

export default CategoryNav;

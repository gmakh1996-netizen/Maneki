
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

function MenuCard({ item, onClick, promoLabel, discountedPrice }) {
  const { language, t } = useLanguage();
  
  const itemName = item.name?.[language] || item.name?.en || '';
  const isLocal = item.image?.startsWith('/');
  const imgSrc = isLocal
    ? item.image
    : item.image?.includes('?')
      ? item.image
      : `${item.image}?w=600&q=75&auto=format&fit=crop`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card border border-border"
      style={{ overflow: promoLabel ? 'visible' : 'hidden' }}
    >
      {/* Discount badge — top-left, 1/4 outside */}
      {promoLabel && (
        <div className="absolute top-2 left-0 z-10 -translate-x-1/4">
          <div className="bg-red-600 text-white px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-xs sm:text-base shadow-lg" style={{whiteSpace:'nowrap'}}>
            {promoLabel}
          </div>
        </div>
      )}

      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-muted min-h-0">
        <img
          src={imgSrc}
          alt={itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Item name — mobile: small/compact, desktop: original */}
        <div className={`absolute left-2 sm:left-3 right-2 sm:right-3 ${discountedPrice != null ? 'bottom-14 sm:bottom-20' : 'bottom-10 sm:bottom-16'}`}>
          <h3 className="text-white font-semibold leading-tight drop-shadow-lg line-clamp-2 text-[11px] sm:text-xl sm:font-bold sm:line-clamp-none group-hover:text-primary-foreground transition-colors"
          >
            {itemName}
          </h3>
        </div>

        {/* Price area — mobile: compact, desktop: original */}
        {discountedPrice != null ? (
          <>
            {/* Mobile */}
            <div className="sm:hidden absolute bottom-2 right-2 flex flex-col items-end" style={{gap:'1px'}}>
              <span className="text-white/70 line-through" style={{fontSize:'9px'}}>{item.price.toFixed(2)} {t('product.currency')}</span>
              <div className="bg-sky-500 text-white rounded font-bold shadow" style={{fontSize:'11px',padding:'2px 6px'}}>
                {discountedPrice.toFixed(2)} {t('product.currency')}
              </div>
            </div>
            {/* Desktop */}
            <div className="hidden sm:flex absolute bottom-3 right-3 flex-col items-end gap-1">
              <span className="text-white/60 text-sm line-through leading-none">{item.price.toFixed(2)} {t('product.currency')}</span>
              <div className="bg-sky-500 text-white px-4 py-2 rounded-lg font-bold text-base shadow-lg">
                {discountedPrice.toFixed(2)} {t('product.currency')}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Mobile */}
            <div className="sm:hidden absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg" style={{fontSize:'12px',padding:'4px 10px'}}>
              {item.price.toFixed(2)} {t('product.currency')}
            </div>
            {/* Desktop */}
            <div className="hidden sm:block absolute bottom-3 right-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-base shadow-lg">
              {item.price.toFixed(2)} {t('product.currency')}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default MenuCard;

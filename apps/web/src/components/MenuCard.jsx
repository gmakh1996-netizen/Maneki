
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

/** Menu card, delivery-app style: rounded tile, inset photo, price and a round add button. */
function MenuCard({ item, onClick, promoLabel, discountedPrice }) {
  const { language, t } = useLanguage();

  const itemName = item.name?.[language] || item.name?.en || '';
  const isLocal = item.image?.startsWith('/');
  const imgSrc = isLocal
    ? item.image
    : item.image?.includes('?')
      ? item.image
      : `${item.image}?w=600&q=75&auto=format&fit=crop`;
  const currency = t('product.currency');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative cursor-pointer select-none rounded-[28px] bg-muted/60 p-2 sm:p-2.5 transition-colors hover:bg-muted"
    >
      <div className="relative aspect-square rounded-[22px] overflow-hidden bg-background">
        {/* Discount badge — top-left corner of image */}
        {promoLabel && (
          <div className="absolute top-2 left-2 z-10 bg-badge text-badge-foreground px-2.5 py-1 rounded-full font-extrabold text-xs sm:text-sm tracking-wide" style={{ whiteSpace: 'nowrap' }}>
            {promoLabel}
          </div>
        )}
        <img
          src={imgSrc}
          alt={itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="px-1.5 pt-2.5">
        <h3 className="text-foreground font-semibold text-xs sm:text-[15px] leading-tight line-clamp-2 min-h-[2.5em]">
          {itemName}
        </h3>
        {item.pieces != null && (
          <p className="text-muted-foreground text-[10px] sm:text-sm mt-0.5">
            {item.pieces} {t('product.pieces')}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between gap-2">
          {discountedPrice != null ? (
            <span className="flex flex-col leading-tight">
              <span className="text-price font-extrabold text-sm sm:text-lg">{discountedPrice.toFixed(2)} {currency}</span>
              <span className="text-muted-foreground line-through text-[11px] sm:text-sm">{item.price.toFixed(2)}</span>
            </span>
          ) : (
            <span className="text-price font-extrabold text-sm sm:text-lg">{item.price.toFixed(2)} {currency}</span>
          )}
          <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground text-background grid place-items-center transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_6px_16px_hsl(var(--primary)/0.45)]">
            <Plus className="w-5 h-5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuCard;

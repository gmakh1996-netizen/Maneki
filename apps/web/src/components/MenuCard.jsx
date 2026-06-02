
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
      style={{ overflow: 'hidden' }}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-muted min-h-0">
        <img
          src={imgSrc}
          alt={itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Discount badge — inside top-left */}
        {promoLabel && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-red-600 text-white px-2 py-0.5 rounded-md font-bold text-xs shadow-lg">
              {promoLabel}
            </div>
          </div>
        )}

        {/* Normal price badge (no discount) */}
        {!discountedPrice && (
          <>
            <div className="absolute bottom-10 left-3 right-3">
              <h3 className="text-white font-semibold text-base leading-tight drop-shadow-lg group-hover:text-primary-foreground transition-colors">
                {itemName}
              </h3>
            </div>
            <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
              {item.price.toFixed(2)} {t('product.currency')}
            </div>
          </>
        )}
      </div>

      {/* Discount card — name + prices below image */}
      {discountedPrice != null && (
        <div className="px-3 py-2 flex items-center justify-between gap-1 bg-card rounded-b-2xl">
          <h3 className="text-foreground font-semibold text-xs leading-tight flex-1 line-clamp-2">
            {itemName}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-muted-foreground text-xs line-through leading-none">{item.price.toFixed(2)} {t('product.currency')}</span>
            <span className="text-sky-500 font-bold text-sm leading-tight">{discountedPrice.toFixed(2)} {t('product.currency')}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MenuCard;

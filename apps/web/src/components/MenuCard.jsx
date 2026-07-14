
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
      className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted border border-border transition-shadow duration-300 group-hover:shadow-xl">
        {/* Discount badge — top-left corner of image */}
        {promoLabel && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-600 text-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-extrabold text-sm sm:text-base tracking-wide" style={{ whiteSpace: 'nowrap' }}>
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

      {/* Info below image */}
      <div className="pt-2.5 sm:pt-4 text-center px-1">
        <h3 className="text-foreground font-bold uppercase leading-tight line-clamp-2 text-[11px] sm:text-base tracking-wide group-hover:text-primary transition-colors">
          {itemName}
        </h3>
        {item.pieces != null && (
          <p className="text-muted-foreground text-[10px] sm:text-sm mt-0.5">
            {item.pieces} {t('product.pieces')}
          </p>
        )}
        <div className="mt-1 sm:mt-1.5 flex flex-col items-center leading-tight">
          {discountedPrice != null ? (
            <>
              <span className="text-primary font-bold text-sm sm:text-lg">
                {discountedPrice.toFixed(2)} {t('product.currency')}
              </span>
              <span className="text-muted-foreground line-through text-[11px] sm:text-sm">
                {item.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-primary font-bold text-sm sm:text-lg">
              {item.price.toFixed(2)} {t('product.currency')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MenuCard;

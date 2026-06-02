
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

function MenuCard({ item, onClick, promoLabel }) {
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
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card border border-border"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-muted min-h-0">
        <img
          src={imgSrc}
          alt={itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* Item Name */}
        <div className="absolute bottom-12 left-3 right-3">
          <h3 className="text-white font-semibold text-base leading-tight drop-shadow-lg group-hover:text-primary-foreground transition-colors">
            {itemName}
          </h3>
        </div>

        {/* Promo badge */}
        {promoLabel && (
          <div className="absolute bottom-14 left-3 flex items-center gap-1.5">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5" style={{fontSize:'13px', fontWeight:700, letterSpacing:'0.02em'}}>
              <span style={{fontSize:'15px'}}>🔥</span>
              <span>{promoLabel}</span>
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
          {item.price.toFixed(2)} {t('product.currency')}
        </div>
      </div>
    </motion.div>
  );
}

export default MenuCard;

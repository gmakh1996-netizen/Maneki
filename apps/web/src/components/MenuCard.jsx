
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

function MenuCard({ item, onClick }) {
  const { language, t } = useLanguage();
  
  const itemName = item.name?.[language] || item.name?.en || '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card border border-border"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={itemName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
          {item.price.toFixed(2)} {t('product.currency')}
        </div>
      </div>
      
      {/* Item Name */}
      <div className="absolute bottom-3 left-3 right-20">
        <h3 className="text-white font-semibold text-lg leading-tight drop-shadow-lg group-hover:text-primary-foreground transition-colors">
          {itemName}
        </h3>
      </div>
    </motion.div>
  );
}

export default MenuCard;

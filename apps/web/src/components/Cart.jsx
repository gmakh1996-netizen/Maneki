
import React, { useState } from 'react';
import { X, ShoppingCart, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

function Cart({ items, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const { language, t } = useLanguage();
  
  if (items.length === 0) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      onRemoveItem(item.id);
    } else if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden max-h-[calc(100vh-8rem)]">
      {/* Header / Toggle */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors bg-card z-10"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-8 h-8 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{t('cart.title')}</h2>
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
            {itemCount}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full pointer-events-none text-muted-foreground">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </div>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-border flex flex-col min-h-0">
              <ScrollArea className="flex-1 -mx-5 px-5 max-h-[45vh]">
                <div className="space-y-4 pt-4">
                  {items.map((item) => {
                    const itemName = item.name?.[language] || item.name?.en || '';
                    return (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-sm leading-tight mb-1 truncate text-foreground">
                              {itemName}
                            </h3>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-semibold text-primary">
                                {(item.price * item.quantity).toFixed(2)} {t('product.currency')}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.price.toFixed(2)} {t('product.currency')} / {t('cart.ea')}
                              </p>
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-auto">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleQuantityChange(item, -1); }}
                              className="w-7 h-7 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition-colors border border-border"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center tabular-nums text-foreground">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleQuantityChange(item, 1); }}
                              className="w-7 h-7 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground transition-colors border border-border"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemoveItem(item.id); }}
                          className="text-muted-foreground hover:text-destructive transition-colors duration-200 self-start p-1 bg-transparent hover:bg-destructive/10 rounded-md"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                  <span className="font-medium tabular-nums text-foreground">{subtotal.toFixed(2)} {t('product.currency')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border text-foreground">
                  <span>{t('cart.total')}</span>
                  <span className="text-primary tabular-nums">{total.toFixed(2)} {t('product.currency')}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98 mt-4 rounded-xl"
                  size="lg"
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;

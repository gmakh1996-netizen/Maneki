
import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '../hooks/useLanguage';
import { getCategoryTranslationKey } from '../data/menuData';

function ProductModal({ item, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { language, t } = useLanguage();

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ ...item, quantity });
    toast.success(t('product.addedToCart'));
    onClose();
    setQuantity(1);
  };

  if (!item) return null;

  const itemName = item.name?.[language] || item.name?.en || '';
  const itemDesc = item.description?.[language] || item.description?.en || '';
  const catName = t(`categories.${getCategoryTranslationKey(item.category)}`);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card text-card-foreground border-border rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{itemName}</DialogTitle>
          <DialogDescription className="sr-only">{itemDesc}</DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={itemName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-primary mb-1 uppercase tracking-wider">{catName}</p>
              <p className="text-base leading-relaxed text-muted-foreground">{itemDesc}</p>
            </div>

            <div className="text-3xl font-bold text-foreground">
              {item.price.toFixed(2)} <span className="text-primary">{t('product.currency')}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">{t('product.quantity')}</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="transition-all duration-200 active:scale-95 bg-muted border-border"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center text-foreground">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="transition-all duration-200 active:scale-95 bg-muted border-border"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98 mt-auto rounded-xl"
              size="lg"
            >
              {t('product.addToCart')} — {(item.price * quantity).toFixed(2)} {t('product.currency')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;

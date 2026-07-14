import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import SakuraSides from '@/components/SakuraSides.jsx';
import KanbanMenu from '@/components/KanbanMenu.jsx';
import MenuCard from '@/components/MenuCard.jsx';
import ProductModal from '@/components/ProductModal.jsx';
import Cart from '@/components/Cart.jsx';
import Footer from '@/components/Footer.jsx';
import { menuItems, getCategoryTranslationKey } from '@/data/menuData';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';

const PROMO_CAT = 'Discount';

function CategoryPage() {
  const { category: rawCategory } = useParams();
  const category = decodeURIComponent(rawCategory || '');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePromos, setActivePromos] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchPromo = async () => {
      const { data } = await supabase.from('promo_codes')
        .select('*')
        .eq('is_active', true)
        .eq('promo_type', 'promotion')
        .not('applicable_products', 'is', null);
      if (!data) return;
      const filtered = data.filter(p => {
        if (p.valid_from && new Date(p.valid_from) > new Date()) return false;
        if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
        return p.applicable_products?.length > 0;
      });
      setActivePromos(filtered);
    };
    fetchPromo();
  }, []);

  const getBestPromo = (itemName) => {
    const matching = activePromos.filter(p => p.applicable_products?.includes(itemName));
    if (!matching.length) return null;
    return matching.reduce((b, p) => {
      const val = p.discount_type === 'percent' ? p.discount_value : 0;
      const bVal = b?.discount_type === 'percent' ? b.discount_value : 0;
      return val > bVal ? p : b;
    }, matching[0]);
  };

  const getBestDiscount = (itemName) => {
    const p = getBestPromo(itemName);
    if (!p) return null;
    return p.discount_type === 'percent' ? `-${p.discount_value}%` : `-₾${p.discount_value}`;
  };

  const calcDiscountedPrice = (price, itemName) => {
    const p = getBestPromo(itemName);
    if (!p) return null;
    if (p.discount_type === 'percent') return Math.max(0, price * (1 - p.discount_value / 100));
    return Math.max(0, price - p.discount_value);
  };

  const promoProductNames = [...new Set(activePromos.flatMap(p => p.applicable_products || []))];
  const promoItems = promoProductNames.length > 0
    ? menuItems.filter(i => {
        const name = i.name?.en || i.name;
        return promoProductNames.includes(name);
      }).filter((item, idx, arr) => arr.findIndex(x => (x.name?.en||x.name) === (item.name?.en||item.name)) === idx)
    : [];

  const categoryItems = category === PROMO_CAT
    ? promoItems
    : menuItems.filter(item => item.category === category);

  const title = category === PROMO_CAT
    ? (language === 'ka' ? 'პრომო' : language === 'ru' ? 'Промо' : 'Promotion')
    : t(`categories.${getCategoryTranslationKey(category)}`);

  const handleAddToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => cartItem.id === item.id ? {
        ...cartItem,
        quantity: cartItem.quantity + item.quantity
      } : cartItem));
    } else {
      setCart([...cart, item]);
    }
  };
  const handleRemoveFromCart = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCart(cart.map(item => item.id === itemId ? {
      ...item,
      quantity: newQuantity
    } : item));
  };
  const handleCardClick = item => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{title} — Maneki Sushi</title>
      </Helmet>

      <Header />
      <KanbanMenu />

      <main className="relative flex-1 py-10 sm:py-14">
        <SakuraSides />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-center mb-8 sm:mb-12">
            <button
              onClick={() => navigate('/')}
              className="absolute left-0 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'ka' ? 'უკან' : language === 'ru' ? 'Назад' : 'Back'}</span>
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground text-center px-10" style={{ letterSpacing: '-0.02em' }}>
              {title}
            </h1>
          </div>

          {categoryItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {language === 'ka' ? 'პროდუქტები ვერ მოიძებნა' : language === 'ru' ? 'Продукты не найдены' : 'No products found'}
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-x-8 lg:gap-y-10">
              {categoryItems.map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onClick={() => handleCardClick(item)}
                  promoLabel={getBestDiscount(item.name?.en || item.name)}
                  discountedPrice={calcDiscountedPrice(item.price, item.name?.en || item.name)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Desktop Cart - Fixed Bottom Right */}
      {cart.length > 0 && <div className="hidden xl:block fixed bottom-6 right-6 z-50 w-80 pointer-events-auto">
          <Cart items={cart} onRemoveItem={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
        </div>}

      {/* Mobile Cart - Fixed Bottom */}
      {cart.length > 0 && <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40">
          <Cart items={cart} onRemoveItem={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
        </div>}

      <Footer />

      <ProductModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Clock, Phone, Grid2x2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/Header.jsx';
import MenuCard from '@/components/MenuCard.jsx';
import ProductModal from '@/components/ProductModal.jsx';
import Cart from '@/components/Cart.jsx';
import Footer from '@/components/Footer.jsx';
import { menuItems, categories, getCategoryTranslationKey } from '@/data/menuData';
import { useLanguage } from '../hooks/useLanguage';
function HomePage() {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const {
    language,
    t
  } = useLanguage();
  const [gridLayout, setGridLayout] = useState(() => {
    const saved = localStorage.getItem('gridLayout');
    if (saved) return saved;
    return window.innerWidth < 640 ? 'compact' : 'single';
  });
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
    localStorage.setItem('gridLayout', gridLayout);
  }, [gridLayout]);
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
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const handleCategorySelect = category => {
    setActiveCategory(category);
    scrollToMenu();
  };
  const toggleGridLayout = () => {
    setGridLayout(prev => prev === 'single' ? 'compact' : 'single');
  };
  const displayCategories = activeCategory === 'ALL' ? categories : [activeCategory];
  return <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Sushi Delivery - Fresh Japanese Cuisine</title>
        <meta name="description" content="Order premium sushi, rolls, and Japanese cuisine delivered fresh to your door." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[40dvh] sm:min-h-[60dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {/* Mobile image */}
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80&auto=format&fit=crop"
              alt="Fresh sushi platter"
              className="sm:hidden w-full h-full object-cover object-center"
              fetchpriority="high"
              loading="eager"
            />
            {/* Desktop image */}
            <img
              src="https://horizons-cdn.hostinger.com/b689a301-5c05-47d4-aff4-958d21843819/kana_sansetsu_-_frolicking_birds_in_plum_and_willow_trees-byNLk.jpg"
              alt="Fresh sushi platter"
              className="hidden sm:block w-full h-full object-cover object-center"
              fetchpriority="high"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight whitespace-pre-line" style={{
            letterSpacing: '-0.02em'
          }}>
              {t('hero.title')}
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              <Button onClick={scrollToMenu} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 transition-all duration-200 active:scale-98 shadow-lg rounded-xl">
                {t('hero.orderNow')}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Restaurant Info */}
        <section className="py-8 bg-card border-y border-border relative z-20 seigaiha-sides">
          <div className="w-full px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <a
                href="https://maps.google.com/?q=Merab+Kostava+71+Tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 hover:opacity-75 transition-opacity"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{t('info.pickup')}</h3>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">
                    {t('info.pickupDesc')}
                  </p>
                </div>
              </a>
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{t('info.deliveryTime')}</h3>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">
                    {t('info.deliveryTimeDesc')}
                  </p>
                </div>
              </div>
              <a
                href="tel:+995598901848"
                className="flex flex-col items-center gap-3 hover:opacity-75 transition-opacity"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{t('info.contactUs')}</h3>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">
                    {t('info.contactDesc')}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section id="menu" className="py-16 bg-background scroll-mt-header seigaiha-top">
          <div className="w-full px-4 sm:px-6 lg:px-12">
            <div className="flex gap-8">
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-h-[600px]">
                
                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <Select value={activeCategory} onValueChange={handleCategorySelect}>
                    <SelectTrigger className="w-full sm:w-[280px] bg-card border-border h-12 rounded-xl text-foreground font-medium">
                      <SelectValue placeholder={t('menu.allProducts')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">{t('menu.allProducts')}</SelectItem>
                      {categories.map(category => <SelectItem key={category} value={category}>
                          {t(`categories.${getCategoryTranslationKey(category)}`)}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>

                  {/* Mobile Layout Toggle */}
                  <div className="flex sm:hidden">
                    <button onClick={toggleGridLayout} className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors border ${gridLayout === 'compact' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'}`} aria-label="Toggle grid layout">
                      <Grid2x2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Products */}
                <div className="flex-1">
                  <AnimatePresence mode="popLayout">
                    {displayCategories.map(category => {
                    const categoryItems = menuItems.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;
                    return <motion.div key={category} initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} exit={{
                      opacity: 0,
                      y: -20
                    }} transition={{
                      duration: 0.3
                    }} className="mb-16">
                          <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold text-foreground" style={{
                          letterSpacing: '-0.02em'
                        }}>
                              {t(`categories.${getCategoryTranslationKey(category)}`)}
                            </h2>
                            <div className="seigaiha-line flex-1 mt-2"></div>
                          </div>
                          <div className={`grid gap-4 sm:gap-6 ${gridLayout === 'compact' ? 'grid-cols-2' : 'grid-cols-1'} sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`}>
                            {categoryItems.map(item => <MenuCard key={item.id} item={item} onClick={() => handleCardClick(item)} />)}
                          </div>
                        </motion.div>;
                  })}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Desktop Cart - Fixed Bottom Right */}
      {cart.length > 0 && <div className="hidden xl:block fixed bottom-6 right-6 z-50 w-80 pointer-events-auto">
          <Cart items={cart} onRemoveItem={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
        </div>}

      {/* Mobile Cart - Fixed Bottom */}
      {cart.length > 0 && <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 p-4 pb-4">
          <div className="max-w-7xl mx-auto">
            <Cart items={cart} onRemoveItem={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
          </div>
        </div>}

      <Footer />

      <ProductModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
    </div>;
}
export default HomePage;
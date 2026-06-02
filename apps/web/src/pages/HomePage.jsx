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
import { supabase } from '../lib/supabase';
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
  const [activePromo, setActivePromo] = useState(null);

  useEffect(() => {
    const fetchPromo = async () => {
      const now = new Date().toISOString();
      const { data } = await supabase.from('promo_codes')
        .select('*')
        .eq('is_active', true)
        .not('applicable_products', 'is', null)
        .or(`valid_from.is.null,valid_from.lte.${now}`)
        .or(`expires_at.is.null,expires_at.gte.${now}`)
        .limit(1)
        .maybeSingle();
      setActivePromo(data || null);
    };
    fetchPromo();
  }, []);

  const PROMO_CAT = 'Promotion';
  const promoItems = activePromo?.applicable_products?.length > 0
    ? menuItems.filter(i => {
        const name = i.name?.en || i.name;
        return activePromo.applicable_products.includes(name);
      }).filter((item, idx, arr) => arr.findIndex(x => (x.name?.en||x.name) === (item.name?.en||item.name)) === idx)
    : [];

  const allCategories = promoItems.length > 0
    ? [PROMO_CAT, ...categories]
    : categories;

  const displayCategories = activeCategory === 'ALL' ? allCategories : [activeCategory];

  const BTN_STYLES = [
    { before:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 6px 30px rgba(255,255,255,0.35)' } },
    { before:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'10px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'10px', boxShadow:'0 6px 30px rgba(255,255,255,0.35)' } },
    { before:{ background:'rgba(255,255,255,0.2)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.5)', borderRadius:'100px' }, after:{ background:'rgba(255,255,255,0.95)', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'100px', boxShadow:'0 8px 32px rgba(255,255,255,0.3)' } },
    { before:{ background:'rgba(255,255,255,0.2)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.5)', borderRadius:'12px' }, after:{ background:'rgba(255,255,255,0.95)', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'12px', boxShadow:'0 8px 32px rgba(255,255,255,0.3)' } },
    { before:{ background:'rgba(255,255,255,0.25)', color:'#fff', border:'none', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'none', borderRadius:'100px', transform:'translateY(-3px)', boxShadow:'0 12px 36px rgba(255,255,255,0.35)' } },
    { before:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 0 0 4px rgba(255,255,255,0.15)' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 0 0 5px rgba(255,255,255,0.25), 0 6px 28px rgba(255,255,255,0.3)' } },
    { before:{ background:'rgba(255,255,255,0.18)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.6)', borderRadius:'100px' }, after:{ background:'rgba(255,255,255,0.95)', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'100px', transform:'scale(1.06)', boxShadow:'0 8px 28px rgba(255,255,255,0.3)' } },
    { before:{ background:'#fff', color:'#1a1a1a', border:'none', borderRadius:'100px' }, after:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 0 24px rgba(255,255,255,0.25)' } },
    { before:{ background:'transparent', color:'#fff', border:'2px solid rgba(255,255,255,0.8)', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 4px 0 rgba(200,200,200,0.6), 0 8px 24px rgba(255,255,255,0.3)' } },
    { before:{ background:'rgba(255,255,255,0.22)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.55)', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'100px', boxShadow:'0 0 0 3px rgba(255,255,255,0.2), 0 0 0 8px rgba(255,255,255,0.08), 0 6px 28px rgba(255,255,255,0.35)' } },
    { before:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'6px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'6px', boxShadow:'4px 4px 0 rgba(255,255,255,0.4)' } },
    { before:{ background:'rgba(255,255,255,0.3)', color:'#fff', border:'1px solid rgba(255,255,255,0.6)', borderRadius:'14px' }, after:{ background:'#fff', color:'#1a1a1a', border:'1px solid #fff', borderRadius:'14px', transform:'translateY(-3px)', boxShadow:'0 12px 36px rgba(255,255,255,0.35)' } },
    { before:{ background:'rgba(255,255,255,0.08)', color:'#fff', border:'2px solid rgba(255,255,255,0.7)', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 6px 28px rgba(255,255,255,0.35)' } },
    { before:{ background:'rgba(255,255,255,0.15)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.45)', borderRadius:'100px' }, after:{ background:'#fff', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'100px', boxShadow:'0 6px 30px rgba(255,255,255,0.35)' } },
    { before:{ background:'rgba(255,255,255,0.22)', color:'#fff', border:'2px solid rgba(255,255,255,0.55)', borderRadius:'100px' }, after:{ background:'rgba(255,255,255,0.95)', color:'#1a1a1a', border:'2px solid #fff', borderRadius:'100px', transform:'scale(1.05)', boxShadow:'0 0 0 4px rgba(255,255,255,0.2), 0 8px 30px rgba(255,255,255,0.35)' } },
    { before:{ background:'transparent', color:'#fff', border:'2.5px solid #fff', borderRadius:'4px' }, after:{ background:'#fff', color:'#1a1a1a', border:'2.5px solid #fff', borderRadius:'4px', boxShadow:'0 6px 24px rgba(255,255,255,0.3)' } },
    { before:{ background:'rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.9)', border:'1.5px solid rgba(255,255,255,0.4)', borderRadius:'16px' }, after:{ background:'#fff', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'16px', transform:'translateY(-2px)', boxShadow:'0 10px 30px rgba(255,255,255,0.3)' } },
    { before:{ background:'transparent', color:'#fff', border:'1.5px solid rgba(255,255,255,0.6)', borderRadius:'100px', boxShadow:'0 0 0 5px rgba(255,255,255,0.1)' }, after:{ background:'rgba(255,255,255,0.95)', color:'#1a1a1a', border:'1.5px solid #fff', borderRadius:'100px', boxShadow:'0 0 0 5px rgba(255,255,255,0.2), 0 8px 28px rgba(255,255,255,0.35)' } },
    { before:{ background:'rgba(255,255,255,0.28)', color:'#fff', border:'2px solid rgba(255,255,255,0.7)', borderRadius:'100px' }, after:{ background:'transparent', color:'#fff', border:'2px solid #fff', borderRadius:'100px', boxShadow:'0 0 30px rgba(255,255,255,0.3)', transform:'scale(1.04)' } },
    { before:{ background:'rgba(255,255,255,0.2)', color:'#fff', border:'none', borderRadius:'100px', boxShadow:'0 0 0 3px rgba(255,255,255,0.3)' }, after:{ background:'#fff', color:'#1a1a1a', border:'none', borderRadius:'100px', boxShadow:'0 0 0 3px rgba(255,255,255,0.3), 0 0 0 8px rgba(255,255,255,0.1), 0 8px 32px rgba(255,255,255,0.4)', transform:'translateY(-2px)' } },
  ];

  const [btnIdx, setBtnIdx] = React.useState(0);
  const [btnHovered, setBtnHovered] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setBtnIdx(i => (i + 1) % BTN_STYLES.length), 10000);
    return () => clearInterval(t);
  }, []);
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
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
              <Button
                onClick={scrollToMenu}
                size="lg"
                className="hero-btn text-lg px-8 py-6 active:scale-98"
                style={{ transition:'all 0.5s ease', ...(btnHovered ? BTN_STYLES[btnIdx].after : BTN_STYLES[btnIdx].before) }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                {t('hero.orderNow')}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Restaurant Info */}
        <section className="py-8 bg-card border-y border-border relative z-20 seigaiha-sides">
          <div className="w-full px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-center">
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
              {/* Wayō Buddhist Main Hall 金堂 */}
              <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 100 140" width="110" height="140" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" opacity="0.4">
                    <path d="M30,24 L50,8 L70,24"/>
                    <line x1="30" y1="24" x2="70" y2="24"/>
                    <line x1="4" y1="50" x2="30" y2="24"/>
                    <line x1="96" y1="50" x2="70" y2="24"/>
                    <path d="M2,52 Q5,48 9,50 L91,50 Q95,48 98,52"/>
                    <rect x="8" y="44" width="84" height="5"/>
                    <rect x="21" y="41" width="7" height="4"/>
                    <rect x="34" y="41" width="7" height="4"/>
                    <rect x="47" y="41" width="7" height="4"/>
                    <rect x="60" y="41" width="7" height="4"/>
                    <rect x="72" y="41" width="7" height="4"/>
                    <rect x="14" y="50" width="72" height="22"/>
                    <line x1="25" y1="50" x2="25" y2="72"/>
                    <line x1="38" y1="50" x2="38" y2="72"/>
                    <line x1="62" y1="50" x2="62" y2="72"/>
                    <line x1="75" y1="50" x2="75" y2="72"/>
                    <rect x="43" y="57" width="7" height="15" rx="1"/>
                    <rect x="50" y="57" width="7" height="15" rx="1"/>
                    <line x1="10" y1="72" x2="90" y2="72"/>
                    <line x1="10" y1="78" x2="90" y2="78"/>
                    <line x1="22" y1="72" x2="22" y2="78"/><line x1="34" y1="72" x2="34" y2="78"/>
                    <line x1="50" y1="72" x2="50" y2="78"/><line x1="66" y1="72" x2="66" y2="78"/>
                    <line x1="78" y1="72" x2="78" y2="78"/>
                    <line x1="22" y1="78" x2="22" y2="92"/>
                    <line x1="50" y1="78" x2="50" y2="92"/>
                    <line x1="78" y1="78" x2="78" y2="92"/>
                    <rect x="8" y="92" width="84" height="10"/>
                    <line x1="5" y1="102" x2="95" y2="102"/>
                    <line x1="3" y1="109" x2="97" y2="109"/>
                    <line x1="1" y1="116" x2="99" y2="116"/>
                  </g>
                </svg>
              </div>

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
              {/* Wayō Buddhist Three-Story Pagoda 三重塔 */}
              <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 100 140" width="110" height="140" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" opacity="0.4">
                    <line x1="50" y1="3" x2="50" y2="16"/>
                    <circle cx="50" cy="7" r="2.5"/>
                    <line x1="32" y1="26" x2="50" y2="15"/>
                    <line x1="68" y1="26" x2="50" y2="15"/>
                    <path d="M30,27 Q32,25 34,27 L66,27 Q68,25 70,27"/>
                    <rect x="33" y="22" width="34" height="5"/>
                    <rect x="38" y="27" width="24" height="10"/>
                    <line x1="50" y1="27" x2="50" y2="37"/>
                    <line x1="20" y1="50" x2="38" y2="37"/>
                    <line x1="80" y1="50" x2="62" y2="37"/>
                    <path d="M18,51 Q20,49 22,51 L78,51 Q80,49 82,51"/>
                    <rect x="22" y="46" width="56" height="5"/>
                    <rect x="35" y="43" width="7" height="4"/>
                    <rect x="58" y="43" width="7" height="4"/>
                    <rect x="28" y="51" width="44" height="13"/>
                    <line x1="40" y1="51" x2="40" y2="64"/>
                    <line x1="60" y1="51" x2="60" y2="64"/>
                    <line x1="8" y1="78" x2="28" y2="64"/>
                    <line x1="92" y1="78" x2="72" y2="64"/>
                    <path d="M6,79 Q8,77 10,79 L90,79 Q92,77 94,79"/>
                    <rect x="10" y="73" width="80" height="6"/>
                    <rect x="22" y="70" width="7" height="4"/>
                    <rect x="46" y="70" width="7" height="4"/>
                    <rect x="70" y="70" width="7" height="4"/>
                    <rect x="16" y="79" width="68" height="15"/>
                    <line x1="30" y1="79" x2="30" y2="94"/>
                    <line x1="50" y1="79" x2="50" y2="94"/>
                    <line x1="70" y1="79" x2="70" y2="94"/>
                    <rect x="10" y="94" width="80" height="10"/>
                    <line x1="6" y1="104" x2="94" y2="104"/>
                    <line x1="4" y1="111" x2="96" y2="111"/>
                    <line x1="2" y1="118" x2="98" y2="118"/>
                  </g>
                </svg>
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
                      {allCategories.map(category => <SelectItem key={category} value={category}>
                          {category === PROMO_CAT ? 'Discount' : t(`categories.${getCategoryTranslationKey(category)}`)}
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
                    const isPromoCategory = category === PROMO_CAT;
                    const categoryItems = isPromoCategory
                      ? promoItems
                      : menuItems.filter(item => item.category === category);
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
                              {category === PROMO_CAT ? '🔥 Discount' : t(`categories.${getCategoryTranslationKey(category)}`)}
                            </h2>
                            <div className="seigaiha-line flex-1 mt-2"></div>
                          </div>
                          <div className={`grid gap-4 sm:gap-6 ${gridLayout === 'compact' ? 'grid-cols-2' : 'grid-cols-1'} sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`}>
                            {categoryItems.map(item => (
                              <MenuCard
                                key={item.id}
                                item={item}
                                onClick={() => handleCardClick(item)}
                                promoLabel={isPromoCategory && activePromo ? (
                                  activePromo.discount_type === 'percent'
                                    ? `-${activePromo.discount_value}%`
                                    : `-₾${activePromo.discount_value}`
                                ) : null}
                              />
                            ))}
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
      {cart.length > 0 && <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40">
          <Cart items={cart} onRemoveItem={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
        </div>}

      <Footer />

      <ProductModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToCart={handleAddToCart} />
    </div>;
}
export default HomePage;
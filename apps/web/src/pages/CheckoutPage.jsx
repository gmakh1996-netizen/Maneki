
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Minus, Plus, CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import SimpleCalendar from '../components/SimpleCalendar';

// Working hours: 14:00–23:30 then 00:00–02:00 (crosses midnight)
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 14; h < 24; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  for (let h = 0; h <= 2; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 2) slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
})();

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submittingRef = useRef(false);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null); // { code, discount_type, discount_value }
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  // Auto-apply promo if cart items match active promo products
  useEffect(() => {
    const autoApply = async () => {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!items.length) return;
      const { data } = await supabase.from('promo_codes')
        .select('*').eq('is_active', true).not('applicable_products', 'is', null);
      if (!data) return;
      const matched = data.find(p => {
        if (p.valid_from && new Date(p.valid_from) > new Date()) return false;
        if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
        if (p.max_uses && p.uses_count >= p.max_uses) return false;
        return items.some(i => p.applicable_products?.includes(i.name?.en || i.name));
      });
      if (matched) { setPromoApplied(matched); setPromoCode(matched.code); }
    };
    autoApply();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryDate: '',
    deliveryTime: '',
    chopstickSets: 0,
    address: '',
    instructions: ''
  });

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const maxDate = `${now.getFullYear()}-12-31`;

  const DELIVERY_OPTIONS = [
    { id: 'pickup',   label: t('checkout.pickup'),   price: 0,  description: t('checkout.pickupDesc') },
    { id: 'nearest',  label: t('checkout.nearest'),  price: 5,  description: t('checkout.nearestDesc') },
    { id: 'outlying', label: t('checkout.outlying'), price: 10, description: t('checkout.outlyingDesc') },
    { id: 'suburbs',  label: t('checkout.suburbs'),  price: 0,  isTaxi: true, description: t('checkout.suburbsDesc') }
  ];

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const selectedDelivery = DELIVERY_OPTIONS.find(opt => opt.id === deliveryMethod);
  const deliveryFee = selectedDelivery ? selectedDelivery.price : 0;
  // If promo has specific products, only apply discount to matching items
  const applicableSubtotal = promoApplied?.applicable_products?.length > 0
    ? cartItems.filter(i => promoApplied.applicable_products.includes(i.name?.en || i.name))
               .reduce((s, i) => s + i.price * i.quantity, 0)
    : subtotal;
  const discount = promoApplied
    ? promoApplied.discount_type === 'percent'
      ? Math.round(applicableSubtotal * promoApplied.discount_value / 100 * 100) / 100
      : Math.min(promoApplied.discount_value, applicableSubtotal)
    : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    setPromoApplied(null);
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', promoCode.trim().toUpperCase())
      .eq('is_active', true)
      .single();
    setPromoLoading(false);
    if (error || !data) { setPromoError('პრომოკოდი არასწორია'); return; }
    const now = new Date();
    if (data.valid_from && new Date(data.valid_from) > now) { setPromoError('პრომოკოდი ჯერ არ არის აქტიური'); return; }
    if (data.expires_at && new Date(data.expires_at) < now) { setPromoError('პრომოკოდი ვადაგასულია'); return; }
    if (data.max_uses && data.uses_count >= data.max_uses) { setPromoError('პრომოკოდი ამოწურულია'); return; }
    if (data.applicable_products?.length > 0) {
      const hasMatch = cartItems.some(i => data.applicable_products.includes(i.name?.en || i.name));
      if (!hasMatch) { setPromoError('კოდი ამ პროდუქტებზე არ ვრცელდება'); return; }
    }
    setPromoApplied(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChopsticks = (delta) => {
    setFormData(prev => ({
      ...prev,
      chopstickSets: Math.max(0, Math.min(20, prev.chopstickSets + delta))
    }));
  };

  const sendTelegramNotification = async (order) => {
    const TOKEN = '8816703197:AAFWJ38Bq8zELqhGVTNlrL8_MSAILsZLRfU';
    const CHAT_ID = '1183632494';

    const methodNames = {
      pickup: '🏪 გატანა (უფასო)',
      nearest: '🚗 ახლო რაიონი — 5₾',
      outlying: '🚗 შორი რაიონი — 10₾',
      suburbs: '🚕 გარეუბანი (ტაქსი)'
    };

    const itemsList = order.items
      .map(i => `• ${i.name?.ka || i.name?.en || i.name} x${i.quantity} — ${(i.price * i.quantity).toFixed(2)}₾`)
      .join('\n');

    const lines = [
      '🍣 *ახალი შეკვეთა!*',
      '',
      `👤 *სახელი:* ${order.customer.name}`,
      `📞 *ტელეფონი:* ${order.customer.phone}`,
      '',
      `📦 *პროდუქცია:*\n${itemsList}`,
      '',
      `🚗 *მიტანა:* ${methodNames[order.delivery.method] || order.delivery.method}`,
      order.customer.address ? `📍 *მისამართი:* ${order.customer.address}` : '',
      order.customer.deliveryDate ? `📅 *თარიღი:* ${order.customer.deliveryDate}` : '',
      order.customer.deliveryTime ? `🕐 *დრო:* ${order.customer.deliveryTime}` : '',
      order.customer.chopstickSets > 0 ? `🥢 *ჩხირები:* ${order.customer.chopstickSets} კომპლექტი` : '',
      order.customer.instructions ? `📝 *ინსტრუქცია:* ${order.customer.instructions}` : '',
      '',
      `💰 *სულ: ${order.total.toFixed(2)}₾${order.delivery.isTaxi ? ' + ტაქსი' : ''}*`,
    ].filter(Boolean).join('\n');

    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: 'Markdown' })
      });
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error(t('checkout.fillAllFields'));
      return;
    }
    if (!deliveryMethod) {
      toast.error(t('checkout.selectDeliveryMethod'));
      return;
    }
    if (deliveryMethod !== 'pickup' && !formData.address) {
      toast.error(t('checkout.fillAllFields'));
      return;
    }

    if (formData.deliveryTime && formData.deliveryDate === today) {
      const [h] = formData.deliveryTime.split(':').map(Number);
      const isAfterMidnightSlot = h < 14;
      if (!isAfterMidnightSlot) {
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const slotMinutes = toMinutes(formData.deliveryTime);
        if (slotMinutes < nowMinutes + 90) {
          toast.error(t('checkout.selectFutureTime'));
          return;
        }
      }
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      customer: formData,
      delivery: { method: deliveryMethod, fee: deliveryFee, isTaxi: selectedDelivery?.isTaxi },
      subtotal,
      total,
      timestamp: new Date().toISOString()
    };

    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsLoading(true);
    try {
      // Supabase-ში შეკვეთის შენახვა
      await supabase.from('orders').insert({
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address || null,
        delivery_type: deliveryMethod,
        delivery_date: formData.deliveryDate || null,
        delivery_time: formData.deliveryTime || null,
        items: cartItems.map(i => ({
          id: i.id,
          name: i.name?.en || i.name,
          quantity: i.quantity,
          price: i.price
        })),
        subtotal,
        delivery_fee: deliveryFee,
        discount,
        total,
        promo_code: promoApplied?.code || null,
        chopstick_sets: formData.chopstickSets || 0,
        notes: formData.instructions || null,
        status: 'new'
      });

      if (promoApplied) {
        await supabase.from('promo_codes')
          .update({ uses_count: promoApplied.uses_count + 1 })
          .eq('id', promoApplied.id);
      }
      localStorage.removeItem('cart');
      await sendTelegramNotification(order);
      setOrderPlaced(true);
    } finally {
      submittingRef.current = false;
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Helmet>
          <title>{t('checkout.orderConfirmed')} - Maneki Sushi</title>
        </Helmet>
        <div className="max-w-md w-full text-center">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('checkout.orderConfirmed')}</h1>
            <p className="text-muted-foreground mb-6">{t('checkout.orderConfirmedDesc')}</p>
            <div className="bg-muted rounded-xl p-4 mb-6 text-left">
              {formData.deliveryDate ? (
                <>
                  <p className="text-sm text-muted-foreground mb-1">{t('checkout.scheduledFor')}</p>
                  <p className="text-lg font-bold text-primary">
                    {format(parseISO(formData.deliveryDate), 'MMMM d, yyyy')}
                    {formData.deliveryTime ? ` at ${formData.deliveryTime}` : ''}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-1">
                    {deliveryMethod === 'pickup' ? t('checkout.estimatedPrepTime') : t('checkout.estimatedDelivTime')}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {deliveryMethod === 'pickup' ? t('checkout.prepMin') : t('checkout.delivMin')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {deliveryMethod === 'pickup' ? t('checkout.prepTime') : t('checkout.prepDelivTime')}
                  </p>
                </>
              )}
            </div>
            {/* Keepz QR Payment */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-border shadow-lg">
              <div className="bg-[#1a1250] p-5 flex flex-col items-center gap-3">
                <p className="text-white font-bold text-sm tracking-wide opacity-80">
                  {language === 'ka' ? 'QR კოდით გადახდა' : language === 'ru' ? 'Оплата по QR' : 'Pay by QR code'}
                </p>
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://tiny.keepz.me/udfvtrrv`}
                    alt="Keepz QR"
                    width={180} height={180}
                    className="block"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#7b61ff] text-lg">✦</span>
                  <span className="text-white font-bold text-lg tracking-wide">keepz</span>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap opacity-90">
                  <span className="text-white text-xs font-bold">🍎 Pay</span>
                  <span className="text-white text-xs font-bold">G Pay</span>
                  <span className="text-white text-xs font-bold tracking-widest">VISA</span>
                  <span className="text-xl">💳</span>
                  <span className="text-orange-400 text-xs font-bold">₿</span>
                </div>
                <a href="https://tiny.keepz.me/udfvtrrv" target="_blank" rel="noopener noreferrer"
                  className="text-[#a0f0a0] text-xs underline">keepz.me</a>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-4 text-left space-y-4">
              {[
                { bank: 'TBS', iban: 'GE34TB7237345064300076' },
                { bank: 'BOG', iban: 'GE61BG0000000101112512' },
              ].map(({ bank, iban }) => (
                <div key={bank} className="bg-muted/50 rounded-xl p-4 border border-border text-sm space-y-2">
                  <p className="font-bold text-base">{bank}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-muted-foreground flex-1">{iban}</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(iban).then(() => {
                        const el = document.getElementById(`copy-${bank}`);
                        const copied = language === 'ka' ? 'დაკოპ.' : language === 'ru' ? 'Скопир.' : '✓';
                        const orig = language === 'ka' ? 'კოპირება' : language === 'ru' ? 'Копировать' : 'Copy';
                        if (el) { el.textContent = copied; setTimeout(() => { el.textContent = orig; }, 1500); }
                      })}
                      className="shrink-0 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"
                    >
                      <span id={`copy-${bank}`}>{language === 'ka' ? 'კოპირება' : language === 'ru' ? 'Копировать' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-muted-foreground text-xs">Shota Esebua</p>
                </div>
              ))}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-700 dark:text-amber-400 space-y-2">
                <p>⚠️ {language === 'ka'
                  ? 'Credo, Basis Bank-იდან და საზღვარგარეთის ბანკებიდან გადარიცხვა მხოლოდ ონლაინ ტერმინალით:'
                  : language === 'ru'
                  ? 'Переводы из Credo, Basis Bank и иностранных банков принимаются только через онлайн-терминал:'
                  : 'Transfer payments from Credo, Basis Bank and foreign banks are accepted only through an online terminal:'}</p>
                <a href="https://tiny.keepz.me/udfvtrrv" target="_blank" rel="noopener noreferrer"
                  className="font-bold underline break-all">https://tiny.keepz.me/udfvtrrv</a>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-xs text-foreground space-y-2">
                <p>✅ {language === 'ka'
                  ? 'შეკვეთის მომზადებას ვიწყებთ მხოლოდ გადახდის მიღების შემდეგ.'
                  : language === 'ru'
                  ? 'Мы начинаем готовить заказ только после получения оплаты на наш счёт.'
                  : 'We begin preparing the order only after payment has been received into our account.'}</p>
                <p>📞 {language === 'ka'
                  ? <>შეკვეთის განთავსებიდან 10 წუთში დაგირეკავთ. თუ ზარი არ შემოვიდა, მოგვწერეთ Instagram-ზე ან დარეკეთ <strong>598901848</strong></>
                  : language === 'ru'
                  ? <>После оформления заказа мы позвоним вам в течение 10 минут. Если звонка нет — напишите нам в Instagram или позвоните <strong>598901848</strong></>
                  : <>After you have made an order, we will call you within 10 minutes. If something goes wrong and there is no call, write to us on Instagram or call <strong>598901848</strong></>}</p>
              </div>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98 mt-6"
            >
              {t('checkout.continueToWebsite')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{t('checkout.title')} - Maneki Sushi</title>
      </Helmet>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 transition-all duration-200 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('checkout.backToMenu')}
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{letterSpacing: '-0.02em'}}>
          {t('checkout.title')}
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">

                {/* Contact Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-2">{t('checkout.contactDetails')}</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('checkout.fullName')}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-input text-foreground placeholder:text-muted-foreground"
                        placeholder={t('checkout.fullNamePlaceholder')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('checkout.phoneNumber')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-input text-foreground placeholder:text-muted-foreground"
                        placeholder={t('checkout.phonePlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('checkout.deliveryTime')}</Label>
                    <Select
                      value={formData.deliveryTime}
                      onValueChange={(val) => setFormData({ ...formData, deliveryTime: val })}
                    >
                      <SelectTrigger className="bg-input text-foreground w-full">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <SelectValue placeholder={t('checkout.selectTime')} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map(slot => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label>{t('checkout.chopstickSets')}</Label>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleChopsticks(-1)}
                        disabled={formData.chopstickSets <= 0}
                        className="bg-muted border-border transition-all duration-200 active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-semibold w-10 text-center tabular-nums">
                        {formData.chopstickSets}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleChopsticks(1)}
                        disabled={formData.chopstickSets >= 20}
                        className="bg-muted border-border transition-all duration-200 active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h2 className="text-xl font-semibold mb-4">{t('checkout.deliveryInfo')}</h2>

                  <div className="space-y-4 mb-6">
                    <Label className="text-base font-medium text-muted-foreground">
                      {t('checkout.selectMethod')}
                    </Label>
                    <RadioGroup
                      value={deliveryMethod}
                      onValueChange={setDeliveryMethod}
                      className="grid gap-3"
                    >
                      {DELIVERY_OPTIONS.map((option) => (
                        <div key={option.id}>
                          <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                          <Label
                            htmlFor={option.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                          >
                            <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                              <span className="font-semibold text-foreground">{option.label}</span>
                              <span className="text-sm text-muted-foreground font-normal">{option.description}</span>
                            </div>
                            <span className="font-medium text-primary whitespace-nowrap">
                              {option.isTaxi ? t('checkout.atTaxiPrices') : option.price === 0 ? t('checkout.free') : `₾${option.price.toFixed(2)}`}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {deliveryMethod && deliveryMethod !== 'pickup' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="address">{t('checkout.deliveryAddress')}</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={deliveryMethod !== 'pickup'}
                        className="bg-input text-foreground placeholder:text-muted-foreground resize-none"
                        placeholder={t('checkout.addressPlaceholder')}
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="instructions">{t('checkout.additionalInstructions')}</Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      className="bg-input text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder={t('checkout.instructionsPlaceholder')}
                      rows={2}
                    />
                  </div>
                </div>

              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold mb-6">{t('checkout.orderSummary')}</h2>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map((item) => {
                  const itemName = item.name?.[language] || item.name?.en || '';
                  return (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <img src={item.image} alt={itemName} className="w-16 h-16 rounded-lg object-cover bg-muted" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">{itemName}</h3>
                        <p className="text-sm text-muted-foreground">₾{item.price.toFixed(2)} × {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary mt-1">₾{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">🎟 პრომოკოდი</p>
                <div className="flex gap-2">
                  <input type="text" value={promoCode}
                    onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); setPromoApplied(null); }}
                    placeholder="კოდი"
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                  <button type="button" onClick={applyPromoCode}
                    disabled={promoLoading || !promoCode.trim()}
                    className="px-4 h-9 rounded-md bg-primary text-white text-sm font-medium disabled:opacity-50">
                    {promoLoading ? '...' : 'გამოყენება'}
                  </button>
                </div>
                {promoError && <p className="text-xs text-destructive mt-1">{promoError}</p>}
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ {promoApplied.code} — {promoApplied.discount_type === 'percent' ? `${promoApplied.discount_value}%` : `₾${promoApplied.discount_value}`} ფასდაკლება
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('checkout.subtotal')}</span>
                  <span className="font-medium tabular-nums">₾{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('checkout.deliveryFee')}</span>
                  <span className="font-medium tabular-nums">
                    {selectedDelivery?.isTaxi ? t('checkout.atTaxiPrices') : `₾${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>ფასდაკლება ({promoApplied?.code})</span>
                    <span>-₾{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>{t('checkout.total')}</span>
                  <span className="text-primary tabular-nums">
                    ₾{total.toFixed(2)}
                    {selectedDelivery?.isTaxi && (
                      <span className="text-xs font-normal text-muted-foreground ml-1">+ {t('checkout.atTaxiPrices')}</span>
                    )}
                  </span>
                </div>
              </div>

              {deliveryMethod && <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {deliveryMethod === 'pickup' ? t('checkout.estimatedPrep') : t('checkout.estimatedDeliv')}:{' '}
                  <span className="font-semibold text-foreground">
                    {deliveryMethod === 'pickup' ? t('checkout.prepMin') : t('checkout.delivMin')}
                  </span>
                </p>
              </div>}
            </div>
          </div>
        </div>

        {/* Place Order — სულ ბოლოში */}
        <div className="mt-6">
          <Button
            type="submit"
            form="checkout-form"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98 h-14 text-lg disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('checkout.placeOrder')}
              </span>
            ) : t('checkout.placeOrder')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

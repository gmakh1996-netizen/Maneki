import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Ticket, Tag, MapPin, CalendarDays, RotateCw, Bell, Volume2, VolumeX, Check, Crosshair, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SimpleCalendar from '../components/SimpleCalendar';
import { menuItems } from '../data/menuData';

const FILTER_CATS = new Set(['No Spicy Sushi Menu', 'No Raw Fish Menu', 'Roll Menu (Full List)']);

const CAT_OVERRIDE = {
  '"Alaska" Shrimp Roll':        'Roll Menu',
  'Alaska Shrimp Roll':          'Roll Menu',
  'Combo Shrimp':                'Special Rolls Menu',
  'Donburi with Shrimps':        'Domburi Menu',
  'Domburi with Shrimps':        'Domburi Menu',
  'Chicken Roll':                'Roll Menu',
  'Hot Roll Salmon':             'Hot Rolls Menu',
  'California Roll with Salmon': 'Roll Menu',
  'California Roll with Crab':   'Roll Menu',
  'Shrimp Tempura Roll':         'Roll Menu',
  'Unagi Roll':                  'Roll Menu',
  'Roll "Snow Crab"':            'Roll Menu',
  'Cheesy Fried Salmon':         'Special Rolls Menu',
  'Rainbow Roll':                'Roll Menu',
  'Roll Canada':                 'Roll Menu',
  'Salmon Roll':                 'Roll Menu',
  'Vegetarian Roll':             'Roll Menu',
};

const UNIQUE_PRODUCTS = (() => {
  const byName = {};
  menuItems.forEach(item => {
    const name = item.name?.en || item.name;
    if (!byName[name]) byName[name] = [];
    byName[name].push({ name, price: item.price, category: item.category });
  });
  return Object.values(byName).map(appearances => {
    const name = appearances[0].name;
    if (CAT_OVERRIDE[name]) return { ...appearances[0], category: CAT_OVERRIDE[name] };
    const primary = appearances.find(a => !FILTER_CATS.has(a.category));
    return primary || appearances[0];
  });
})();

const PRODUCTS_BY_CAT = UNIQUE_PRODUCTS.reduce((acc, p) => {
  const cat = p.category.replace(' Menu', '').replace(' (Full List)', '');
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(p);
  return acc;
}, {});

let _audio = null;
const getAudio = () => {
  if (!_audio) { _audio = new Audio('/beep.wav'); _audio.preload = 'auto'; }
  return _audio;
};
const beep = () => { try { const a = getAudio(); a.currentTime = 0; a.play(); } catch(_){} };

const ADMIN_PASSWORD = 'maneki2024';

const T = {
  en: {
    title: 'Admin Panel — Maneki Sushi', logout: 'Logout',
    soundOn: 'Sound On', soundOff: 'Sound Off', notifEnable: 'Notifications',
    orders: 'Orders', promos: 'Promo Codes', total: 'Total', refresh: 'Refresh',
    newOrder: 'New Order!', status: 'Status:', new: 'New', completed: 'Completed',
    revenue: 'Revenue', completedOrders: 'Completed',
    addPromo: 'New Promo Code', code: 'Code (e.g. SALE10)',
    typePromoCode: 'Promo Code (manual entry)', typePromotion: 'Promotion (auto, shows on homepage)',
    promoTypeLabel: 'Type',
    percent: 'Percent (%)', fixed: 'Fixed (₾)',
    discountPct: 'Discount % (e.g. 10)', discountFixed: 'Discount ₾ (e.g. 5)',
    maxUses: 'Max uses (empty=∞)', maxUsesEx: 'e.g. 100',
    from: 'Valid from', to: 'Valid until', fromPh: 'From (opt.)', toPh: 'Until (opt.)',
    filterFrom: 'From', filterTo: 'To', filterAll: 'All dates', clearFilter: 'Clear',
    add: '+ Add', active: 'Active', totalPromos: 'Total', expired: 'Expired',
    activeStatus: 'Active', expiredStatus: 'Expired', notStarted: 'Not started',
    disabled: 'Disabled', disable: 'Disable', enable: 'Enable', deletePromo: 'Delete',
    discount: 'discount', used: 'used', password: 'Password', login: 'Login',
    wrongPass: 'Wrong password', noOrders: 'No orders yet', loading: 'Loading...',
    deleteOrder: 'Delete', confirmDelete: 'Delete this order?', confirmDeletePromo: 'Delete promo code?',
    editMaxUses: 'Edit limit', editCode: 'Rename', save: 'Save', today: 'Today', yesterday: 'Yesterday',
    editOrder: 'Edit', cancelEdit: 'Cancel', saveOrder: 'Save order', addProducts: 'Add products', currentItems: 'Current items',
  },
  ka: {
    title: 'ადმინ პანელი — Maneki Sushi', logout: 'გასვლა',
    soundOn: 'ხმა ჩართ.', soundOff: 'ხმა გამორთ.', notifEnable: 'Notification',
    orders: 'შეკვეთები', promos: 'პრომოკოდები', total: 'სულ', refresh: 'განახლება',
    newOrder: 'ახალი შეკვეთა!', status: 'სტატუსი:', new: 'ახალი', completed: 'დასრულდა',
    revenue: 'შემოსავალი', completedOrders: 'დასრულებული',
    addPromo: 'ახალი პრომოკოდი', code: 'კოდი (მაგ. SALE10)',
    typePromoCode: 'პრომო კოდი (ხელით შეყვანა)', typePromotion: 'Promotion (ავტო, მთ. გვერდზე)',
    promoTypeLabel: 'ტიპი',
    percent: 'პროცენტი (%)', fixed: 'ფიქსირებული (₾)',
    discountPct: 'ფასდ. % (მაგ. 10)', discountFixed: 'ფასდ. ₾ (მაგ. 5)',
    maxUses: 'მაქს. გამოყენება (ცარ.=∞)', maxUsesEx: 'მაგ. 100',
    from: 'დასაწყისი', to: 'დასასრული', fromPh: 'საიდან (სურვ.)', toPh: 'სამდე (სურვ.)',
    filterFrom: 'საიდან', filterTo: 'სამდე', filterAll: 'ყველა', clearFilter: 'გასუფთავება',
    add: '+ დამატება', active: 'აქტიური', totalPromos: 'სულ', expired: 'ვადაგასული',
    activeStatus: 'აქტიურია', expiredStatus: 'ვადაგასული', notStarted: 'ჯერ არ დაწყებულა',
    disabled: 'გათიშული', disable: 'გათიშვა', enable: 'ჩართვა', deletePromo: 'წაშლა',
    discount: 'ფასდ.', used: 'გამოყ.', password: 'პაროლი', login: 'შესვლა',
    wrongPass: 'არასწორი პაროლი', noOrders: 'შეკვეთები არ არის', loading: 'იტვირთება...',
    deleteOrder: 'წაშლა', confirmDelete: 'შეკვეთა წაიშალოს?', confirmDeletePromo: 'პრომოკოდი წაიშალოს?',
    editMaxUses: 'ლიმიტის ცვლილება', editCode: 'სახელის ცვლა', save: 'შენახვა', today: 'დღეს', yesterday: 'გუშინ',
    editOrder: 'რედაქტირება', cancelEdit: 'გაუქმება', saveOrder: 'შეკვეთის შენახვა', addProducts: 'პროდუქტის დამატება', currentItems: 'მიმდინარე პროდუქტები',
  },
  ru: {
    title: 'Админ Панель — Maneki Sushi', logout: 'Выйти',
    soundOn: 'Звук вкл.', soundOff: 'Звук выкл.', notifEnable: 'Уведомления',
    orders: 'Заказы', promos: 'Промокоды', total: 'Всего', refresh: 'Обновить',
    newOrder: 'Новый заказ!', status: 'Статус:', new: 'Новый', completed: 'Завершён',
    revenue: 'Выручка', completedOrders: 'Завершённых',
    addPromo: 'Новый промокод', code: 'Код (напр. SALE10)',
    typePromoCode: 'Промокод (ручной ввод)', typePromotion: 'Promotion (авто, на главной)',
    promoTypeLabel: 'Тип',
    percent: 'Процент (%)', fixed: 'Фиксированный (₾)',
    discountPct: 'Скидка % (напр. 10)', discountFixed: 'Скидка ₾ (напр. 5)',
    maxUses: 'Макс. использований (пусто=∞)', maxUsesEx: 'напр. 100',
    from: 'Действует с', to: 'Действует до', fromPh: 'С (необяз.)', toPh: 'До (необяз.)',
    filterFrom: 'С', filterTo: 'До', filterAll: 'Все даты', clearFilter: 'Сбросить',
    add: '+ Добавить', active: 'Активных', totalPromos: 'Всего', expired: 'Истёкших',
    activeStatus: 'Активен', expiredStatus: 'Истёк', notStarted: 'Не начался',
    disabled: 'Отключён', disable: 'Отключить', enable: 'Включить', deletePromo: 'Удалить',
    discount: 'скидка', used: 'исп.', password: 'Пароль', login: 'Войти',
    wrongPass: 'Неверный пароль', noOrders: 'Заказов нет', loading: 'Загрузка...',
    deleteOrder: 'Удалить', confirmDelete: 'Удалить заказ?', confirmDeletePromo: 'Удалить промокод?',
    editMaxUses: 'Изменить лимит', editCode: 'Переименовать', save: 'Сохранить', today: 'Сегодня', yesterday: 'Вчера',
    editOrder: 'Редактировать', cancelEdit: 'Отмена', saveOrder: 'Сохранить заказ', addProducts: 'Добавить продукты', currentItems: 'Текущие позиции',
  }
};

function dateLabel(dateStr, t) {
  const d = new Date(dateStr);
  const now = new Date();
  const todayStr = now.toDateString();
  const yd = new Date(now); yd.setDate(yd.getDate() - 1);
  if (d.toDateString() === todayStr) return t.today;
  if (d.toDateString() === yd.toDateString()) return t.yesterday;
  return d.toLocaleDateString();
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin') === '1');
  const [pass, setPass] = useState('');
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifPermission, setNotifPermission] = useState(() =>
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );
  const [lang, setLang] = useState('en');
  const t = T[lang];
  const lastOrderIdRef = useRef(null);

  // Date filter
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [calFilterFrom, setCalFilterFrom] = useState(false);
  const [calFilterTo, setCalFilterTo] = useState(false);

  // Promo form
  const [newPromo, setNewPromo] = useState({ code: '', discount_type: 'percent', discount_value: '', max_uses: '', valid_from: '', expires_at: '', promo_type: 'promo_code' });
  const [selectedProducts, setSelectedProducts] = useState([]); // for promo
  const [promoProductOpen, setPromoProductOpen] = useState(null);
  const [calendarFromOpen, setCalendarFromOpen] = useState(false);
  const [calendarToOpen, setCalendarToOpen] = useState(false);

  // Edit promo (unified panel)
  const [editingPromo, setEditingPromo] = useState(null);
  const [editMaxUses, setEditMaxUses] = useState('');
  const [editPromoCodeValue, setEditPromoCodeValue] = useState('');
  const [editPromoSelectedProducts, setEditPromoSelectedProducts] = useState([]);

  // Edit order
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editItems, setEditItems] = useState([]);
  const [openCat, setOpenCat] = useState(null);
  const [dialog, setDialog] = useState(null); // { message, onConfirm }

  const theme = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin', '1');
      setAuthed(true);
      getAudio().volume = 0.8;
      beep();
    } else alert(t.wrongPass);
  };

  useEffect(() => {
    if (!authed) return;
    if (tab === 'orders') fetchOrders();
    if (tab === 'promos') fetchPromos();
  }, [authed, tab]);

  useEffect(() => {
    if (!authed) return;
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
        const order = payload.new;
        if (lastOrderIdRef.current === order.id) return;
        lastOrderIdRef.current = order.id;
        if (soundEnabled) beep();
        setNewOrderAlert(order);
        setOrders(prev => prev.find(o => o.id === order.id) ? prev : [order, ...prev]);
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification('Maneki Sushi', {
            body: `${order.customer_name} · ${order.phone} · ₾${Number(order.total).toFixed(2)}`,
            icon: '/favicon.ico', tag: 'new-order', requireInteraction: true,
          });
        }
        setTimeout(() => setNewOrderAlert(null), 8000);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [authed, soundEnabled]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const fetchPromos = async () => {
    setLoading(true);
    const { data } = await supabase.from('promo_codes').select('*').order('id', { ascending: false });
    setPromos(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id) => {
    setDialog({ message: t.confirmDelete, onYes: async () => {
      setDialog(null);
      await supabase.from('orders').delete().eq('id', id);
      setOrders(prev => prev.filter(o => o.id !== id));
    }, onNo: () => setDialog(null) });
  };

  const addPromo = async () => {
    if (!newPromo.code || !newPromo.discount_value) {
      alert(lang === 'ka' ? 'შეავსე კოდი და ფასდაკლების ველი' : lang === 'ru' ? 'Заполните код и размер скидки' : 'Fill in the code and discount fields');
      return;
    }
    const { error } = await supabase.from('promo_codes').insert({
      code: newPromo.code.toUpperCase(),
      discount_type: newPromo.discount_type,
      discount_value: Number(newPromo.discount_value),
      max_uses: newPromo.max_uses ? Number(newPromo.max_uses) : null,
      valid_from: newPromo.valid_from ? new Date(newPromo.valid_from + 'T00:00:00').toISOString() : null,
      expires_at: newPromo.expires_at ? new Date(newPromo.expires_at + 'T23:59:59').toISOString() : null,
      is_active: true,
      applicable_products: selectedProducts.length > 0 ? selectedProducts : null,
      promo_type: newPromo.promo_type,
    });
    if (error) {
      alert((lang === 'ka' ? 'ვერ დაემატა: ' : lang === 'ru' ? 'Не удалось добавить: ' : 'Failed to add: ') + error.message);
      return;
    }
    setNewPromo({ code: '', discount_type: 'percent', discount_value: '', max_uses: '', valid_from: '', expires_at: '', promo_type: 'promo_code' });
    setSelectedProducts([]);
    fetchPromos();
  };

  const togglePromo = async (id, is_active) => {
    await supabase.from('promo_codes').update({ is_active: !is_active }).eq('id', id);
    fetchPromos();
  };

  const togglePromoType = async (id, currentType) => {
    const newType = currentType === 'promotion' ? 'promo_code' : 'promotion';
    await supabase.from('promo_codes').update({ promo_type: newType }).eq('id', id);
    setPromos(prev => prev.map(p => p.id === id ? { ...p, promo_type: newType } : p));
  };

  const deletePromo = (id) => {
    setDialog({ message: t.confirmDeletePromo, onYes: async () => {
      setDialog(null);
      await supabase.from('promo_codes').delete().eq('id', id);
      setPromos(prev => prev.filter(p => p.id !== id));
    }, onNo: () => setDialog(null) });
  };

  const startEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditItems((order.items || []).map(i => ({ name: i.name?.en || i.name || i.name, price: i.price, quantity: i.quantity })));
    setOpenCat(null);
  };

  const addEditItem = (product) => {
    setDialog({ message: `${product.name} — ₾${product.price}\n\nდაემატოს შეკვეთას?`, onYes: () => {
      setDialog(null);
      setEditItems(prev => {
        const ex = prev.find(i => i.name === product.name);
        if (ex) return prev.map(i => i.name === product.name ? { ...i, quantity: i.quantity + 1 } : i);
        return [...prev, { name: product.name, price: product.price, quantity: 1 }];
      });
    }, onNo: () => setDialog(null) });
  };

  const changeEditQty = (name, delta) => {
    setEditItems(prev => prev.map(i => i.name === name ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeEditItem = (name) => {
    setEditItems(prev => prev.filter(i => i.name !== name));
  };

  const saveEditOrder = async (order) => {
    const newSubtotal = editItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const deliveryFee = Number(order.delivery_fee) || 0;
    const discount = Number(order.discount) || 0;
    const newTotal = Math.max(0, newSubtotal + deliveryFee - discount);
    const items = editItems.map(i => ({ name: i.name, price: i.price, quantity: i.quantity }));
    await supabase.from('orders').update({ items, subtotal: newSubtotal, total: newTotal }).eq('id', order.id);
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, items, subtotal: newSubtotal, total: newTotal } : o));
    setEditingOrderId(null);
  };

  const openPromoEdit = (promo) => {
    setEditingPromo(promo.id);
    setEditPromoCodeValue(promo.code);
    setEditMaxUses(promo.max_uses ?? '');
    setEditPromoSelectedProducts(promo.applicable_products || []);
  };

  const savePromoEdit = async (id) => {
    const code = editPromoCodeValue.trim().toUpperCase();
    if (!code) {
      alert(lang === 'ka' ? 'კოდი ცარიელია' : lang === 'ru' ? 'Код пустой' : 'Code is empty');
      return;
    }
    const max_uses = editMaxUses === '' ? null : Number(editMaxUses);
    const applicable_products = editPromoSelectedProducts.length > 0 ? editPromoSelectedProducts : null;
    const { error } = await supabase.from('promo_codes')
      .update({ code, max_uses, applicable_products }).eq('id', id);
    if (error) {
      alert((lang === 'ka' ? 'ვერ შეინახა: ' : lang === 'ru' ? 'Не сохранилось: ' : 'Failed to save: ') + error.message);
      return;
    }
    setPromos(prev => prev.map(p => p.id === id ? { ...p, code, max_uses, applicable_products } : p));
    setEditingPromo(null);
  };

  // Filter orders by date
  const filteredOrders = orders.filter(o => {
    const d = o.created_at?.slice(0, 10);
    if (filterFrom && d < filterFrom) return false;
    if (filterTo && d > filterTo) return false;
    return true;
  });

  const completedRevenue = filteredOrders.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.total), 0);
  const completedCount = filteredOrders.filter(o => o.status === 'completed').length;

  const inp = 'w-full h-11 rounded-xl border border-border bg-background/70 px-3.5 text-base sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/35 focus:border-primary/60 placeholder:text-muted-foreground/60';

  if (!authed) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 seigaiha-sides">
      <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 sm:p-10 w-full max-w-sm space-y-6 shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="text-center space-y-1.5">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-xl font-bold text-primary select-none">M</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Maneki Sushi</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Panel</p>
        </div>
        <div className="space-y-3">
          <input type="password" placeholder={t.password} value={pass}
            onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            className={inp} />
          <button onClick={login}
            className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold tracking-wide transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]">
            {t.login}
          </button>
        </div>
        <div className="flex justify-center gap-1 pt-1">
          {['en','ka','ru'].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${lang===l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <audio src="/beep.wav" preload="auto" style={{display:'none'}} />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/60 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <h1 className="text-base sm:text-lg font-bold tracking-tight truncate">{t.title}</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-muted/70 border border-border/60 rounded-full p-0.5">
              {['en','ka','ru'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${lang===l ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={() => { if (!soundEnabled) { getAudio().volume = 0.8; beep(); } setSoundEnabled(v => !v); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${soundEnabled ? 'bg-card border-primary/35 text-foreground' : 'bg-muted border-border text-muted-foreground'}`}>
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-primary" /> : <VolumeX className="w-3.5 h-3.5" />}
              {soundEnabled ? t.soundOn : t.soundOff}
            </button>
            {notifPermission !== 'granted' && typeof Notification !== 'undefined' && (
              <button onClick={() => Notification.requestPermission().then(p => setNotifPermission(p))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/35">
                <Bell className="w-3.5 h-3.5" />
                {t.notifEnable}
              </button>
            )}
            <button onClick={() => { sessionStorage.removeItem('admin'); setAuthed(false); }}
              className="text-xs text-muted-foreground hover:text-foreground px-2 transition-colors">{t.logout}</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Custom confirm dialog */}
        {dialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-5">
              <p className="text-sm font-medium text-center whitespace-pre-line leading-relaxed">{dialog.message}</p>
              <div className="flex gap-3">
                <button onClick={() => { dialog.onNo(); }}
                  className="flex-1 h-11 rounded-xl border border-border bg-muted/60 text-sm font-medium transition-colors hover:bg-muted">
                  არა
                </button>
                <button onClick={() => { dialog.onYes(); }}
                  className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all hover:bg-primary/90 active:scale-[0.98]">
                  კი
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New order alert */}
        {newOrderAlert && (
          <div className="p-4 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground rounded-2xl flex items-center justify-between shadow-lg shadow-primary/25">
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <div className="min-w-0">
                <p className="font-bold">{t.newOrder}</p>
                <p className="text-sm opacity-90 truncate">{newOrderAlert.customer_name} · {newOrderAlert.phone} · ₾{Number(newOrderAlert.total).toFixed(2)}</p>
              </div>
            </div>
            <button onClick={() => setNewOrderAlert(null)} className="text-white/70 hover:text-white text-xl ml-4 shrink-0">✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="inline-flex items-center bg-card border border-border rounded-full p-1 shadow-sm">
          {[['orders', t.orders], ['promos', t.promos]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${tab===id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="space-y-3">
            {/* Revenue */}
            {completedCount > 0 && (
              <div className="relative overflow-hidden bg-card border border-border rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-l-2xl" />
                <div>
                  <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.15em]">{t.revenue}</p>
                  <p className="text-3xl font-bold tracking-tight text-foreground mt-1">₾{completedRevenue.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.15em]">{t.completedOrders}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{completedCount}</p>
                </div>
              </div>
            )}

            {/* Date filter */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.filterFrom}</p>
                  <SimpleCalendar
                    value={filterFrom}
                    onChange={d => { setFilterFrom(d); setCalFilterFrom(false); }}
                    open={calFilterFrom}
                    onToggle={() => { setCalFilterFrom(v => !v); setCalFilterTo(false); }}
                    minDate="2024-01-01" maxDate="2099-12-31"
                    theme={theme} placeholder={t.filterAll}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.filterTo}</p>
                  <SimpleCalendar
                    value={filterTo}
                    onChange={d => { setFilterTo(d); setCalFilterTo(false); }}
                    open={calFilterTo}
                    onToggle={() => { setCalFilterTo(v => !v); setCalFilterFrom(false); }}
                    minDate={filterFrom || "2024-01-01"} maxDate="2099-12-31"
                    theme={theme} placeholder={t.filterAll}
                  />
                </div>
              </div>
              {(filterFrom || filterTo) && (
                <button onClick={() => { setFilterFrom(''); setFilterTo(''); }}
                  className="mt-2 text-xs text-primary hover:underline">
                  ✕ {t.clearFilter}
                </button>
              )}
            </div>

            <div className="flex justify-between items-center px-1">
              <p className="text-sm text-muted-foreground">{t.total}: <span className="font-semibold text-foreground">{filteredOrders.length}</span></p>
              <button onClick={fetchOrders} className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"><RotateCw className="w-3.5 h-3.5" /> {t.refresh}</button>
            </div>

            {loading ? <p className="text-center py-8 text-muted-foreground">{t.loading}</p>
              : filteredOrders.length === 0 ? <p className="text-center py-8 text-muted-foreground">{t.noOrders}</p>
              : filteredOrders.map(order => (
              <div key={order.id} className={`bg-card border rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm transition-shadow hover:shadow-md ${order.status === 'completed' ? 'border-primary/25' : 'border-border'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{order.customer_name} — {order.phone}</p>
                    <p className="text-xs text-muted-foreground">
                      {dateLabel(order.created_at, t)} · {new Date(order.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </p>
                    {order.address && <p className="text-sm mt-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />{order.address}</p>}
                    {order.delivery_date && <p className="text-sm mt-0.5 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-muted-foreground shrink-0" />{order.delivery_date} {order.delivery_time}</p>}
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                    <p className="text-lg font-bold tracking-tight text-primary">₾{Number(order.total).toFixed(2)}</p>
                    {order.promo_code && <p className="text-xs font-medium text-primary flex items-center gap-1"><Ticket className="w-3 h-3" />{order.promo_code}</p>}
                    <button onClick={() => editingOrderId === order.id ? setEditingOrderId(null) : startEditOrder(order)}
                      className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 border border-border px-2.5 py-1 rounded-full transition-colors hover:text-primary hover:border-primary/40">
                      <Pencil className="w-3 h-3" />{editingOrderId === order.id ? t.cancelEdit : t.editOrder}
                    </button>
                    <button onClick={() => deleteOrder(order.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground border border-border px-2.5 py-1 rounded-full transition-colors hover:text-red-400 hover:border-red-400/40">
                      <Trash2 className="w-3 h-3" />{t.deleteOrder}
                    </button>
                  </div>
                </div>

                {/* Items list (normal view) */}
                {editingOrderId !== order.id && (
                  <div className="text-xs text-muted-foreground space-y-1 bg-muted/40 border border-border/50 rounded-xl px-3 py-2.5">
                    {(order.items || []).map((item, i) => (
                      <p key={i} className="flex justify-between gap-2">
                        <span className="truncate">{item.name?.en || item.name} <span className="text-muted-foreground/70">×{item.quantity}</span></span>
                        <span className="shrink-0 font-medium text-foreground/80">₾{(item.price * item.quantity).toFixed(2)}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* Edit panel */}
                {editingOrderId === order.id && (
                  <div className="border border-primary/30 rounded-xl p-3 space-y-3 bg-muted/30">
                    {/* Current items */}
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.currentItems}</p>
                    <div className="space-y-2">
                      {editItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="flex-1 text-sm truncate">{item.name}</span>
                          <span className="text-xs text-muted-foreground">₾{item.price}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => changeEditQty(item.name, -1)}
                              className="w-6 h-6 rounded bg-muted text-sm flex items-center justify-center hover:bg-border">−</button>
                            <span className="w-5 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => changeEditQty(item.name, 1)}
                              className="w-6 h-6 rounded bg-muted text-sm flex items-center justify-center hover:bg-border">+</button>
                          </div>
                          <button onClick={() => removeEditItem(item.name)}
                            className="text-muted-foreground transition-colors hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-primary">
                      ჯამი: ₾{editItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
                    </p>

                    {/* Product picker */}
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.addProducts}</p>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {Object.entries(PRODUCTS_BY_CAT).map(([cat, products]) => (
                        <div key={cat}>
                          <button onClick={() => setOpenCat(openCat === cat ? null : cat)}
                            className="w-full text-left px-2 py-1.5 rounded-lg bg-muted hover:bg-border text-xs font-semibold flex justify-between items-center">
                            <span>{cat}</span>
                            <span>{openCat === cat ? '▲' : '▼'}</span>
                          </button>
                          {openCat === cat && (
                            <div className="mt-1 space-y-1 pl-2">
                              {products.map((p, j) => (
                                <button key={j} onClick={() => addEditItem(p)}
                                  className="w-full text-left px-2 py-1 rounded-md text-xs hover:bg-primary/10 flex justify-between">
                                  <span>{p.name}</span>
                                  <span className="text-primary font-medium">₾{p.price}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Save */}
                    <button onClick={() => saveEditOrder(order)}
                      className="w-full h-9 bg-primary text-white rounded-lg text-sm font-medium">
                      <span className="flex items-center justify-center gap-1.5"><Check className="w-4 h-4" />{t.saveOrder}</span>
                    </button>
                  </div>
                )}

                {/* Only 2 statuses */}
                <div className="flex gap-2">
                  {[['new', t.new], ['completed', t.completed]].map(([key, label]) => (
                    <button key={key} onClick={() => updateStatus(order.id, key)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${order.status===key ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROMOS */}
        {tab === 'promos' && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-5 rounded-full bg-primary" />
                <h2 className="font-bold tracking-tight">{t.addPromo}</h2>
              </div>

              {/* Type selector */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">{t.promoTypeLabel}</p>
                <div className="flex gap-2 flex-wrap">
                  {[['promo_code', t.typePromoCode], ['promotion', t.typePromotion]].map(([val, label]) => (
                    <button key={val} type="button"
                      onClick={() => setNewPromo(p => ({...p, promo_type: val}))}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${newPromo.promo_type === val ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input value={newPromo.code} onChange={e => setNewPromo(p => ({...p, code: e.target.value.toUpperCase()}))}
                  placeholder={t.code} className={inp} />
                <select value={newPromo.discount_type} onChange={e => setNewPromo(p => ({...p, discount_type: e.target.value}))} className={inp}>
                  <option value="percent">{t.percent}</option>
                  <option value="fixed">{t.fixed}</option>
                </select>
                <input type="number" value={newPromo.discount_value}
                  onChange={e => setNewPromo(p => ({...p, discount_value: e.target.value}))}
                  placeholder={newPromo.discount_type==='percent' ? t.discountPct : t.discountFixed} className={inp} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.maxUses}</p>
                  <input type="number" value={newPromo.max_uses}
                    onChange={e => setNewPromo(p => ({...p, max_uses: e.target.value}))}
                    placeholder={t.maxUsesEx} className={inp} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.from}</p>
                  <SimpleCalendar value={newPromo.valid_from}
                    onChange={d => { setNewPromo(p => ({...p, valid_from: d})); setCalendarFromOpen(false); }}
                    open={calendarFromOpen} onToggle={() => { setCalendarFromOpen(v => !v); setCalendarToOpen(false); }}
                    minDate={new Date().toISOString().split('T')[0]} maxDate="2099-12-31"
                    theme={theme} placeholder={t.fromPh} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.to}</p>
                  <SimpleCalendar value={newPromo.expires_at}
                    onChange={d => { setNewPromo(p => ({...p, expires_at: d})); setCalendarToOpen(false); }}
                    open={calendarToOpen} onToggle={() => { setCalendarToOpen(v => !v); setCalendarFromOpen(false); }}
                    minDate={newPromo.valid_from || new Date().toISOString().split('T')[0]} maxDate="2099-12-31"
                    theme={theme} placeholder={t.toPh} />
                </div>
              </div>
              {/* Product selector */}
              <div className="border border-border rounded-xl overflow-hidden">
                <button type="button"
                  onClick={() => setPromoProductOpen(v => v === 'sel' ? null : 'sel')}
                  className="w-full flex justify-between items-center px-4 py-2.5 bg-muted text-sm font-medium hover:bg-border">
                  <span>
                    {selectedProducts.length === 0
                      ? (lang==='ka' ? 'ყველა პროდუქტზე (არჩევა სურვ.)' : lang==='ru' ? 'Все продукты (выбор необяз.)' : 'All products (select to limit)')
                      : (lang==='ka' ? `მონიშნულია: ${selectedProducts.length}` : lang==='ru' ? `Выбрано: ${selectedProducts.length}` : `Selected: ${selectedProducts.length}`)}
                  </span>
                  <span>{promoProductOpen === 'sel' ? '▲' : '▼'}</span>
                </button>
                {promoProductOpen === 'sel' && (
                  <div className="max-h-56 overflow-y-auto p-2 space-y-1">
                    {selectedProducts.length > 0 && (
                      <button type="button" onClick={() => setSelectedProducts([])}
                        className="w-full text-xs text-muted-foreground text-left px-2 py-1 rounded transition-colors hover:text-red-400 hover:bg-muted/50">
                        ✕ {lang==='ka' ? 'ყველას გაუქმება' : lang==='ru' ? 'Сбросить всё' : 'Clear all'}
                      </button>
                    )}
                    {Object.entries(PRODUCTS_BY_CAT).map(([cat, prods]) => (
                      <div key={cat}>
                        <p className="text-xs font-semibold text-muted-foreground px-2 py-1">{cat}</p>
                        {prods.map((p, i) => (
                          <label key={i} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted cursor-pointer">
                            <input type="checkbox"
                              checked={selectedProducts.includes(p.name)}
                              onChange={e => setSelectedProducts(prev =>
                                e.target.checked ? [...prev, p.name] : prev.filter(n => n !== p.name)
                              )} />
                            <span className="text-sm flex-1">{p.name}</span>
                            <span className="text-xs text-muted-foreground">₾{p.price}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={addPromo}
                className="h-11 px-7 bg-primary text-primary-foreground rounded-xl text-sm font-semibold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]">
                {t.add}
              </button>
            </div>

            {(() => {
              const now = new Date();
              const activeCount = promos.filter(p => p.is_active && (!p.expires_at || new Date(p.expires_at) > now) && (!p.valid_from || new Date(p.valid_from) <= now)).length;
              const expiredCount = promos.filter(p => p.expires_at && new Date(p.expires_at) < now).length;
              return (
                <div className="flex flex-wrap gap-2">
                  <div className="bg-card border border-emerald-500/30 rounded-full px-4 py-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-semibold text-foreground">{t.active}: {activeCount}</span>
                  </div>
                  <div className="bg-card border border-border rounded-full px-4 py-2">
                    <span className="text-sm text-muted-foreground">{t.totalPromos}: <span className="font-semibold text-foreground">{promos.length}</span></span>
                  </div>
                  {expiredCount > 0 && (
                    <div className="bg-card border border-border rounded-full px-4 py-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                      <span className="text-sm font-medium text-muted-foreground">{t.expired}: {expiredCount}</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {loading ? <p className="text-center py-8 text-muted-foreground">{t.loading}</p>
              : promos.map(promo => {
              const now = new Date();
              const isExpired = promo.expires_at && new Date(promo.expires_at) < now;
              const notStarted = promo.valid_from && new Date(promo.valid_from) > now;
              const isReallyActive = promo.is_active && !isExpired && !notStarted;
              return (
                <div key={promo.id} className={`bg-card border rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-sm transition-shadow hover:shadow-md ${isReallyActive ? 'border-primary/25' : 'border-border opacity-60'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold tracking-wide">{promo.code}</p>
                        <button
                          onClick={() => togglePromoType(promo.id, promo.promo_type)}
                          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                          title={lang==='ka' ? 'ტიპის შეცვლა' : 'Toggle type'}
                        >
                          {promo.promo_type === 'promotion' ? <><Tag className="w-3 h-3" />Promotion</> : <><Ticket className="w-3 h-3" />Promo Code</>}
                        </button>
                        {isExpired ? <span className="px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t.expiredStatus}</span>
                          : notStarted ? <span className="px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t.notStarted}</span>
                          : isReallyActive ? <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{t.activeStatus}</span>
                          : <span className="px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t.disabled}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {promo.discount_type==='percent' ? `${promo.discount_value}% ${t.discount}` : `₾${promo.discount_value} ${t.discount}`}
                        {promo.max_uses != null && ` · ${promo.uses_count}/${promo.max_uses} ${t.used}`}
                        {!promo.max_uses && promo.uses_count > 0 && ` · ${promo.uses_count} ${t.used}`}
                        {(promo.valid_from||promo.expires_at) && ` · ${promo.valid_from ? new Date(promo.valid_from).toLocaleDateString() : '∞'} → ${promo.expires_at ? new Date(promo.expires_at).toLocaleDateString() : '∞'}`}
                      </p>
                      {promo.applicable_products?.length > 0 && (
                        <p className="text-xs text-primary mt-1 flex items-center gap-1"><Crosshair className="w-3 h-3 shrink-0" />{promo.applicable_products.length} {lang==='ka' ? 'პროდუქტი' : lang==='ru' ? 'продукта' : 'products'}: {promo.applicable_products.slice(0,2).join(', ')}{promo.applicable_products.length > 2 ? `...` : ''}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0 items-end">
                      <button onClick={() => editingPromo === promo.id ? setEditingPromo(null) : openPromoEdit(promo)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${editingPromo === promo.id ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/40 text-primary hover:bg-primary/10'}`}>
                        <Pencil className="w-3 h-3" />{lang==='ka' ? 'რედაქტირება' : lang==='ru' ? 'Редакт.' : 'Edit'}
                      </button>
                      <button onClick={() => togglePromo(promo.id, promo.is_active)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${promo.is_active ? 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/50' : 'border-primary/40 text-primary hover:bg-primary/10'}`}>
                        {promo.is_active ? t.disable : t.enable}
                      </button>
                      <button onClick={() => deletePromo(promo.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-border text-muted-foreground transition-colors hover:text-red-400 hover:border-red-400/40">
                        <Trash2 className="w-3 h-3" />{t.deletePromo}
                      </button>
                    </div>
                  </div>
                  {/* Unified edit panel */}
                  {editingPromo === promo.id && (
                    <div className="border border-primary/25 rounded-xl overflow-hidden mt-1">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 border-b border-border/60">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {lang==='ka' ? 'რედაქტირება' : lang==='ru' ? 'Редактирование' : 'Edit promo'}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => savePromoEdit(promo.id)}
                            className="flex items-center gap-1.5 h-8 px-4 bg-primary text-primary-foreground rounded-full text-xs font-semibold transition-all hover:bg-primary/90">
                            <Check className="w-3.5 h-3.5" />{t.save}
                          </button>
                          <button onClick={() => setEditingPromo(null)}
                            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3.5 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                              {lang==='ka' ? 'კოდი' : lang==='ru' ? 'Код' : 'Code'}
                            </p>
                            <input value={editPromoCodeValue}
                              onChange={e => setEditPromoCodeValue(e.target.value.toUpperCase())}
                              onKeyDown={e => e.key === 'Enter' && savePromoEdit(promo.id)}
                              className={inp} />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5">{t.maxUses}</p>
                            <input type="number" value={editMaxUses}
                              onChange={e => setEditMaxUses(e.target.value)}
                              placeholder="∞" className={inp} />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                            {lang==='ka' ? 'პროდუქტები' : lang==='ru' ? 'Продукты' : 'Products'}
                            {' '}({editPromoSelectedProducts.length > 0 ? editPromoSelectedProducts.length : (lang==='ka' ? 'ყველა' : lang==='ru' ? 'все' : 'all')})
                          </p>
                          <div className="border border-border rounded-xl max-h-52 overflow-y-auto p-2 space-y-1">
                            {editPromoSelectedProducts.length > 0 && (
                              <button type="button" onClick={() => setEditPromoSelectedProducts([])}
                                className="w-full text-xs text-muted-foreground text-left px-2 py-1 rounded transition-colors hover:text-red-400 hover:bg-muted/50">
                                ✕ {lang==='ka' ? 'ყველას გაუქმება' : 'Clear all'}
                              </button>
                            )}
                            {Object.entries(PRODUCTS_BY_CAT).map(([cat, prods]) => (
                              <div key={cat}>
                                <p className="text-xs font-semibold text-muted-foreground px-2 py-1">{cat}</p>
                                {prods.map((p, i) => (
                                  <label key={i} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted cursor-pointer">
                                    <input type="checkbox"
                                      checked={editPromoSelectedProducts.includes(p.name)}
                                      onChange={e => setEditPromoSelectedProducts(prev =>
                                        e.target.checked ? [...prev, p.name] : prev.filter(n => n !== p.name)
                                      )} />
                                    <span className="text-sm flex-1">{p.name}</span>
                                    <span className="text-xs text-muted-foreground">₾{p.price}</span>
                                  </label>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

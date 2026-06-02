import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import SimpleCalendar from '../components/SimpleCalendar';

let _audio = null;
const getAudio = () => {
  if (!_audio) { _audio = new Audio('/beep.wav'); _audio.preload = 'auto'; }
  return _audio;
};
const beep = () => { try { const a = getAudio(); a.currentTime = 0; a.play(); } catch(_){} };

const ADMIN_PASSWORD = 'maneki2024';

const T = {
  en: {
    title: 'Admin Panel — Maneki Sushi',
    logout: 'Logout', soundOn: '🔔 Sound On', soundOff: '🔕 Sound Off',
    notifEnable: '📱 Notifications', orders: 'Orders', promos: 'Promo Codes',
    total: 'Total', refresh: 'Refresh', newOrder: '🍣 New Order!', status: 'Status:',
    new: 'New', preparing: 'Preparing', on_the_way: 'On the way',
    delivered: 'Delivered', completed: 'Completed', cancelled: 'Cancelled',
    revenue: 'Revenue', completedOrders: 'Completed orders',
    addPromo: 'New Promo Code', code: 'Code (e.g. SALE10)',
    percent: 'Percent (%)', fixed: 'Fixed (₾)',
    discountPct: 'Discount % (e.g. 10)', discountFixed: 'Discount ₾ (e.g. 5)',
    maxUses: 'Max uses (empty=∞)', maxUsesEx: 'e.g. 100',
    from: 'Valid from', to: 'Valid until', fromPh: 'From (opt.)', toPh: 'Until (opt.)',
    add: '+ Add', active: 'Active', totalPromos: 'Total', expired: 'Expired',
    activeStatus: 'Active', expiredStatus: 'Expired', notStarted: 'Not started',
    disabled: 'Disabled', disable: 'Disable', enable: 'Enable', deletePromo: 'Delete',
    discount: 'discount', used: 'used', password: 'Password', login: 'Login',
    wrongPass: 'Wrong password', noOrders: 'No orders yet', loading: 'Loading...',
    deleteOrder: 'Delete', confirmDelete: 'Delete this order?', confirmDeletePromo: 'Delete promo code?',
    editMaxUses: 'Edit limit', save: 'Save',
  },
  ka: {
    title: 'ადმინ პანელი — Maneki Sushi',
    logout: 'გასვლა', soundOn: '🔔 ხმა ჩართ.', soundOff: '🔕 ხმა გამორთ.',
    notifEnable: '📱 Notification', orders: 'შეკვეთები', promos: 'პრომოკოდები',
    total: 'სულ', refresh: 'განახლება', newOrder: '🍣 ახალი შეკვეთა!', status: 'სტატუსი:',
    new: 'ახალი', preparing: 'მზადება', on_the_way: 'გზაშია',
    delivered: 'მიტანილი', completed: 'დასრულდა', cancelled: 'გაუქმდა',
    revenue: 'შემოსავალი', completedOrders: 'დასრულებული შეკვეთები',
    addPromo: 'ახალი პრომოკოდი', code: 'კოდი (მაგ. SALE10)',
    percent: 'პროცენტი (%)', fixed: 'ფიქსირებული (₾)',
    discountPct: 'ფასდ. % (მაგ. 10)', discountFixed: 'ფასდ. ₾ (მაგ. 5)',
    maxUses: 'მაქს. გამოყენება (ცარ.=∞)', maxUsesEx: 'მაგ. 100',
    from: 'დასაწყისი', to: 'დასასრული', fromPh: 'საიდან (სურვ.)', toPh: 'სამდე (სურვ.)',
    add: '+ დამატება', active: 'აქტიური', totalPromos: 'სულ', expired: 'ვადაგასული',
    activeStatus: 'აქტიურია', expiredStatus: 'ვადაგასული', notStarted: 'ჯერ არ დაწყებულა',
    disabled: 'გათიშული', disable: 'გათიშვა', enable: 'ჩართვა', deletePromo: 'წაშლა',
    discount: 'ფასდ.', used: 'გამოყ.', password: 'პაროლი', login: 'შესვლა',
    wrongPass: 'არასწორი პაროლი', noOrders: 'შეკვეთები არ არის', loading: 'იტვირთება...',
    deleteOrder: 'წაშლა', confirmDelete: 'შეკვეთა წაიშალოს?', confirmDeletePromo: 'პრომოკოდი წაიშალოს?',
    editMaxUses: 'ლიმიტის ცვლილება', save: 'შენახვა',
  },
  ru: {
    title: 'Админ Панель — Maneki Sushi',
    logout: 'Выйти', soundOn: '🔔 Звук вкл.', soundOff: '🔕 Звук выкл.',
    notifEnable: '📱 Уведомления', orders: 'Заказы', promos: 'Промокоды',
    total: 'Всего', refresh: 'Обновить', newOrder: '🍣 Новый заказ!', status: 'Статус:',
    new: 'Новый', preparing: 'Готовится', on_the_way: 'В пути',
    delivered: 'Доставлен', completed: 'Завершён', cancelled: 'Отменён',
    revenue: 'Выручка', completedOrders: 'Завершённых заказов',
    addPromo: 'Новый промокод', code: 'Код (напр. SALE10)',
    percent: 'Процент (%)', fixed: 'Фиксированный (₾)',
    discountPct: 'Скидка % (напр. 10)', discountFixed: 'Скидка ₾ (напр. 5)',
    maxUses: 'Макс. использований (пусто=∞)', maxUsesEx: 'напр. 100',
    from: 'Действует с', to: 'Действует до', fromPh: 'С (необяз.)', toPh: 'До (необяз.)',
    add: '+ Добавить', active: 'Активных', totalPromos: 'Всего', expired: 'Истёкших',
    activeStatus: 'Активен', expiredStatus: 'Истёк', notStarted: 'Не начался',
    disabled: 'Отключён', disable: 'Отключить', enable: 'Включить', deletePromo: 'Удалить',
    discount: 'скидка', used: 'исп.', password: 'Пароль', login: 'Войти',
    wrongPass: 'Неверный пароль', noOrders: 'Заказов нет', loading: 'Загрузка...',
    deleteOrder: 'Удалить', confirmDelete: 'Удалить заказ?', confirmDeletePromo: 'Удалить промокод?',
    editMaxUses: 'Изменить лимит', save: 'Сохранить',
  }
};

const STATUS_COLORS = {
  new: 'bg-blue-500', preparing: 'bg-yellow-500', on_the_way: 'bg-orange-500',
  delivered: 'bg-green-500', completed: 'bg-emerald-600', cancelled: 'bg-red-500',
};

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
  const [editingPromo, setEditingPromo] = useState(null);
  const [editMaxUses, setEditMaxUses] = useState('');
  const t = T[lang];
  const lastOrderIdRef = useRef(null);
  const [newPromo, setNewPromo] = useState({ code: '', discount_type: 'percent', discount_value: '', max_uses: '', valid_from: '', expires_at: '' });
  const [calendarFromOpen, setCalendarFromOpen] = useState(false);
  const [calendarToOpen, setCalendarToOpen] = useState(false);
  const theme = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin', '1');
      setAuthed(true);
      // Auto-unlock audio on login gesture
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
          new Notification('🍣 Maneki Sushi', {
            body: `${order.customer_name} · ${order.phone} · ₾${Number(order.total).toFixed(2)}`,
            icon: '/favicon.ico', tag: 'new-order', requireInteraction: true,
          });
        }
        setTimeout(() => setNewOrderAlert(null), 8000);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
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

  const deleteOrder = async (id) => {
    if (!window.confirm(t.confirmDelete)) return;
    await supabase.from('orders').delete().eq('id', id);
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const addPromo = async () => {
    if (!newPromo.code || !newPromo.discount_value) return;
    await supabase.from('promo_codes').insert({
      code: newPromo.code.toUpperCase(),
      discount_type: newPromo.discount_type,
      discount_value: Number(newPromo.discount_value),
      max_uses: newPromo.max_uses ? Number(newPromo.max_uses) : null,
      valid_from: newPromo.valid_from ? new Date(newPromo.valid_from + 'T00:00:00').toISOString() : null,
      expires_at: newPromo.expires_at ? new Date(newPromo.expires_at + 'T23:59:59').toISOString() : null,
      is_active: true,
    });
    setNewPromo({ code: '', discount_type: 'percent', discount_value: '', max_uses: '', valid_from: '', expires_at: '' });
    fetchPromos();
  };

  const togglePromo = async (id, is_active) => {
    await supabase.from('promo_codes').update({ is_active: !is_active }).eq('id', id);
    fetchPromos();
  };

  const deletePromo = async (id) => {
    if (!window.confirm(t.confirmDeletePromo)) return;
    await supabase.from('promo_codes').delete().eq('id', id);
    setPromos(prev => prev.filter(p => p.id !== id));
  };

  const saveMaxUses = async (id) => {
    const val = editMaxUses === '' ? null : Number(editMaxUses);
    await supabase.from('promo_codes').update({ max_uses: val }).eq('id', id);
    setPromos(prev => prev.map(p => p.id === id ? { ...p, max_uses: val } : p));
    setEditingPromo(null);
  };

  const inp = 'w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring';

  // Revenue from completed orders
  const completedRevenue = orders.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.total), 0);
  const completedCount = orders.filter(o => o.status === 'completed').length;

  if (!authed) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center">Admin Panel</h1>
        <input type="password" placeholder={t.password} value={pass}
          onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          className={inp} />
        <button onClick={login} className="w-full h-10 bg-primary text-white rounded-lg font-medium">{t.login}</button>
        <div className="flex justify-center gap-2">
          {['en','ka','ru'].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${lang===l ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
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

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-base sm:text-lg font-bold truncate">{t.title}</h1>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['en','ka','ru'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium ${lang===l ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={() => { if (!soundEnabled) { getAudio().volume = 0.8; beep(); } setSoundEnabled(v => !v); }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border ${soundEnabled ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-muted border-border text-muted-foreground'}`}>
              {soundEnabled ? t.soundOn : t.soundOff}
            </button>
            {notifPermission !== 'granted' && typeof Notification !== 'undefined' && (
              <button onClick={() => Notification.requestPermission().then(p => setNotifPermission(p))}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium border bg-primary/10 border-primary/30 text-primary">
                {t.notifEnable}
              </button>
            )}
            <button onClick={() => { sessionStorage.removeItem('admin'); setAuthed(false); }}
              className="text-xs text-muted-foreground hover:text-foreground px-2">{t.logout}</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* New order alert */}
        {newOrderAlert && (
          <div className="p-4 bg-primary text-white rounded-xl flex items-center justify-between shadow-lg">
            <div>
              <p className="font-bold">{t.newOrder}</p>
              <p className="text-sm opacity-90">{newOrderAlert.customer_name} · {newOrderAlert.phone} · ₾{Number(newOrderAlert.total).toFixed(2)}</p>
            </div>
            <button onClick={() => setNewOrderAlert(null)} className="text-white/70 hover:text-white text-xl ml-4">✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2">
          {[['orders', t.orders], ['promos', t.promos]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${tab===id ? 'bg-primary text-white' : 'bg-card border border-border hover:bg-muted'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="space-y-3">
            {/* Revenue card */}
            {completedCount > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">{t.revenue}</p>
                  <p className="text-2xl font-bold text-emerald-600">₾{completedRevenue.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{t.completedOrders}</p>
                  <p className="text-lg font-semibold text-emerald-600">{completedCount}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{t.total}: {orders.length}</p>
              <button onClick={fetchOrders} className="text-sm text-primary">{t.refresh}</button>
            </div>

            {loading ? <p className="text-center py-8 text-muted-foreground">{t.loading}</p>
              : orders.length === 0 ? <p className="text-center py-8 text-muted-foreground">{t.noOrders}</p>
              : orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{order.customer_name} — {order.phone}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                    {order.address && <p className="text-sm mt-0.5">📍 {order.address}</p>}
                    {order.delivery_date && <p className="text-sm">📅 {order.delivery_date} {order.delivery_time}</p>}
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <p className="font-bold text-primary">₾{Number(order.total).toFixed(2)}</p>
                    {order.promo_code && <p className="text-xs text-green-600">🎟 {order.promo_code}</p>}
                    <button onClick={() => deleteOrder(order.id)}
                      className="text-xs text-red-500 hover:text-red-600 border border-red-500/30 px-2 py-0.5 rounded-md">
                      🗑 {t.deleteOrder}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-0.5">
                  {(order.items || []).map((item, i) => (
                    <p key={i}>• {item.name} ×{item.quantity} — ₾{(item.price * item.quantity).toFixed(2)}</p>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">{t.status}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(STATUS_COLORS).map(([key, color]) => (
                      <button key={key} onClick={() => updateStatus(order.id, key)}
                        className={`px-2.5 py-1 rounded-full text-xs text-white transition-opacity ${color} ${order.status===key ? 'opacity-100 ring-2 ring-offset-1 ring-primary' : 'opacity-35 hover:opacity-70'}`}>
                        {t[key]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROMOS */}
        {tab === 'promos' && (
          <div className="space-y-4">
            {/* Add form */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h2 className="font-semibold">{t.addPromo}</h2>
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
              <button onClick={addPromo} className="h-10 px-6 bg-primary text-white rounded-lg text-sm font-medium">{t.add}</button>
            </div>

            {/* Stats */}
            {(() => {
              const now = new Date();
              const activeCount = promos.filter(p => p.is_active && (!p.expires_at || new Date(p.expires_at) > now) && (!p.valid_from || new Date(p.valid_from) <= now)).length;
              const expiredCount = promos.filter(p => p.expires_at && new Date(p.expires_at) < now).length;
              return (
                <div className="flex flex-wrap gap-2">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-green-600">{t.active}: {activeCount}</span>
                  </div>
                  <div className="bg-card border border-border rounded-lg px-3 py-2">
                    <span className="text-sm text-muted-foreground">{t.totalPromos}: {promos.length}</span>
                  </div>
                  {expiredCount > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm font-medium text-red-500">{t.expired}: {expiredCount}</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Promo list */}
            {loading ? <p className="text-center py-8 text-muted-foreground">{t.loading}</p>
              : promos.map(promo => {
              const now = new Date();
              const isExpired = promo.expires_at && new Date(promo.expires_at) < now;
              const notStarted = promo.valid_from && new Date(promo.valid_from) > now;
              const isReallyActive = promo.is_active && !isExpired && !notStarted;
              return (
                <div key={promo.id} className={`bg-card border rounded-xl p-4 space-y-2 ${isReallyActive ? 'border-green-500/30' : 'border-border opacity-60'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold">{promo.code}</p>
                        {isExpired ? <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/15 text-red-500">{t.expiredStatus}</span>
                          : notStarted ? <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/15 text-yellow-500">{t.notStarted}</span>
                          : isReallyActive ? <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/15 text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{t.activeStatus}</span>
                          : <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t.disabled}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {promo.discount_type==='percent' ? `${promo.discount_value}% ${t.discount}` : `₾${promo.discount_value} ${t.discount}`}
                        {promo.max_uses != null && ` · ${promo.uses_count}/${promo.max_uses} ${t.used}`}
                        {!promo.max_uses && promo.uses_count > 0 && ` · ${promo.uses_count} ${t.used}`}
                        {(promo.valid_from||promo.expires_at) && ` · ${promo.valid_from ? new Date(promo.valid_from).toLocaleDateString() : '∞'} → ${promo.expires_at ? new Date(promo.expires_at).toLocaleDateString() : '∞'}`}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button onClick={() => togglePromo(promo.id, promo.is_active)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${promo.is_active ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-600'}`}>
                        {promo.is_active ? t.disable : t.enable}
                      </button>
                      <button onClick={() => deletePromo(promo.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-500">
                        🗑 {t.deletePromo}
                      </button>
                    </div>
                  </div>

                  {/* Edit max_uses */}
                  {editingPromo === promo.id ? (
                    <div className="flex gap-2 items-center">
                      <input type="number" value={editMaxUses} onChange={e => setEditMaxUses(e.target.value)}
                        placeholder="∞" className="h-8 w-32 rounded-md border border-input bg-background px-2 text-sm focus:outline-none" />
                      <button onClick={() => saveMaxUses(promo.id)} className="h-8 px-3 bg-primary text-white rounded-md text-xs">{t.save}</button>
                      <button onClick={() => setEditingPromo(null)} className="h-8 px-3 bg-muted rounded-md text-xs">✕</button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditingPromo(promo.id); setEditMaxUses(promo.max_uses ?? ''); }}
                      className="text-xs text-primary hover:underline">✏ {t.editMaxUses}</button>
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

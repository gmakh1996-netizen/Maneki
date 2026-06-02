import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import SimpleCalendar from '../components/SimpleCalendar';


const ADMIN_PASSWORD = 'maneki2024';

const STATUS_LABELS = {
  new:        { label: 'ახალი',     color: 'bg-blue-500' },
  preparing:  { label: 'მზადება',   color: 'bg-yellow-500' },
  on_the_way: { label: 'გზაშია',    color: 'bg-orange-500' },
  delivered:  { label: 'მიტანილი', color: 'bg-green-500' },
  cancelled:  { label: 'გაუქმებული', color: 'bg-red-500' },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin') === '1');
  const [pass, setPass] = useState('');
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notifPermission, setNotifPermission] = useState(Notification.permission);
  const isFirstLoad = useRef(true);
  const audioRef = useRef(null);
  const lastOrderIdRef = useRef(null);

  // New promo form
  const [newPromo, setNewPromo] = useState({ code: '', discount_type: 'percent', discount_value: '', max_uses: '', valid_from: '', expires_at: '' });
  const [calendarFromOpen, setCalendarFromOpen] = useState(false);
  const [calendarToOpen, setCalendarToOpen] = useState(false);
  const theme = window.document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const login = () => {
    if (pass === ADMIN_PASSWORD) { sessionStorage.setItem('admin', '1'); setAuthed(true); }
    else alert('არასწორი პაროლი');
  };

  useEffect(() => {
    if (!authed) return;
    if (tab === 'orders') fetchOrders();
    if (tab === 'promos') fetchPromos();
  }, [authed, tab]);

  // ხმის გამოყენება
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // Realtime + polling fallback
  useEffect(() => {
    if (!authed) return;
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

    // Realtime
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
        const order = payload.new;
        if (lastOrderIdRef.current === order.id) return;
        lastOrderIdRef.current = order.id;
        playSound();
        setNewOrderAlert(order);
        setOrders(prev => prev.find(o => o.id === order.id) ? prev : [order, ...prev]);
        if (Notification.permission === 'granted') {
          new Notification('🍣 ახალი შეკვეთა — Maneki Sushi', {
            body: `${order.customer_name} · ${order.phone} · ₾${Number(order.total).toFixed(2)}`,
            icon: '/favicon.ico', tag: 'new-order', requireInteraction: true,
          });
        }
        setTimeout(() => setNewOrderAlert(null), 8000);
      })
      .subscribe();

    // Polling fallback — ყოველ 15 წამში
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!data) return;
      setOrders(prev => {
        if (!prev.length) return data;
        const newOnes = data.filter(o => !prev.find(p => p.id === o.id));
        newOnes.forEach(order => {
          if (lastOrderIdRef.current === order.id) return;
          lastOrderIdRef.current = order.id;
          playSound();
          setNewOrderAlert(order);
          if (Notification.permission === 'granted') {
            new Notification('🍣 ახალი შეკვეთა — Maneki Sushi', {
              body: `${order.customer_name} · ${order.phone} · ₾${Number(order.total).toFixed(2)}`,
              icon: '/favicon.ico', tag: 'new-order', requireInteraction: true,
            });
          }
          setTimeout(() => setNewOrderAlert(null), 8000);
        });
        return newOnes.length ? [...newOnes, ...prev] : prev;
      });
    }, 15000);

    return () => { supabase.removeChannel(channel); clearInterval(poll); };
  }, [authed]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const fetchPromos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('promo_codes').select('*').order('id', { ascending: false });
    if (error) console.error('promo fetch error:', error);
    setPromos(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
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

  if (!authed) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center">Admin Panel</h1>
        <input type="password" placeholder="პაროლი" value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
        <button onClick={login} className="w-full h-10 bg-primary text-white rounded-md font-medium">შესვლა</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <audio ref={audioRef} src="/beep.wav" preload="auto" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Admin Panel — Maneki Sushi</h1>
          <div className="flex items-center gap-2">
            {/* ხმის ჩართვა */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.volume = 0.8;
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().then(() => setSoundEnabled(true)).catch(() => {});
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${soundEnabled ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-muted border-border text-muted-foreground hover:text-foreground'}`}
            >
              {soundEnabled ? '🔔 ხმა ჩართულია' : '🔕 ხმის ჩართვა'}
            </button>
            {/* Notification permission */}
            {notifPermission !== 'granted' && (
              <button
                onClick={() => Notification.requestPermission().then(p => setNotifPermission(p))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              >
                📱 Notification
              </button>
            )}
            {notifPermission === 'granted' && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Notification ჩართულია
              </span>
            )}
            <button onClick={() => { sessionStorage.removeItem('admin'); setAuthed(false); }}
              className="text-sm text-muted-foreground hover:text-foreground">გასვლა</button>
          </div>
        </div>

        {/* New order alert banner */}
        {newOrderAlert && (
          <div className="mb-4 p-4 bg-primary text-white rounded-xl flex items-center justify-between animate-pulse shadow-lg">
            <div>
              <p className="font-bold text-lg">🍣 ახალი შეკვეთა!</p>
              <p className="text-sm opacity-90">{newOrderAlert.customer_name} · {newOrderAlert.phone} · ₾{Number(newOrderAlert.total).toFixed(2)}</p>
            </div>
            <button onClick={() => setNewOrderAlert(null)} className="text-white/70 hover:text-white text-xl">✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[['orders','შეკვეთები'], ['promos','პრომოკოდები']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === id ? 'bg-primary text-white' : 'bg-card border border-border hover:bg-muted'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {tab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">სულ: {orders.length} შეკვეთა</p>
              <button onClick={fetchOrders} className="text-sm text-primary">განახლება</button>
            </div>
            {loading ? <p className="text-center py-8 text-muted-foreground">იტვირთება...</p> : orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold">{order.customer_name} — {order.phone}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleString('ka-GE')}</p>
                    {order.address && <p className="text-sm">📍 {order.address}</p>}
                    {order.delivery_date && <p className="text-sm">📅 {order.delivery_date} {order.delivery_time}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">₾{Number(order.total).toFixed(2)}</p>
                    {order.promo_code && <p className="text-xs text-green-600">🎟 {order.promo_code} (-₾{Number(order.discount).toFixed(2)})</p>}
                  </div>
                </div>
                <div className="text-sm space-y-0.5">
                  {(order.items || []).map((item, i) => (
                    <p key={i} className="text-muted-foreground">• {item.name} ×{item.quantity} — ₾{(item.price * item.quantity).toFixed(2)}</p>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">სტატუსი:</span>
                  {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                    <button key={key} onClick={() => updateStatus(order.id, key)}
                      className={`px-3 py-1 rounded-full text-xs text-white transition-opacity ${color} ${order.status === key ? 'opacity-100 ring-2 ring-offset-1 ring-primary' : 'opacity-40 hover:opacity-70'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promo Codes */}
        {tab === 'promos' && (
          <div className="space-y-6">
            {/* Add new */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h2 className="font-semibold">ახალი პრომოკოდი</h2>

              {/* Row 1: კოდი, ტიპი, მნიშვნელობა */}
              <div className="grid grid-cols-3 gap-3">
                <input value={newPromo.code} onChange={e => setNewPromo(p => ({...p, code: e.target.value.toUpperCase()}))}
                  placeholder="კოდი (მაგ. MANEKI10)" className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                <select value={newPromo.discount_type} onChange={e => setNewPromo(p => ({...p, discount_type: e.target.value}))}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none">
                  <option value="percent">პროცენტი (%)</option>
                  <option value="fixed">ფიქსირებული (₾)</option>
                </select>
                <input type="number" value={newPromo.discount_value} onChange={e => setNewPromo(p => ({...p, discount_value: e.target.value}))}
                  placeholder={newPromo.discount_type === 'percent' ? 'ფასდ. % (მაგ. 10)' : 'ფასდ. ₾ (მაგ. 5)'}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>

              {/* Row 2: გამოყენება, დასაწყისი, დასასრული */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">მაქს. გამოყენება (ცარ.=∞)</p>
                  <input type="number" value={newPromo.max_uses} onChange={e => setNewPromo(p => ({...p, max_uses: e.target.value}))}
                    placeholder="მაგ. 100"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">დასაწყისი</p>
                  <SimpleCalendar
                    value={newPromo.valid_from}
                    onChange={date => { setNewPromo(p => ({...p, valid_from: date})); setCalendarFromOpen(false); }}
                    open={calendarFromOpen}
                    onToggle={() => { setCalendarFromOpen(v => !v); setCalendarToOpen(false); }}
                    minDate={new Date().toISOString().split('T')[0]}
                    maxDate="2099-12-31"
                    theme={theme}
                    placeholder="საიდან (სურვ.)"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">დასასრული</p>
                  <SimpleCalendar
                    value={newPromo.expires_at}
                    onChange={date => { setNewPromo(p => ({...p, expires_at: date})); setCalendarToOpen(false); }}
                    open={calendarToOpen}
                    onToggle={() => { setCalendarToOpen(v => !v); setCalendarFromOpen(false); }}
                    minDate={newPromo.valid_from || new Date().toISOString().split('T')[0]}
                    maxDate="2099-12-31"
                    theme={theme}
                    placeholder="სამდე (სურვ.)"
                  />
                </div>
              </div>

              {/* Row 3: დამატება */}
              <button onClick={addPromo} className="h-9 px-6 bg-primary text-white rounded-md text-sm font-medium">+ დამატება</button>
            </div>

            {/* Stats */}
            {!loading && (() => {
              const now = new Date();
              const activeCount = promos.filter(p => p.is_active && (!p.expires_at || new Date(p.expires_at) > now) && (!p.valid_from || new Date(p.valid_from) <= now)).length;
              const expiredCount = promos.filter(p => p.expires_at && new Date(p.expires_at) < now).length;
              return (
                <div className="flex flex-wrap gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-green-600">აქტიური: {activeCount}</span>
                  </div>
                  <div className="bg-card border border-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted-foreground">სულ: {promos.length}</span>
                  </div>
                  {expiredCount > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm font-medium text-red-500">ვადაგასული: {expiredCount}</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* List */}
            {loading ? <p className="text-center py-8 text-muted-foreground">იტვირთება...</p> : promos.map(promo => {
              const now = new Date();
              const isExpired = promo.expires_at && new Date(promo.expires_at) < now;
              const notStarted = promo.valid_from && new Date(promo.valid_from) > now;
              const isReallyActive = promo.is_active && !isExpired && !notStarted;
              return (
                <div key={promo.id} className={`bg-card border rounded-xl p-4 flex items-center justify-between gap-4 ${isReallyActive ? 'border-green-500/30' : 'border-border opacity-60'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-lg">{promo.code}</p>
                      {isExpired ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-500 border border-red-500/25">ვადაგასული</span>
                      ) : notStarted ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-500 border border-yellow-500/25">ჯერ არ დაწყებულა</span>
                      ) : isReallyActive ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-600 border border-green-500/25 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                          აქტიურია
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">გათიშული</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {promo.discount_type === 'percent' ? `${promo.discount_value}% ფასდაკლება` : `₾${promo.discount_value} ფასდაკლება`}
                      {promo.max_uses && ` · ${promo.uses_count}/${promo.max_uses} გამოყ.`}
                      {(promo.valid_from || promo.expires_at) && ` · ${promo.valid_from ? new Date(promo.valid_from).toLocaleDateString('ka-GE') : '∞'} → ${promo.expires_at ? new Date(promo.expires_at).toLocaleDateString('ka-GE') : '∞'}`}
                    </p>
                  </div>
                  <button onClick={() => togglePromo(promo.id, promo.is_active)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium shrink-0 ${promo.is_active ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'}`}>
                    {promo.is_active ? 'გათიშვა' : 'ჩართვა'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const fetchPromos = async () => {
    setLoading(true);
    const { data } = await supabase.from('promo_codes').select('*').order('created_at', { ascending: false });
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Panel — Maneki Sushi</h1>
          <button onClick={() => { sessionStorage.removeItem('admin'); setAuthed(false); }}
            className="text-sm text-muted-foreground hover:text-foreground">გასვლა</button>
        </div>

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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <input value={newPromo.code} onChange={e => setNewPromo(p => ({...p, code: e.target.value.toUpperCase()}))}
                  placeholder="კოდი (მაგ. MANEKI10)" className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                <select value={newPromo.discount_type} onChange={e => setNewPromo(p => ({...p, discount_type: e.target.value}))}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none">
                  <option value="percent">პროცენტი (%)</option>
                  <option value="fixed">ფიქსირებული (₾)</option>
                </select>
                <input type="number" value={newPromo.discount_value} onChange={e => setNewPromo(p => ({...p, discount_value: e.target.value}))}
                  placeholder={newPromo.discount_type === 'percent' ? 'მაგ. 10' : 'მაგ. 5'}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                <input type="number" value={newPromo.max_uses} onChange={e => setNewPromo(p => ({...p, max_uses: e.target.value}))}
                  placeholder="მაქს. გამოყენება (ცარ.=∞)"
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
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
                <button onClick={addPromo} className="h-9 bg-primary text-white rounded-md text-sm font-medium">დამატება</button>
              </div>
            </div>

            {/* List */}
            {loading ? <p className="text-center py-8 text-muted-foreground">იტვირთება...</p> : promos.map(promo => (
              <div key={promo.id} className={`bg-card border rounded-xl p-4 flex items-center justify-between gap-4 ${!promo.is_active ? 'opacity-50 border-border' : 'border-primary/40'}`}>
                <div>
                  <p className="font-bold text-lg">{promo.code}</p>
                  <p className="text-sm text-muted-foreground">
                    {promo.discount_type === 'percent' ? `${promo.discount_value}% ფასდაკლება` : `₾${promo.discount_value} ფასდაკლება`}
                    {promo.max_uses && ` · ${promo.uses_count}/${promo.max_uses} გამოყ.`}
                    {(promo.valid_from || promo.expires_at) && ` · ${promo.valid_from ? new Date(promo.valid_from).toLocaleDateString('ka-GE') : '∞'} → ${promo.expires_at ? new Date(promo.expires_at).toLocaleDateString('ka-GE') : '∞'}`}
                  </p>
                </div>
                <button onClick={() => togglePromo(promo.id, promo.is_active)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium ${promo.is_active ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'}`}>
                  {promo.is_active ? 'გათიშვა' : 'ჩართვა'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

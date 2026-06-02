import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function SimpleCalendar({ value, onChange, open, onToggle, minDate, maxDate, theme, placeholder }) {
  const today = new Date();
  today.setHours(0,0,0,0);

  const initDate = value ? new Date(value + 'T00:00:00') : new Date();
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initDate.getMonth());

  const bg    = theme === 'dark' ? '#141416' : '#ffffff';
  const color = theme === 'dark' ? '#fafafa' : '#18181b';
  const muted = theme === 'dark' ? '#888' : '#999';
  const border = theme === 'dark' ? '#2a2a2e' : '#e2e8f0';
  const primary = '#ff6b35';

  const minD = new Date(minDate + 'T00:00:00');
  const maxD = new Date(maxDate + 'T00:00:00');

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Build grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedStr = value || '';
  const pad = n => String(n).padStart(2, '0');

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 12px', borderRadius: '10px', border: `1px solid ${border}`,
          backgroundColor: theme === 'dark' ? 'hsl(240 4% 18%)' : 'hsl(240 6% 85%)',
          color: value ? color : muted, cursor: 'pointer', fontSize: '14px',
          textAlign: 'left',
        }}
      >
        <CalendarIcon size={14} />
        {value ? `${MONTHS[new Date(value+'T00:00:00').getMonth()]} ${new Date(value+'T00:00:00').getDate()}, ${new Date(value+'T00:00:00').getFullYear()}` : placeholder}
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          marginTop: '4px', borderRadius: '12px', border: `1px solid ${border}`,
          backgroundColor: bg, boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          padding: '12px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <button type="button" onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color, padding: '4px', borderRadius: '6px' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ color, fontWeight: 600, fontSize: '14px' }}>{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color, padding: '4px', borderRadius: '6px' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', color: muted, fontSize: '11px', fontWeight: 500, padding: '2px 0' }}>{d}</div>
            ))}
          </div>

          {/* Date grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = `${viewYear}-${pad(viewMonth+1)}-${pad(day)}`;
              const dateObj = new Date(viewYear, viewMonth, day);
              const isDisabled = dateObj < minD || dateObj > maxD;
              const isSelected = dateStr === selectedStr;
              const isToday = dateObj.getTime() === today.getTime();

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && onChange(dateStr)}
                  style={{
                    width: '100%', aspectRatio: '1', border: 'none', borderRadius: '6px',
                    cursor: isDisabled ? 'default' : 'pointer', fontSize: '13px', fontWeight: 500,
                    backgroundColor: isSelected ? primary : isToday ? `${primary}22` : 'transparent',
                    color: isSelected ? '#fff' : isDisabled ? muted : color,
                    opacity: isDisabled ? 0.4 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleCalendar;

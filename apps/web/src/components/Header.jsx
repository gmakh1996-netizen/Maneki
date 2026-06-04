import React, { useState, useRef, useEffect } from 'react';
import { Phone, Clock, Sun, Moon, Instagram, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

const LANGS = [
  { value: 'en', label: 'English' },
  { value: 'ka', label: 'ქართული' },
  { value: 'ru', label: 'Русский' },
];

function LangDropdown({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGS.find(l => l.value === language);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 h-8 sm:h-9 px-3 rounded-md border border-border bg-card text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        {current?.label}
        <ChevronDown className={`h-3.5 w-3.5 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[110px] rounded-md border border-border bg-popover text-popover-foreground shadow-md z-[200]">
          {LANGS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setLanguage(value); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md"
            >
              {label}
              {language === value && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm flex flex-col justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex-shrink-0 group flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-muted/50 to-transparent border border-border/60 hover:border-primary/40 rounded-full py-1 px-1 pr-3 sm:pr-6 shadow-soft hover:shadow-glow-primary transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center rounded-full overflow-hidden">
              <img
                src="/logo.png"
                alt="Maneki cat logo"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h1 className="text-sm sm:text-xl md:text-2xl font-samurai text-foreground group-hover:text-primary transition-colors duration-300 leading-none">
              Maneki Sushi
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Contact Info — desktop only */}
            <div className="hidden md:flex items-center gap-4 mr-2">
              <a href="tel:+995598901848" className="flex items-center gap-2 text-sm bg-muted/30 px-3 py-1.5 rounded-full border border-border/40 hover:bg-muted/50 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold tracking-wide">+995 598 901 848</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Clock className="w-4 h-4" />
                <span>14:00–02:00</span>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/maneki.sushi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-card border border-border hover:bg-primary/10 hover:border-primary/40 hover:text-primary flex items-center justify-center text-muted-foreground transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Language selector */}
            <LangDropdown language={language} setLanguage={setLanguage} />

            {/* Theme toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 border-border bg-card hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';
import { Phone, Clock, Sun, Moon, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm flex flex-col justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 group flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-muted/50 to-transparent border border-border/60 hover:border-primary/40 rounded-full p-1.5 pr-3 sm:pr-6 shadow-soft hover:shadow-glow-primary transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center rounded-full p-1.5 overflow-hidden bg-white">
              <img
                src="https://horizons-cdn.hostinger.com/b689a301-5c05-47d4-aff4-958d21843819/6b1343ab1c5643ab1921708e7cd255b0.png"
                alt="Maneki cat logo"
                className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h1 className="text-sm sm:text-xl md:text-2xl font-samurai text-foreground group-hover:text-primary transition-colors duration-300 mt-0.5">
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

            {/* Language + Theme — always visible */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto min-w-[90px] h-8 sm:h-9 bg-card border-border font-medium text-xs sm:text-sm px-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ka">ქართული</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
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
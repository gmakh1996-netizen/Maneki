import React, { useState } from 'react';
import { Phone, Clock, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 group flex items-center gap-4 bg-gradient-to-r from-muted/50 to-transparent border border-border/60 hover:border-primary/40 rounded-full p-1.5 pr-6 shadow-soft hover:shadow-glow-primary transition-all duration-300 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center rounded-full p-2 shadow-sm border border-border/40 overflow-hidden bg-white">
              <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_0_1px_rgba(148,163,184,0.12)]" />
              <img 
                src="https://horizons-cdn.hostinger.com/b689a301-5c05-47d4-aff4-958d21843819/6b1343ab1c5643ab1921708e7cd255b0.png"
                alt="Maneki cat logo"
                className="relative z-10 w-9 h-9 md:w-11 md:h-11 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-playful tracking-playful text-foreground group-hover:text-primary transition-colors duration-300 mt-0.5">
              Maneki Sushi
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Contact Info Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm bg-muted/30 px-3 py-1.5 rounded-full border border-border/40">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold tracking-wide">+995 598 901 848</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Clock className="w-4 h-4" />
                <span>14:00–02:00</span>
              </div>
            </div>

            {/* Language and Theme Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[100px] h-9 bg-card border-border font-medium">
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
                className="w-9 h-9 border-border bg-card hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card border-l-border">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Controls */}
                  <div className="flex sm:hidden items-center justify-between pb-6 border-b border-border/60">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-[120px] h-9 bg-muted border-border">
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
                      className="border-border bg-muted"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex flex-col gap-4 pb-6 border-b border-border/60">
                    <div className="flex items-center gap-3 text-sm bg-muted/30 p-3 rounded-xl border border-border/40">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold tracking-wide">+995 598 901 848</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground px-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">14:00–02:00</span>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-left text-sm font-semibold rounded-xl transition-all duration-200 text-card-foreground hover:bg-muted"
                    >
                      {t('footer.home')}
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-left text-sm font-semibold rounded-xl transition-all duration-200 text-card-foreground hover:bg-muted"
                    >
                      {t('footer.menu')}
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card text-card-foreground border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4" style={{letterSpacing: '-0.02em'}}>
              {t('footer.brand')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/maneki.sushi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 border border-border hover:border-primary/30"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground whitespace-pre-line">
                  {t('info.pickupDesc')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+995 598 901 848</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">14:00–02:00</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer.legal')}</h4>
            <div className="space-y-2 text-sm">
              <button className="block text-muted-foreground hover:text-foreground transition-colors duration-200">
                {t('footer.privacy')}
              </button>
              <button className="block text-muted-foreground hover:text-foreground transition-colors duration-200">
                {t('footer.terms')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

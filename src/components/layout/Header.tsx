import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  ArrowRight,
  Globe,
  Share2,
  Search,
  TrendingUp,
  Zap,
  ShoppingBag,
  Target,
  Sparkles,
} from 'lucide-react';
import { getServices, getSettings } from '../../services/storage';
import { trackEvent } from '../../utils/seo';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-indigo-400" />,
  Share2: <Share2 className="w-5 h-5 text-indigo-400" />,
  Search: <Search className="w-5 h-5 text-indigo-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-indigo-400" />,
  Zap: <Zap className="w-5 h-5 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
  Target: <Target className="w-5 h-5 text-indigo-400" />,
};

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, onOpenConsultation }) => {
  const services = getServices().filter((s) => s.status === 'published');
  const settings = getSettings();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesAccordion, setMobileServicesAccordion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    navigate(path);
  };

  const handlePhoneClick = () => {
    trackEvent('header_phone_click', { phone: settings.phone });
  };

  const handleWhatsAppClick = () => {
    trackEvent('header_whatsapp_click', { whatsapp: settings.whatsapp });
  };

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-900/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl text-white tracking-tighter">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                MEDIAMOZAK
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
                Marketing Agency
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('/')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/' ? 'text-white bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Home
            </button>

            <button
              id="nav-about-btn"
              onClick={() => handleNavClick('/about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/about' ? 'text-white bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              About Us
            </button>

            {/* Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services-dropdown-btn"
                onClick={() => handleNavClick('/services')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPath.startsWith('/services') ? 'text-indigo-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] animate-fade-in z-50">
                  <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Core Specializations</span>
                      <button
                        onClick={() => handleNavClick('/services')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
                      >
                        All Services <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {services.map((srv) => (
                        <button
                          key={srv.id}
                          id={`dropdown-service-${srv.slug}`}
                          onClick={() => handleNavClick(`/services/${srv.slug}`)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 text-left transition-colors group/item w-full"
                        >
                          <div className="p-2 rounded-lg bg-slate-800 group-hover/item:bg-indigo-600/20 transition-colors shrink-0">
                            {iconMap[srv.iconName] || <Sparkles className="w-5 h-5 text-indigo-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-slate-100 group-hover/item:text-indigo-300 transition-colors flex items-center justify-between">
                              <span>{srv.name}</span>
                              <span className="text-[10px] text-slate-500 font-normal">Delhi NCR</span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{srv.shortDescription}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct SEO Link as per navigation spec */}
            <button
              id="nav-seo-btn"
              onClick={() => handleNavClick('/services/seo')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/services/seo' ? 'text-indigo-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              SEO
            </button>

            <button
              id="nav-blog-btn"
              onClick={() => handleNavClick('/blog')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath.startsWith('/blog') ? 'text-white bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Blog
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === '/contact' ? 'text-white bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Call button */}
            <a
              id="header-call-btn"
              href={`tel:${cleanPhone}`}
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-slate-800"
              title="Call Mediamozak Marketing"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp button */}
            <a
              id="header-whatsapp-btn"
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-950/40 transition-colors border border-emerald-900/50"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Free Consultation CTA */}
            <button
              id="header-consultation-btn"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-indigo-900/30 active:scale-95"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2.5 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/50"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-800/90 bg-slate-950/98 px-4 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPath === '/' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPath === '/about' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              About Us
            </button>

            {/* Services Accordion */}
            <div className="rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800/80">
              <button
                onClick={() => setMobileServicesAccordion(!mobileServicesAccordion)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium text-slate-200"
              >
                <span className={currentPath.startsWith('/services') ? 'text-indigo-400 font-semibold' : ''}>
                  Services
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesAccordion ? 'rotate-180 text-indigo-400' : 'text-slate-400'}`} />
              </button>

              {mobileServicesAccordion && (
                <div className="px-3 pb-3 space-y-1 border-t border-slate-800/60 pt-2">
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleNavClick(`/services/${srv.slug}`)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                        currentPath === `/services/${srv.slug}`
                          ? 'text-indigo-400 bg-indigo-950/40 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="shrink-0">{iconMap[srv.iconName] || <Sparkles className="w-4 h-4 text-indigo-400" />}</div>
                      <span className="truncate">{srv.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick('/services')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-indigo-400 hover:underline pt-2"
                  >
                    View All Services →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/services/seo')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPath === '/services/seo' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              SEO (Delhi & NCR)
            </button>

            <button
              onClick={() => handleNavClick('/blog')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPath.startsWith('/blog') ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              Blog & Insights
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                currentPath === '/contact' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-200 hover:bg-slate-900'
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-center text-sm shadow-lg shadow-indigo-900/40"
            >
              Get a Free Consultation
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${cleanPhone}`}
                onClick={handlePhoneClick}
                className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="py-3 px-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

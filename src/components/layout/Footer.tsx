import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getServices, getSettings } from '../../services/storage';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const services = getServices().filter((s) => s.status === 'published');
  const settings = getSettings();
  const currentYear = Math.max(2026, new Date().getFullYear());

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-24 lg:pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <span className="font-black text-lg text-white">M</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                MEDIAMOZAK
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Mediamozak Marketing Agency is a premier performance and digital marketing agency based in Hari Nagar, West Delhi. We build transparent, data-driven customer acquisition systems that scale revenue.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city} – {settings.postalCode}, {settings.country}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-medium"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Core Specializations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {services.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => navigate(`/services/${srv.slug}`)}
                    className="hover:text-indigo-300 transition-colors text-left text-slate-400 hover:translate-x-1 duration-150 inline-block"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Important Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Company & Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/seo')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  SEO in Delhi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  Marketing Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sitemap.xml')} className="hover:text-indigo-300 transition-colors text-slate-400">
                  XML Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Local SEO & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Location & Trust
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Serving businesses across West Delhi (Hari Nagar, Janakpuri, Rajouri Garden, Tilak Nagar) and Greater Delhi NCR.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 mb-4">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Agency Standards</span>
              </div>
              <p className="text-[11px] text-slate-400">No inflated vanity metrics. Strategy-first marketing execution.</p>
            </div>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => navigate('/privacy-policy')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/terms-and-conditions')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="block text-slate-500 hover:text-indigo-400 transition-colors text-[11px] pt-2"
              >
                Agency Portal Login →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
            © {currentYear} Mediamozak Marketing Agency. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600 mt-1">
            Hari Nagar, West Delhi, Delhi – 110064, India
          </p>
        </div>
      </div>
    </footer>
  );
};

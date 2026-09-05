import React from 'react';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { getSettings, getServiceBySlug } from '../../services/storage';
import { trackEvent } from '../../utils/seo';

interface MobileBottomBarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentPath, navigate }) => {
  const settings = getSettings();

  // If in admin panel, hide this bar
  if (currentPath.startsWith('/admin')) {
    return null;
  }

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  let dynamicMessage = settings.whatsappTemplates.default;
  if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    const srv = getServiceBySlug(slug);
    if (srv && settings.whatsappTemplates.services[srv.slug]) {
      dynamicMessage = settings.whatsappTemplates.services[srv.slug];
    } else if (srv) {
      dynamicMessage = `Hi Mediamozak Marketing Agency, I am interested in your ${srv.name} services. I would like to discuss my requirements.`;
    }
  }

  const handleCall = () => {
    trackEvent('mobile_bar_call_click', { phone: settings.phone });
  };

  const handleWhatsApp = () => {
    trackEvent('mobile_bar_whatsapp_click', { whatsapp: settings.whatsapp });
  };

  return (
    <div
      id="mobile-bottom-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-lg px-3 py-2 shadow-2xl safe-area-pb"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Now */}
        <a
          id="mobile-bar-call-btn"
          href={`tel:${cleanPhone}`}
          onClick={handleCall}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 active:bg-slate-800 transition-colors"
        >
          <Phone className="w-4 h-4 text-indigo-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          id="mobile-bar-whatsapp-btn"
          href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(dynamicMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 border border-emerald-900/60 text-emerald-400 active:bg-emerald-900 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Contact Us */}
        <button
          id="mobile-bar-contact-btn"
          onClick={() => navigate('/contact')}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-indigo-600/90 text-white active:bg-indigo-700 transition-colors shadow-sm"
        >
          <Mail className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Contact Us</span>
        </button>
      </div>
    </div>
  );
};

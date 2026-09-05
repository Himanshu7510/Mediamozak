import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getSettings, getServiceBySlug } from '../../services/storage';
import { trackEvent } from '../../utils/seo';

interface FloatingWhatsAppProps {
  currentPath: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentPath }) => {
  const settings = getSettings();
  const [isOpen, setIsOpen] = useState(false);

  // Determine dynamic service message
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

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(dynamicMessage)}`;

  const handleClick = () => {
    trackEvent('floating_whatsapp_click', { page: currentPath, message: dynamicMessage });
  };

  return (
    <aside aria-label="WhatsApp Quick Support" className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Mini preview popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-slate-200 text-xs animate-fade-in backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white text-xs">Mediamozak Agency</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="mt-2 text-slate-300 text-[11px] leading-relaxed">
            Need quick guidance on SEO, performance ads, or lead generation in Delhi? Chat with our team right now on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mt-3 block w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            Start WhatsApp Chat →
          </a>
        </div>
      )}

      {/* Floating Action Circle */}
      <div className="relative group">
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Chat with Mediamozak on WhatsApp"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-950/50 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <MessageSquare className="w-7 h-7 fill-white" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>

        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-0 animate-ping -z-10 pointer-events-none" />
      </div>
    </aside>
  );
};

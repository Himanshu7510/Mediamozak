import React, { useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Building2 } from 'lucide-react';
import { getSettings } from '../services/storage';
import { updatePageSeo, trackEvent } from '../utils/seo';
import { LeadForm } from '../components/common/LeadForm';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const settings = getSettings();

  useEffect(() => {
    updatePageSeo(
      {
        title: 'Contact Us | Mediamozak Marketing Agency Delhi — Phone, WhatsApp & Office',
        description:
          'Contact Mediamozak Marketing Agency in Hari Nagar, West Delhi. Call or WhatsApp +91 7982984658 for digital marketing, SEO, and performance advertising consultations.',
        canonicalUrl: 'https://mediamozak.com/contact',
        ogTitle: 'Contact Mediamozak Marketing Agency Delhi',
        ogDescription: 'Reach out to discuss your marketing objectives. Call or WhatsApp +91 7982984658.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Mediamozak Marketing Agency',
          telephone: settings.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: settings.address,
            addressLocality: settings.city,
            postalCode: settings.postalCode,
            addressCountry: 'IN',
          },
          openingHours: 'Mo-Sa 09:30-19:00',
        },
      },
      settings
    );
  }, [settings]);

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="pt-12 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>Direct Communications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Connect with Mediamozak Marketing Agency
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Ready to scale your business? Speak directly with our marketing strategists in West Delhi via phone, WhatsApp, or schedule a formal consultation below.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Business Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white">Agency Information</h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Office Address
                    </span>
                    <p className="text-white font-medium mt-0.5">
                      {settings.address}, {settings.city} – {settings.postalCode}, {settings.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Telephone
                    </span>
                    <a href={`tel:${cleanPhone}`} className="text-white font-bold hover:text-indigo-300 transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      WhatsApp Support
                    </span>
                    <a
                      href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Electronic Mail
                    </span>
                    <a href={`mailto:${settings.email}`} className="text-white hover:text-indigo-300">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Consultation Hours
                    </span>
                    <p className="text-slate-300 text-xs">
                      Monday – Saturday: 9:30 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-800"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Local Context Notice */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <p className="font-semibold text-slate-300 mb-1">Serving Delhi NCR & Pan-India</p>
              Located conveniently in Hari Nagar, West Delhi. We welcome in-person client strategy meetings by appointment.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <LeadForm sourcePage="/contact" title="Send an Inquiry" />
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Hari Nagar, West Delhi, Delhi – 110064</span>
            </div>
            <span className="text-[11px] text-slate-500">Google Maps Location</span>
          </div>

          <iframe
            title="Mediamozak Marketing Agency Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.966952796447!2d77.10228355!3d28.62998635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03222d645e57%3A0x6b77c558c4f9f68e!2sHari%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110064!5e0!3m2!1sen!2sin!4v1709600000000!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale contrast-125 opacity-90"
          />
        </div>
      </section>
    </div>
  );
};

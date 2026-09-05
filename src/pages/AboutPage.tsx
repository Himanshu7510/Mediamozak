import React, { useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Target,
  BarChart3,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  Users,
  Compass,
} from 'lucide-react';
import { getSettings } from '../services/storage';
import { updatePageSeo } from '../utils/seo';

interface AboutPageProps {
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate, onOpenConsultation }) => {
  const settings = getSettings();

  useEffect(() => {
    updatePageSeo(
      {
        title: 'About Mediamozak Marketing Agency | Performance Marketing Delhi',
        description:
          'Learn about Mediamozak Marketing Agency in Hari Nagar, West Delhi. Discover our approach, philosophy, and focus on measurable commercial growth.',
        canonicalUrl: 'https://mediamozak.com/about',
        ogTitle: 'About Mediamozak Marketing Agency Delhi',
        ogDescription: 'A performance-driven digital marketing agency in West Delhi dedicated to strategy, data integrity, and business growth.',
        ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      },
      settings
    );
  }, [settings]);

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="pt-12 sm:pt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <span>Agency Profile & Philosophy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Marketing Built on Measurable Business Realities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Mediamozak Marketing Agency was established to solve a fundamental disconnect in the digital advertising industry: the gap between vanity metrics and real commercial profit.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Who We Are</h2>
            <h3 className="text-2xl font-bold text-white">A Strategic Digital & Performance Marketing Team</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Based in Hari Nagar, West Delhi, Mediamozak operates as an agile marketing partner for brands and business owners who treat marketing as an investment vehicle rather than an expense line item. We combine search intelligence, performance advertising on Google and Meta, rapid quick-commerce marketing, and high-intent lead generation.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              We do not rely on generic templates or outsource your strategic execution. Every campaign is constructed around your margins, your target customers, and your sales cycle.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">What We Do</h2>
            <h3 className="text-2xl font-bold text-white">Full-Funnel Customer Acquisition Architecture</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our core work spans the entire buyer lifecycle:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Capturing high-intent commercial buyers via SEO and Google Search</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lowering customer acquisition costs (CAC) through disciplined Meta & Google Ads</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dominating 10-minute dark-store shelf space on Blinkit, Zepto & Instamart</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Building frictionless landing pages and WhatsApp funnels for instant lead response</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach & Philosophy */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Our Operating Philosophy</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Businesses Need Performance-Driven Discipline
            </h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              In an era of rising digital ad costs and sophisticated search algorithms, haphazard marketing drains capital fast. Here is how we operate differently:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Radical Attribution Truth</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We track revenue and qualified leads, not just ad clicks or algorithm impressions. If a channel fails to justify its cost, we adjust immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-lg font-bold text-white">Full Client Ownership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You retain complete ownership of all ad accounts, tracking containers, creative assets, and analytics. No held-hostage access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Sustainable Organic Moats</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                While paid advertising drives immediate pipeline, we build technical and local SEO structures that compound your long-term organic traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Hari Nagar, West Delhi, Delhi – 110064</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Let’s Discuss Your Commercial Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Schedule a strategic consultation or visit our office to review your growth goals with our directors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all text-center"
            >
              Get a Free Consultation
            </button>
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs sm:text-sm border border-slate-700 text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

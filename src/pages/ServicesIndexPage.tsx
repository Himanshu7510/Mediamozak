import React, { useEffect } from 'react';
import {
  ArrowRight,
  Globe,
  Share2,
  Search,
  TrendingUp,
  Zap,
  ShoppingBag,
  Target,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { getServices, getSettings } from '../services/storage';
import { updatePageSeo } from '../utils/seo';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-indigo-400" />,
  Share2: <Share2 className="w-6 h-6 text-indigo-400" />,
  Search: <Search className="w-6 h-6 text-indigo-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-indigo-400" />,
  Zap: <Zap className="w-6 h-6 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-indigo-400" />,
  Target: <Target className="w-6 h-6 text-indigo-400" />,
};

interface ServicesIndexPageProps {
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({ navigate, onOpenConsultation }) => {
  const services = getServices().filter((s) => s.status === 'published');
  const settings = getSettings();

  useEffect(() => {
    updatePageSeo(
      {
        title: 'Marketing Services | Digital, SEO, Performance & Q-Commerce — Mediamozak',
        description:
          'Explore Mediamozak’s complete suite of performance and digital marketing services in Delhi: SEO, Social Media, Google Ads, Q-Commerce, and Lead Generation.',
        canonicalUrl: 'https://mediamozak.com/services',
        ogTitle: 'Digital & Performance Marketing Services in Delhi | Mediamozak',
        ogDescription: 'Seven specialized practices engineered for commercial velocity, positive ROAS, and qualified pipeline expansion.',
      },
      settings
    );
  }, [settings]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Header */}
      <section className="pt-12 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>Specialized Capabilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            End-to-End Growth & Performance Marketing Services
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every service practice is governed by clear acquisition economics. Choose an individual discipline to address a specific bottleneck or connect multiple services for full-funnel scale.
          </p>
        </div>
      </section>

      {/* Services List Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {iconMap[srv.iconName] || <Sparkles className="w-6 h-6 text-indigo-400" />}
                  </div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Service 0{idx + 1}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {srv.name}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {srv.shortDescription}
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                  {srv.benefits.slice(0, 4).map((b, bi) => (
                    <div key={bi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-center gap-3 lg:border-l lg:border-slate-800/80 lg:pl-8">
                <button
                  onClick={() => navigate(`/services/${srv.slug}`)}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore {srv.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700 text-center"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

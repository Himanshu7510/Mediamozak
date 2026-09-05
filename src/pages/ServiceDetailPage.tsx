import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Phone,
  MessageSquare,
  Globe,
  Share2,
  Search,
  TrendingUp,
  Zap,
  ShoppingBag,
  Target,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { getServiceBySlug, getServices, getSettings } from '../services/storage';
import { updatePageSeo, generateServiceSchema, trackEvent } from '../utils/seo';
import { LeadForm } from '../components/common/LeadForm';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7 text-indigo-400" />,
  Share2: <Share2 className="w-7 h-7 text-indigo-400" />,
  Search: <Search className="w-7 h-7 text-indigo-400" />,
  TrendingUp: <TrendingUp className="w-7 h-7 text-indigo-400" />,
  Zap: <Zap className="w-7 h-7 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-7 h-7 text-indigo-400" />,
  Target: <Target className="w-7 h-7 text-indigo-400" />,
};

interface ServiceDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, navigate, onOpenConsultation }) => {
  const service = getServiceBySlug(slug);
  const allServices = getServices();
  const settings = getSettings();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (service) {
      updatePageSeo(
        {
          title: service.seoTitle,
          description: service.metaDescription,
          canonicalUrl: service.canonicalUrl || `https://mediamozak.com/services/${service.slug}`,
          ogTitle: service.ogTitle || service.seoTitle,
          ogDescription: service.ogDescription || service.metaDescription,
          ogImage: service.ogImage,
          jsonLd: generateServiceSchema({
            name: service.name,
            description: service.metaDescription,
            slug: service.slug,
            faqs: service.faqs,
          }),
        },
        settings
      );
    }
  }, [service, settings]);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-slate-400 mb-6">The requested service page does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/services')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Services</span>
        </button>
      </div>
    );
  }

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    settings.whatsappTemplates.services[service.slug] ||
      `Hi Mediamozak Marketing Agency, I am interested in your ${service.name} services. I would like to discuss my requirements.`
  );

  const relatedServices = allServices.filter(
    (s) => s.slug !== service.slug && (service.relatedServiceSlugs?.includes(s.slug) || s.status === 'published')
  ).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. BREADCRUMBS & HERO SECTION */}
      <section className="pt-8 sm:pt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-indigo-400 transition-colors">
                  Home
                </button>
              </li>
              <li>/</li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-400 transition-colors">
                  Services
                </button>
              </li>
              <li>/</li>
              <li className="text-indigo-400 font-semibold truncate max-w-[200px] sm:max-w-none">
                {service.name}
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span>Specialized Marketing Practice • Delhi NCR</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {service.h1 || service.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {service.heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="service-hero-consultation-btn"
                  onClick={onOpenConsultation}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-indigo-900/40"
                >
                  Request Strategy Call
                </button>

                <a
                  id="service-hero-whatsapp-btn"
                  href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 font-semibold text-sm sm:text-base border border-emerald-800/60 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Enquiries</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  {iconMap[service.iconName] || <Sparkles className="w-7 h-7 text-indigo-400" />}
                </div>
                <h3 className="text-xl font-bold text-white">Execution Guarantee</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every {service.name} project is overseen by dedicated senior campaign managers in Hari Nagar, West Delhi. Complete data ownership and transparent reporting.
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No unapproved budget overruns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Weekly progress synchronization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & STRATEGIC METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Service Overview</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Strategic Execution Matters in {service.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.overview}
            </p>

            {/* Strategic Pillars */}
            <div className="pt-4 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Core Strategic Components
              </h4>
              <div className="space-y-2.5">
                {service.strategy.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Primary Commercial Benefits</span>
              </h4>
              <ul className="space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Roadmap to Success</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our 5-Stage Execution Framework
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Clear milestones designed to move from initial audit to scaled commercial impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {service.process.map((step) => (
              <div key={step.stepNumber} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
                <div className="text-2xl font-black text-indigo-400 mb-2">0{step.stepNumber}</div>
                <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONCRETE DELIVERABLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">What You Receive</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Concrete Deliverables & Assets
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.deliverables.map((del, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">{del.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{del.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICE SPECIFIC FAQS */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Frequently Asked Questions</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Questions Regarding {service.name}
            </h3>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-100">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. RELATED SERVICES INTERNAL LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">Complementary Growth Services</h3>
            <p className="text-xs sm:text-sm text-slate-400">Combine capabilities to build connected customer funnels.</p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            All Services <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <div
              key={rel.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <h4 className="text-base font-bold text-white mb-2">{rel.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{rel.shortDescription}</p>
              </div>
              <button
                onClick={() => navigate(`/services/${rel.slug}`)}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
              >
                Explore Service →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DEDICATED CONSULTATION & CONTACT FORM */}
      <section id="service-lead-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Discuss Your {service.name} Requirements
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Let us analyze your existing accounts, rankings, or catalog placement. We will return with actionable strategic takeaways and an execution roadmap.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Direct Inquiries</div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Phone className="w-4 h-4 text-indigo-400" />
                <a href={`tel:${cleanPhone}`} className="hover:underline">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm
              defaultService={service.slug}
              sourcePage={`/services/${service.slug}`}
              title={`Inquire About ${service.name}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

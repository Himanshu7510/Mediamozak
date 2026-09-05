import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Globe,
  Share2,
  Search,
  TrendingUp,
  Zap,
  ShoppingBag,
  Target,
  CheckCircle2,
  ChevronDown,
  Layers,
  BarChart3,
  ShieldCheck,
  Building2,
  Compass,
  Cpu,
} from 'lucide-react';
import { getServices, getSettings } from '../services/storage';
import { updatePageSeo, trackEvent } from '../utils/seo';
import { LeadForm } from '../components/common/LeadForm';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-indigo-400" />,
  Share2: <Share2 className="w-6 h-6 text-indigo-400" />,
  Search: <Search className="w-6 h-6 text-indigo-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-indigo-400" />,
  Zap: <Zap className="w-6 h-6 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-indigo-400" />,
  Target: <Target className="w-6 h-6 text-indigo-400" />,
};

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenConsultation }) => {
  const services = getServices().filter((s) => s.status === 'published');
  const settings = getSettings();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    updatePageSeo(
      {
        title: 'Mediamozak Marketing Agency | Performance & Digital Marketing Delhi',
        description:
          'Mediamozak is a leading digital and performance marketing agency in Delhi offering SEO, social media, paid advertising, Q-commerce, and high-conversion lead generation.',
        canonicalUrl: 'https://mediamozak.com/',
        ogTitle: 'Mediamozak Marketing Agency | Marketing That Moves Your Business Forward',
        ogDescription: 'Data-driven digital marketing, SEO, performance marketing, and lead generation based in Hari Nagar, West Delhi.',
        ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'MarketingAgency',
          name: 'Mediamozak Marketing Agency',
          telephone: settings.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: settings.address,
            addressLocality: settings.city,
            postalCode: settings.postalCode,
            addressCountry: 'IN',
          },
          areaServed: ['Delhi', 'West Delhi', 'Delhi NCR', 'India'],
          url: 'https://mediamozak.com/',
        },
      },
      settings
    );
  }, [settings]);

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  const homepageFaqs = [
    {
      q: 'What types of businesses do you work with in Delhi NCR?',
      a: 'We work with growth-stage B2B enterprises, D2C consumer brands, retail establishments across West Delhi, and quick-commerce vendors who require quantifiable customer acquisition rather than unmeasured brand awareness.',
    },
    {
      q: 'How does Mediamozak approach performance marketing differently?',
      a: 'We eliminate vanity metrics. Every campaign is tied to cost-per-acquisition (CPA), return on ad spend (ROAS), and verified lead quality. We maintain negative keywords, build custom high-converting landing pages, and optimize conversion pipelines daily.',
    },
    {
      q: 'Can you help our local West Delhi business rank higher on Google Maps?',
      a: 'Yes. Local SEO is one of our flagship capabilities. We optimize your Google Business Profile (GBP), coordinate geo-targeted citations, configure LocalBusiness schema, and generate organic search rankings across West Delhi.',
    },
    {
      q: 'Do you offer Q-Commerce marketing for Blinkit and Zepto?',
      a: 'Yes. We run in-app sponsored search, keyword bidding, and promotional visibility campaigns on Blinkit, Zepto, and Swiggy Instamart to win top shelf placement in dark stores.',
    },
    {
      q: 'What is the onboarding process for a new client?',
      a: 'We begin with an in-depth Discovery & Market Audit to evaluate your current acquisition funnels and competitors. Within 5-7 business days, we deliver a 90-day Growth Blueprint and launch initial campaign architectures.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Digital & Performance Marketing Agency • West Delhi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Marketing That Moves Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-white">Forward.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Mediamozak helps forward-thinking businesses scale sustainably through high-intent SEO, data-driven performance marketing, social media authority, and predictable lead generation.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-indigo-900/40 active:scale-95"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => navigate('/services')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base transition-colors border border-slate-800"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-slate-400">
              <a
                id="hero-phone-cta"
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>Call {settings.phone}</span>
              </a>

              <span className="hidden sm:inline text-slate-700">•</span>

              <a
                id="hero-whatsapp-cta"
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiries</span>
              </a>

              <span className="hidden sm:inline text-slate-700">•</span>

              <span className="text-slate-400">
                Hari Nagar, West Delhi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW (All 7 Services) */}
      <section id="services-overview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Our Core Specializations</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Seven Pillars of Strategic Commercial Growth
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From technical SEO audits and local Google Maps optimization to high-ROAS paid ads and instant quick-commerce visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-slate-900 transition-all group duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 transition-colors">
                  {iconMap[srv.iconName] || <Globe className="w-6 h-6 text-indigo-400" />}
                </div>

                <h4 className="text-xl font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                  {srv.name}
                </h4>

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {srv.shortDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  id={`home-service-btn-${srv.slug}`}
                  onClick={() => navigate(`/services/${srv.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] text-slate-500 font-medium">Delhi NCR</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE MEDIAMOZAK (Strictly No Fake Stats) */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Our Core Philosophy</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Forward-Thinking Businesses Choose Mediamozak
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              We reject the smoke-and-mirrors approach of generic agencies. Our work is anchored in verifiable methodology, commercial accountability, and clean execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Strategy-Driven Marketing</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                We never launch ad campaigns blindly. Every engagement begins with deep competitor audits, search demand research, and customer journey mapping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Data-Driven Decisions</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Gut feelings are replaced by hard analytics. Budget allocations, creative hooks, and bidding strategies are governed by real CAC and ROAS metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Transparent Communication</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                You retain 100% ownership of your ad accounts, analytics, and assets. We provide weekly performance logs with zero hidden markups or obscure reporting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Conversion-Focused Funnels</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Traffic is meaningless if landing pages fail to convert. We design mobile-first, distraction-free landing experiences with rapid WhatsApp actions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">SEO-Focused Long-Term Growth</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                While performance marketing provides immediate traction, our technical and local SEO strategies build an organic moat that compounds month after month.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Scalable Marketing Systems</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                We engineer scalable marketing architectures ready to expand into new geographic territories, additional platforms, and expanded product lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR 5-STEP PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Proven Methodology</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The 5-Phase Growth Execution Engine
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            A methodical roadmap engineered to eliminate wasted spend and accelerate commercial pipeline development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
          {[
            { step: '01', title: 'Discover', desc: 'Audit current assets, technical site health, competitors, and target audience cohorts.' },
            { step: '02', title: 'Strategize', desc: 'Craft a 90-day growth blueprint defining channel allocation, messaging, and KPIs.' },
            { step: '03', title: 'Execute', desc: 'Deploy high-converting landing pages, creative hooks, and ad tracking infrastructure.' },
            { step: '04', title: 'Optimize', desc: 'Iterate based on real CPA and ROAS data, eliminating underperforming audiences.' },
            { step: '05', title: 'Scale', desc: 'Direct capital into validated winning campaigns to capture dominant market share.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-3xl font-black text-indigo-500/40 mb-3">{item.step}</div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INDUSTRIES & BUSINESS GROWTH */}
      <section className="bg-slate-900/40 border-y border-slate-800/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Tailored Category Expertise</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Customized Strategies for Different Business Models
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Marketing cannot be copy-pasted across different business archetypes. An e-commerce brand selling consumer products requires drastically different acquisition funnels than a B2B consultancy or a local West Delhi retail establishment.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'D2C & Consumer Brands: High-ROAS Meta catalogs, Google Shopping & cart recovery',
                  'Q-Commerce & Dark Stores: In-app search optimization on Blinkit, Zepto & Instamart',
                  'B2B & Professional Services: Account-based LinkedIn ads, Google Search & lead qualification',
                  'Retail & Local Delhi Businesses: Google Maps 3-Pack rankings & WhatsApp footfall funnels',
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
              <h4 className="text-xl font-bold text-white">Consult Our Senior Growth Strategists</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether you’re aiming to lower your current Google Ads CPA, achieve top ranking in West Delhi search results, or launch sponsored ads on quick commerce apps, our team will outline a concrete action plan.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md text-center"
                >
                  Book Free Strategic Review
                </button>
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs sm:text-sm border border-slate-700 text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEAD GENERATION SECTION WITH EMBEDDED FORM */}
      <section id="lead-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Direct Lead Pipeline</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Get Your Free Custom Growth Strategy Within 24 Hours
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed">
              Fill out the inquiry form with your current marketing challenges. A senior marketing director from our West Delhi office will examine your website, search visibility, and competitor landscape before reaching out.
            </p>

            <div className="space-y-4 pt-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs">Direct Telephone</span>
                  <a href={`tel:${cleanPhone}`} className="font-semibold text-white hover:text-indigo-300">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs">Direct WhatsApp</span>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-400 hover:underline"
                  >
                    {settings.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 text-xs">Agency Office</span>
                  <span className="text-slate-200">{settings.address}, {settings.city} – {settings.postalCode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm sourcePage="/" />
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Frequently Asked Questions</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Everything You Need to Know About Partnering with Mediamozak
          </h3>
        </div>

        <div className="space-y-3">
          {homepageFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-semibold text-sm sm:text-base text-slate-100">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-200 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Grow Your Business?
            </h3>
            <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
              Eliminate marketing guesswork and start scaling with predictable, data-backed execution. Speak with our strategy team today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="final-cta-btn"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-sm sm:text-base hover:bg-slate-100 transition-all shadow-xl shadow-black/40"
              >
                Get a Free Consultation
              </button>
              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 text-white font-semibold text-sm sm:text-base border border-slate-700 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>Call +91 7982984658</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

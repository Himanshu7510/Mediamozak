import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { addLead, getServices, getSettings } from '../../services/storage';
import { trackEvent } from '../../utils/seo';

interface LeadFormProps {
  defaultService?: string;
  sourcePage?: string;
  className?: string;
  buttonText?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  defaultService = 'digital-marketing',
  sourcePage = '/',
  className = '',
  buttonText = 'Request Free Consultation',
  title = 'Ready to Scale Your Business?',
  subtitle = 'Speak with our senior marketing strategists in West Delhi. We will analyze your current performance and deliver a custom growth roadmap within 24 hours.',
  onSuccess,
}) => {
  const services = getServices();
  const settings = getSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validations
    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid contact number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    try {
      addLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        message: formData.message.trim() || 'Consultation request from website form.',
        source: 'Website Lead Form',
        page: sourcePage,
      });

      trackEvent('lead_form_submit', {
        service: formData.service,
        page: sourcePage,
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError('Unable to submit inquiry at this moment. Please call or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Mediamozak Marketing Agency, I'm reaching out from your website regarding ${formData.service || 'marketing services'}. My name is ${formData.name || 'there'}.`
  );

  return (
    <div className={`bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden ${className}`}>
      {/* Accent glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {title && (
        <div className="mb-6 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h3>
          {subtitle && <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">{subtitle}</p>}
        </div>
      )}

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white">Consultation Request Received!</h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our marketing strategist will review your requirements and reach out via phone or email within 24 hours.
          </p>
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp Directly
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', company: '', service: defaultService, message: '' });
              }}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Phone Number / WhatsApp *
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98110 12345"
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address *
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. rajesh@company.com"
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Company / Brand Name
              </label>
              <input
                id="lead-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Sharma Enterprise"
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lead-service" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Primary Service of Interest *
            </label>
            <select
              id="lead-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.slug} className="bg-slate-900 text-white">
                  {srv.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-message" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Describe Your Objectives & Current Challenges
            </label>
            <textarea
              id="lead-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your target market, current marketing channels, or monthly growth goals..."
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
            <button
              id="lead-form-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <a
              id="lead-form-whatsapp-alt"
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-sm transition-colors border border-slate-700"
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-left pt-1">
            🔒 Your contact information is kept strictly confidential. No spam, ever.
          </p>
        </form>
      )}
    </div>
  );
};

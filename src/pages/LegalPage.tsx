import React, { useEffect } from 'react';
import { getSettings } from '../services/storage';
import { updatePageSeo } from '../utils/seo';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  navigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, navigate }) => {
  const settings = getSettings();
  const isPrivacy = type === 'privacy';

  useEffect(() => {
    updatePageSeo(
      {
        title: isPrivacy
          ? 'Privacy Policy | Mediamozak Marketing Agency'
          : 'Terms & Conditions | Mediamozak Marketing Agency',
        description: isPrivacy
          ? 'Privacy policy for Mediamozak Marketing Agency detailing data protection, cookie policy, and user privacy in India.'
          : 'Terms and conditions governing professional marketing services provided by Mediamozak Marketing Agency.',
        canonicalUrl: `https://mediamozak.com/${isPrivacy ? 'privacy-policy' : 'terms-and-conditions'}`,
      },
      settings
    );
  }, [isPrivacy, settings]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Legal Documentation</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
        </h1>
        <p className="text-xs text-slate-500">Last updated: March 1, 2026 • Mediamozak Marketing Agency</p>
      </div>

      <div className="prose prose-invert prose-indigo text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        {isPrivacy ? (
          <>
            <p>
              Mediamozak Marketing Agency (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operating from Hari Nagar, West Delhi, Delhi – 110064, is committed to safeguarding the privacy and personal data of our website visitors, clients, and partners.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us through consultation forms, direct WhatsApp chats, or telephone inquiries, including your name, email address, telephone number, company name, and commercial requirements.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">2. Use of Information</h2>
            <p>
              We use collected information solely to evaluate your business inquiry, prepare tailored marketing strategy roadmaps, respond to communications, and execute authorized marketing services. We do NOT sell, rent, or trade your personal data to third parties.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">3. Analytics & Cookies</h2>
            <p>
              Our website may utilize standard analytical tools (such as Google Analytics and Meta Pixel) to track aggregate visitor behavior, page engagement, and conversion performance. These cookies help us enhance website usability and Core Web Vitals.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">4. Data Security</h2>
            <p>
              We implement industry-standard encryption, access controls, and security practices to protect stored lead records against unauthorized access, loss, or disclosure.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">5. Contact Information</h2>
            <p>
              For privacy-related inquiries or data deletion requests, contact us at contact@mediamozak.com or call +91 7982984658.
            </p>
          </>
        ) : (
          <>
            <p>
              These Terms and Conditions govern the use of the Mediamozak Marketing Agency website and the provision of professional marketing and consulting services.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">1. Scope of Services</h2>
            <p>
              Mediamozak Marketing Agency provides digital marketing, search engine optimization (SEO), performance marketing, social media marketing, Q-commerce visibility, and lead generation services. Specific project deliverables, budgets, and milestones are governed by individual client Service Level Agreements (SLAs).
            </p>
            <h2 className="text-xl font-bold text-white pt-4">2. Performance & Third-Party Platforms</h2>
            <p>
              While we apply rigorous data-driven methodology, marketing outcomes rely on third-party algorithms (Google, Meta, Blinkit, Zepto), consumer demand, and client offer strength. We do not guarantee specific monetary returns or #1 search rankings where algorithmic control is proprietary.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">3. Intellectual Property & Account Ownership</h2>
            <p>
              Clients retain full ownership of their proprietary assets, advertising accounts, and customer lists. Work created by Mediamozak upon full settlement of invoices belongs to the client.
            </p>
            <h2 className="text-xl font-bold text-white pt-4">4. Jurisdiction</h2>
            <p>
              These terms are governed by the laws of Delhi, India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Delhi.
            </p>
          </>
        )}
      </div>

      <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-indigo-400 hover:underline"
        >
          ← Return to Home
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="text-xs font-semibold text-slate-400 hover:text-white"
        >
          Contact Legal Representative
        </button>
      </div>
    </div>
  );
};

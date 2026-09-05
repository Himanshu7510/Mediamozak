import React, { useState } from 'react';
import { BarChart, Save, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { getSettings, saveSettings } from '../services/storage';

export const AdminAnalyticsManager: React.FC = () => {
  const [settings, setSettings] = useState(getSettings());
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setMessage('Analytics tracking configurations saved!');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <BarChart className="w-7 h-7 text-indigo-400" />
          <span>Analytics & Tracking Integrations</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage event dispatch IDs for Google Analytics 4, Tag Manager, Meta Pixel, and Search Console.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Measurement & Pixel IDs
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsId || ''}
                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                placeholder="G-ABC123XYZ"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Automatically receives page views and custom conversion events (e.g., generate_lead).
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Google Tag Manager Container ID
              </label>
              <input
                type="text"
                value={settings.googleTagManagerId || ''}
                onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Meta Pixel ID (Facebook / Instagram Ads)
              </label>
              <input
                type="text"
                value={settings.metaPixelId || ''}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                placeholder="123456789012345"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Dispatches Lead, Contact, and ViewContent events for conversion campaign tracking.
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Google Search Console Verification Meta Tag
              </label>
              <input
                type="text"
                value={settings.googleSearchConsoleVerification || ''}
                onChange={(e) =>
                  setSettings({ ...settings, googleSearchConsoleVerification: e.target.value })
                }
                placeholder="verification-string"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Analytics Configuration</span>
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Building2, Phone, Mail, Globe, Code, ShieldCheck } from 'lucide-react';
import { getSettings, saveSettings } from '../services/storage';
import { WebsiteSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(getSettings());
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setMessage('Website & tracking settings updated successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-7 h-7 text-indigo-400" />
          <span>Agency Profile & Global Configuration</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Update agency NAP details (Name, Address, Phone), social profiles, and tracking tags across all pages.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* NAP Block */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Agency NAP Identity (Name, Address, Phone)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Agency Legal Brand Name</label>
              <input
                type="text"
                required
                value={settings.agencyName}
                onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Telephone Number</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Email Address</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Postal Code (PIN)</label>
              <input
                type="text"
                required
                value={settings.postalCode}
                onChange={(e) => setSettings({ ...settings, postalCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-300 font-semibold mb-1">Physical Street Address</label>
            <input
              type="text"
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>
        </div>

        {/* Global Social Links */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Social Profile URLs (Schema SameAs)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">LinkedIn Agency Page</label>
              <input
                type="url"
                value={settings.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Instagram Profile</label>
              <input
                type="url"
                value={settings.socialLinks.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Facebook Business Page</label>
              <input
                type="url"
                value={settings.socialLinks.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">X / Twitter Handle</label>
              <input
                type="url"
                value={settings.socialLinks.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Tracking Tags & Verification */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>Search Console & Marketing Tracking Tags</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Google Tag Manager (GTM-XXXXX)</label>
              <input
                type="text"
                value={settings.googleTagManagerId || ''}
                onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Google Analytics 4 (G-XXXXXXX)</label>
              <input
                type="text"
                value={settings.googleAnalyticsId || ''}
                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Meta Pixel ID</label>
              <input
                type="text"
                value={settings.metaPixelId || ''}
                onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                placeholder="123456789012345"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Google Search Console Verification Token</label>
              <input
                type="text"
                value={settings.googleSearchConsoleVerification || ''}
                onChange={(e) =>
                  setSettings({ ...settings, googleSearchConsoleVerification: e.target.value })
                }
                placeholder="google-site-verification token"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-950/50"
        >
          <Save className="w-4 h-4" />
          <span>Save Global Configuration</span>
        </button>
      </form>
    </div>
  );
};

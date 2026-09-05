import React, { useState } from 'react';
import { MessageSquare, Save, CheckCircle2, ExternalLink, Phone } from 'lucide-react';
import { getSettings, saveSettings } from '../services/storage';

export const AdminWhatsAppSettings: React.FC = () => {
  const [settings, setSettings] = useState(getSettings());
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setMessage('WhatsApp configuration saved successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  const updateServiceTemplate = (slug: string, text: string) => {
    setSettings({
      ...settings,
      whatsappTemplates: {
        ...settings.whatsappTemplates,
        services: {
          ...settings.whatsappTemplates.services,
          [slug]: text,
        },
      },
    });
  };

  const cleanPhone = settings.whatsapp.replace(/\D/g, '');
  const testUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(settings.whatsappTemplates.default)}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-emerald-400" />
          <span>WhatsApp Lead Funnel Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure the active WhatsApp consultation number and automated intent messages for each service page.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Number & Default Message */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Active WhatsApp Line</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div className="flex items-end">
              <a
                href={testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 font-semibold text-xs border border-emerald-800 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Test Live WhatsApp Message Link</span>
              </a>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-300 font-semibold mb-1">Global Default Inquiry Message</label>
            <textarea
              rows={2}
              required
              value={settings.whatsappTemplates.default}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whatsappTemplates: { ...settings.whatsappTemplates, default: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Per-Service Templates */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Per-Service Pre-Filled Inquiries
          </h2>
          <p className="text-xs text-slate-400">
            When a prospect clicks WhatsApp on a specific service page, their app will pre-fill with this exact message:
          </p>

          <div className="space-y-4 text-xs">
            {Object.entries(settings.whatsappTemplates.services).map(([slug, templateText]) => (
              <div key={slug} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">
                  Service: {slug}
                </span>
                <input
                  type="text"
                  value={templateText}
                  onChange={(e) => updateServiceTemplate(slug, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950/50"
        >
          <Save className="w-4 h-4" />
          <span>Save WhatsApp Preferences</span>
        </button>
      </form>
    </div>
  );
};

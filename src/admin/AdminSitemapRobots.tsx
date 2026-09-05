import React, { useState } from 'react';
import { FileCode, RefreshCw, Copy, Check, Save, CheckCircle2 } from 'lucide-react';
import { generateSitemapXml } from '../utils/sitemap';
import { getSettings, saveSettings } from '../services/storage';

export const AdminSitemapRobots: React.FC = () => {
  const [settings, setSettings] = useState(getSettings());
  const [sitemapXml, setSitemapXml] = useState(generateSitemapXml());
  const [robotsTxt, setRobotsTxt] = useState(settings.robotsTxt);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegenerate = () => {
    const updated = generateSitemapXml();
    setSitemapXml(updated);
    setMessage('Sitemap recompiled against current database index.');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveRobots = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...settings, robotsTxt };
    saveSettings(updated);
    setSettings(updated);
    setMessage('Robots.txt directives saved.');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <FileCode className="w-7 h-7 text-indigo-400" />
          <span>Sitemap.xml & Robots.txt Directives</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search engine crawling instructions and live auto-updating XML sitemap generator.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Dynamic XML Sitemap Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Dynamic XML Sitemap
            </h2>
            <span className="text-xs text-slate-400">
              Live route: <a href="/sitemap.xml" className="text-indigo-400 hover:underline">/sitemap.xml</a>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={handleCopySitemap}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy XML'}</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto max-h-64 leading-relaxed">
          {sitemapXml}
        </pre>
      </div>

      {/* Robots.txt Editor */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Robots.txt Directives
            </h2>
            <span className="text-xs text-slate-400">
              Live route: <a href="/robots.txt" className="text-indigo-400 hover:underline">/robots.txt</a>
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveRobots} className="space-y-4">
          <textarea
            rows={8}
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Robots.txt</span>
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { generateSitemapXml } from '../utils/sitemap';
import { getSettings } from '../services/storage';
import { Copy, Check, FileCode, ArrowLeft } from 'lucide-react';

interface SitemapViewPageProps {
  navigate: (path: string) => void;
  type: 'sitemap' | 'robots';
}

export const SitemapViewPage: React.FC<SitemapViewPageProps> = ({ navigate, type }) => {
  const settings = getSettings();
  const [copied, setCopied] = useState(false);

  const content = type === 'sitemap' ? generateSitemapXml() : settings.robotsTxt;
  const title = type === 'sitemap' ? 'sitemap.xml' : 'robots.txt';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span>{title}</span>
          </h1>
          <p className="text-xs text-slate-400">
            {type === 'sitemap'
              ? 'Automatically generated dynamic XML sitemap conforming to sitemaps.org standards.'
              : 'Search engine crawler directives blocking private admin routes and pointing to sitemap.'}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy Content'}</span>
        </button>
      </div>

      <pre className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed max-h-[600px]">
        {content}
      </pre>
    </div>
  );
};

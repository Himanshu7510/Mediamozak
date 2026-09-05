import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Smartphone,
  Save,
  Globe,
  Share2,
  Code,
  ShieldCheck,
} from 'lucide-react';
import {
  getPages,
  getServices,
  getBlogPosts,
  savePage,
  saveService,
  saveBlogPost,
} from '../services/storage';

export const AdminSeoManager: React.FC = () => {
  const pages = getPages();
  const services = getServices();
  const blogs = getBlogPosts();

  // Combine items for selector
  const allTargets = [
    ...pages.map((p) => ({
      type: 'page' as const,
      id: p.id,
      title: p.title,
      slug: p.slug === 'home' ? '' : p.slug,
      raw: p,
    })),
    ...services.map((s) => ({
      type: 'service' as const,
      id: s.id,
      title: `[Service] ${s.name}`,
      slug: `services/${s.slug}`,
      raw: s,
    })),
    ...blogs.map((b) => ({
      type: 'blog' as const,
      id: b.id,
      title: `[Blog] ${b.title}`,
      slug: `blog/${b.slug}`,
      raw: b,
    })),
  ];

  const [selectedKey, setSelectedKey] = useState<string>(allTargets[0]?.id || '');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [message, setMessage] = useState<string | null>(null);

  // Active item state
  const currentTarget = allTargets.find((t) => t.id === selectedKey) || allTargets[0];

  // Working state
  const [title, setTitle] = useState(
    currentTarget?.type === 'service'
      ? (currentTarget.raw as any).seoTitle || currentTarget.title
      : currentTarget?.type === 'blog'
      ? (currentTarget.raw as any).seoTitle || currentTarget.title
      : (currentTarget.raw as any).title
  );

  const [metaDescription, setMetaDescription] = useState(
    (currentTarget?.raw as any).metaDescription || ''
  );

  const [focusKeyword, setFocusKeyword] = useState(
    (currentTarget?.raw as any).focusKeyword || 'digital marketing delhi'
  );

  const [h1, setH1] = useState(
    (currentTarget?.raw as any).h1 || (currentTarget?.raw as any).name || currentTarget.title
  );

  const [canonicalUrl, setCanonicalUrl] = useState(
    (currentTarget?.raw as any).canonicalUrl || `https://mediamozak.com/${currentTarget.slug}`
  );

  const [ogTitle, setOgTitle] = useState((currentTarget?.raw as any).ogTitle || '');
  const [ogDescription, setOgDescription] = useState((currentTarget?.raw as any).ogDescription || '');
  const [ogImage, setOgImage] = useState((currentTarget?.raw as any).ogImage || '');
  const [isIndexable, setIsIndexable] = useState(
    (currentTarget?.raw as any).isIndexable !== false
  );

  // Update form when target selector changes
  const handleSelectTarget = (id: string) => {
    setSelectedKey(id);
    const item = allTargets.find((t) => t.id === id);
    if (!item) return;

    if (item.type === 'page') {
      const p = item.raw as any;
      setTitle(p.title);
      setMetaDescription(p.metaDescription || '');
      setH1(p.h1 || p.title);
      setCanonicalUrl(p.canonicalUrl || `https://mediamozak.com/${item.slug}`);
      setFocusKeyword(p.focusKeyword || 'performance marketing');
      setOgTitle(p.ogTitle || '');
      setOgDescription(p.ogDescription || '');
      setOgImage(p.ogImage || '');
      setIsIndexable(p.isIndexable !== false);
    } else if (item.type === 'service') {
      const s = item.raw as any;
      setTitle(s.seoTitle || s.name);
      setMetaDescription(s.metaDescription || '');
      setH1(s.h1 || s.name);
      setCanonicalUrl(s.canonicalUrl || `https://mediamozak.com/${item.slug}`);
      setFocusKeyword(s.focusKeyword || s.name.toLowerCase());
      setOgTitle(s.ogTitle || '');
      setOgDescription(s.ogDescription || '');
      setOgImage(s.ogImage || '');
      setIsIndexable(s.status === 'published');
    } else if (item.type === 'blog') {
      const b = item.raw as any;
      setTitle(b.seoTitle || b.title);
      setMetaDescription(b.metaDescription || b.excerpt || '');
      setH1(b.h1 || b.title);
      setCanonicalUrl(b.canonicalUrl || `https://mediamozak.com/${item.slug}`);
      setFocusKeyword(b.focusKeyword || b.category.toLowerCase());
      setOgTitle(b.ogTitle || '');
      setOgDescription(b.ogDescription || '');
      setOgImage(b.ogImage || b.featuredImage || '');
      setIsIndexable(b.status === 'published');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTarget) return;

    if (currentTarget.type === 'page') {
      const updated = {
        ...(currentTarget.raw as any),
        title,
        metaDescription,
        h1,
        canonicalUrl,
        focusKeyword,
        ogTitle,
        ogDescription,
        ogImage,
        isIndexable,
      };
      savePage(updated);
    } else if (currentTarget.type === 'service') {
      const updated = {
        ...(currentTarget.raw as any),
        seoTitle: title,
        metaDescription,
        h1,
        canonicalUrl,
        focusKeyword,
        ogTitle,
        ogDescription,
        ogImage,
      };
      saveService(updated);
    } else if (currentTarget.type === 'blog') {
      const updated = {
        ...(currentTarget.raw as any),
        seoTitle: title,
        metaDescription,
        h1,
        canonicalUrl,
        focusKeyword,
        ogTitle,
        ogDescription,
        ogImage,
      };
      saveBlogPost(updated);
    }

    setMessage(`SEO configuration saved for ${currentTarget.title}`);
    setTimeout(() => setMessage(null), 3000);
  };

  // Live SEO Quality Warnings
  const titleLength = title.length;
  const descLength = metaDescription.length;
  const hasKeywordInTitle = focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase());
  const hasKeywordInDesc =
    focusKeyword && metaDescription.toLowerCase().includes(focusKeyword.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Search className="w-7 h-7 text-indigo-400" />
            <span>Master SEO Manager & SERP Previewer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fine-tune title tags, meta descriptions, canonical URLs, and preview Google search snippets in real time.
          </p>
        </div>

        {/* Page Switcher */}
        <div className="w-full sm:w-80">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Select Page / Route to Optimize
          </label>
          <select
            value={selectedKey}
            onChange={(e) => handleSelectTarget(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          >
            {allTargets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} (/{item.slug})
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Form & SERP Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: SEO Meta Input Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
          <form onSubmit={handleSave} className="space-y-4">
            {/* Focus Keyword */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Focus Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g., digital marketing agency delhi"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            {/* SEO Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  SEO Title Tag (<code className="text-indigo-400">&lt;title&gt;</code>)
                </label>
                <span
                  className={`text-[11px] font-bold ${
                    titleLength >= 50 && titleLength <= 60
                      ? 'text-emerald-400'
                      : titleLength > 60
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}
                >
                  {titleLength} / 60 characters {titleLength > 60 ? '(Will Truncate)' : ''}
                </span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Meta Description (<code className="text-indigo-400">&lt;meta name=&quot;description&quot;&gt;</code>)
                </label>
                <span
                  className={`text-[11px] font-bold ${
                    descLength >= 140 && descLength <= 160
                      ? 'text-emerald-400'
                      : descLength > 160
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}
                >
                  {descLength} / 160 characters (Optimal: 140–160)
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            {/* H1 Headline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary H1 Headline
              </label>
              <input
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Canonical URL
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
              />
            </div>

            {/* Indexing Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isIndexableCheckbox"
                checked={isIndexable}
                onChange={(e) => setIsIndexable(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <label htmlFor="isIndexableCheckbox" className="text-xs text-slate-300 cursor-pointer">
                Allow Search Engines to Index this Page (index, follow)
              </label>
            </div>

            {/* OpenGraph & Social Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Social Media / Open Graph Sharing
              </span>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">OG Share Title (Fallback to Title if blank)</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder={title}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">OG Share Image URL</label>
                <input
                  type="url"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://mediamozak.com/og-image.jpg"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/50"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply SEO Tags</span>
            </button>
          </form>
        </div>

        {/* Right 5 Cols: SERP Snippet Preview & Real-Time Audit */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Google Search Result Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Google SERP Live Simulator</span>
              </span>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`px-2.5 py-1 rounded ${
                    devicePreview === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`px-2.5 py-1 rounded ${
                    devicePreview === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google Search Result Box (Accurate Google Dark UI styling) */}
            <div
              className={`p-4 bg-[#202124] rounded-xl border border-slate-700/60 font-sans space-y-1 ${
                devicePreview === 'mobile' ? 'max-w-[340px] mx-auto' : ''
              }`}
            >
              {/* Site URL & Breadcrumb */}
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-indigo-400">
                  M
                </div>
                <div className="truncate">
                  <span className="text-[#bdc1c6] text-[12px] block leading-tight font-medium">Mediamozak</span>
                  <span className="text-[#9aa0a6] text-[11px] block leading-tight truncate">
                    https://mediamozak.com &gt; {currentTarget.slug || 'home'}
                  </span>
                </div>
              </div>

              {/* Title Link */}
              <div className="pt-1">
                <h4 className="text-[#8ab4f8] hover:underline text-base sm:text-lg font-normal leading-snug cursor-pointer line-clamp-2">
                  {title || 'Page Title Placeholder'}
                </h4>
              </div>

              {/* Meta Description Snippet */}
              <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2 pt-0.5">
                {metaDescription || 'No description provided. Search engines will extract random copy from the page content.'}
              </p>
            </div>
          </div>

          {/* Real-time Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Real-Time SEO Quality Checks
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {titleLength >= 45 && titleLength <= 65 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-300">
                  Title length: {titleLength} chars (Recommended: 50–60)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {descLength >= 120 && descLength <= 165 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-300">
                  Meta description: {descLength} chars (Recommended: 140–160)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasKeywordInTitle ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-300">
                  Keyword &quot;{focusKeyword}&quot; in Title Tag
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasKeywordInDesc ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-300">
                  Keyword &quot;{focusKeyword}&quot; in Meta Description
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isIndexable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="text-slate-300">
                  Robots directive: {isIndexable ? 'index, follow' : 'noindex (Hidden from Search)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

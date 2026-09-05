import React, { useState } from 'react';
import { FileText, Plus, Edit2, Trash2, CheckCircle2, Eye, Save, X, ExternalLink } from 'lucide-react';
import { getPages, savePage, deletePage } from '../services/storage';
import { Page } from '../types';

export const AdminPagesCMS: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [pages, setPages] = useState<Page[]>(getPages());
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => {
    setPages(getPages());
  };

  const handleCreateNew = () => {
    const newP: Page = {
      id: `page-${Date.now()}`,
      title: 'New Custom Page',
      slug: 'new-page',
      h1: 'New Page Headline',
      seoTitle: 'New Custom Page | Mediamozak Marketing Agency',
      metaDescription: 'Strategic digital marketing services provided by Mediamozak Marketing Agency in Delhi.',
      content: 'Page content goes here.',
      status: 'draft',
      updatedAt: new Date().toISOString().slice(0, 10),
      isIndexable: true,
    };
    setEditingPage(newP);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    // Clean slug
    const cleanedSlug = editingPage.slug.trim().toLowerCase().replace(/^\/+/, '').replace(/\s+/g, '-');
    const toSave: Page = {
      ...editingPage,
      slug: cleanedSlug || 'page',
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    savePage(toSave);
    refresh();
    setEditingPage(null);
    setIsCreating(false);
    setMessage('Page saved successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the page "${title}"?`)) {
      deletePage(id);
      refresh();
      setMessage('Page deleted.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-400" />
            <span>Pages CMS & SEO Metadata</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure all public website pages, meta descriptions, slugs, and indexing directives.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-lg shadow-indigo-950/50"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Editing Modal or Inline Panel */}
      {editingPage && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">
              {isCreating ? 'Create New Page' : `Edit Page: ${editingPage.title}`}
            </h2>
            <button
              onClick={() => {
                setEditingPage(null);
                setIsCreating(false);
              }}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Page Title</label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
                  <span className="text-slate-500">mediamozak.com/</span>
                  <input
                    type="text"
                    required
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="flex-1 bg-transparent text-white focus:outline-none pl-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary H1</label>
                <input
                  type="text"
                  value={editingPage.h1 || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, h1: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Publication Status</label>
                <select
                  value={editingPage.status}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, status: e.target.value as 'published' | 'draft' })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="published">Published (Live)</option>
                  <option value="draft">Draft (Private)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Meta Description (SEO)</label>
                <span
                  className={`text-[11px] ${
                    editingPage.metaDescription.length >= 120 && editingPage.metaDescription.length <= 160
                      ? 'text-emerald-400 font-semibold'
                      : 'text-amber-400'
                  }`}
                >
                  {editingPage.metaDescription.length} / 160 chars (Recommended: 140–160)
                </span>
              </div>
              <textarea
                rows={2}
                value={editingPage.metaDescription}
                onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Page Body Content</label>
              <textarea
                rows={5}
                value={editingPage.content}
                onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="pageIsIndexable"
                checked={editingPage.isIndexable}
                onChange={(e) => setEditingPage({ ...editingPage, isIndexable: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <label htmlFor="pageIsIndexable" className="text-xs text-slate-300 cursor-pointer">
                Allow Search Engines to Index this Page (index, follow)
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setEditingPage(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Page</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800">
          {pages.map((page) => (
            <div key={page.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-850 transition-colors">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{page.title}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      page.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {page.status}
                  </span>
                  {page.isIndexable ? (
                    <span className="text-[10px] text-slate-500">index, follow</span>
                  ) : (
                    <span className="text-[10px] text-rose-400">noindex</span>
                  )}
                </div>

                <div className="text-xs font-mono text-indigo-300 truncate">
                  /{page.slug === 'home' ? '' : page.slug}
                </div>

                <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                  {page.metaDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate(page.slug === 'home' ? '/' : `/${page.slug}`)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="View Live Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingPage(page);
                    setIsCreating(false);
                  }}
                  className="p-2 rounded-lg bg-slate-800 text-indigo-400 hover:bg-slate-700"
                  title="Edit Page"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {/* Prevent deleting core home/about/services/contact */}
                {!['page-home', 'page-about', 'page-services', 'page-contact', 'page-blog'].includes(page.id) && (
                  <button
                    onClick={() => handleDelete(page.id, page.title)}
                    className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20"
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

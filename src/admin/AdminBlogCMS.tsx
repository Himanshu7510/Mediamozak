import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle2, Save, X, ExternalLink, Calendar } from 'lucide-react';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../services/storage';
import { BlogPost } from '../types';

export const AdminBlogCMS: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts());
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => setPosts(getBlogPosts());

  const handleCreateNew = () => {
    const newP: BlogPost = {
      id: `post-${Date.now()}`,
      title: 'New Strategic Guide for Delhi Businesses',
      slug: 'new-strategic-guide-delhi',
      h1: 'New Strategic Guide for Delhi Businesses',
      author: 'Mediamozak Strategy Team',
      category: 'Performance Marketing',
      tags: ['Marketing Strategy', 'Delhi NCR', 'Growth'],
      publishedAt: new Date().toISOString().slice(0, 10),
      readingTimeMinutes: 5,
      excerpt: 'Actionable strategies for improving conversion efficiency and pipeline growth.',
      content: `## Executive Summary\n\nExplain the commercial challenge and business context here.\n\n## Strategic Execution Steps\n\n1. Audit high-intent queries\n2. Tighten CPA bidding caps\n3. Build dedicated landing pages`,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      featuredImageAlt: 'Digital marketing performance analysis',
      status: 'published',
      seoTitle: 'New Strategic Guide | Mediamozak Marketing Agency',
      metaDescription: 'Read the latest strategic marketing insights from Mediamozak Marketing Agency in West Delhi.',
    };
    setEditingPost(newP);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const cleanedSlug = editingPost.slug.trim().toLowerCase().replace(/^\/+/, '').replace(/\s+/g, '-');
    const toSave: BlogPost = {
      ...editingPost,
      slug: cleanedSlug || `post-${Date.now()}`,
    };

    saveBlogPost(toSave);
    refresh();
    setEditingPost(null);
    setIsCreating(false);
    setMessage('Article published/updated successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      refresh();
      setMessage('Article deleted.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-400" />
            <span>Blog CMS & Editorial Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish educational guides, local SEO playbooks, and case study breakdowns to capture organic search traffic.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-lg shadow-indigo-950/50"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Editing Form */}
      {editingPost && (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">
              {isCreating ? 'Write New Article' : `Edit Article: ${editingPost.title}`}
            </h2>
            <button onClick={() => setEditingPost(null)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title (H1)</label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value, h1: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
                  <span className="text-slate-500">mediamozak.com/blog/</span>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="flex-1 bg-transparent text-white focus:outline-none pl-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Author Name</label>
                <input
                  type="text"
                  required
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Publication Status</label>
                <select
                  value={editingPost.status}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, status: e.target.value as 'published' | 'draft' })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Featured Image & Excerpt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  required
                  value={editingPost.featuredImage}
                  onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image Alt Text (SEO)</label>
                <input
                  type="text"
                  value={editingPost.featuredImageAlt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, featuredImageAlt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* SEO Meta Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Search Engine Optimization Fields
              </span>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300">SEO Title</label>
                  <span className="text-[11px] text-slate-400">{(editingPost.seoTitle || '').length} chars</span>
                </div>
                <input
                  type="text"
                  value={editingPost.seoTitle || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300">Meta Description</label>
                  <span className="text-[11px] text-slate-400">{(editingPost.metaDescription || '').length} chars</span>
                </div>
                <textarea
                  rows={2}
                  value={editingPost.metaDescription || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, metaDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Markdown Body */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Article Body Content (Markdown Supported)
              </label>
              <textarea
                rows={10}
                required
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Article</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800">
          {posts.map((post) => (
            <div key={post.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-850 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-12 object-cover rounded-lg bg-slate-950 shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white truncate">{post.title}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="text-indigo-400 font-semibold">{post.category}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="View Live Article"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setIsCreating(false);
                  }}
                  className="p-2 rounded-lg bg-slate-800 text-indigo-400 hover:bg-slate-700"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

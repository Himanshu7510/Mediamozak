import React, { useState } from 'react';
import { Briefcase, Edit2, Save, X, ExternalLink, CheckCircle2, Plus, Trash2, ArrowRight } from 'lucide-react';
import { getServices, saveService } from '../services/storage';
import { Service } from '../types';

export const AdminServicesCMS: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [services, setServices] = useState<Service[]>(getServices());
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => setServices(getServices());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    saveService(editingService);
    refresh();
    setEditingService(null);
    setMessage('Service saved successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  // Helper to handle list modifications (benefits, strategy, deliverables, faqs)
  const updateBenefit = (index: number, val: string) => {
    if (!editingService) return;
    const next = [...editingService.benefits];
    next[index] = val;
    setEditingService({ ...editingService, benefits: next });
  };

  const addBenefit = () => {
    if (!editingService) return;
    setEditingService({ ...editingService, benefits: [...editingService.benefits, 'New benefit outcome'] });
  };

  const removeBenefit = (index: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      benefits: editingService.benefits.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-indigo-400" />
            <span>Services CMS & Growth Practices</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Edit full copy, deliverables, SEO titles, process steps, and FAQs for all 7 service practices.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Editing Form */}
      {editingService && (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Edit Service: {editingService.name}</h2>
              <span className="text-xs font-mono text-indigo-400">/services/{editingService.slug}</span>
            </div>
            <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Display Name</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingService.slug}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Title (Title Tag)</label>
                <input
                  type="text"
                  required
                  value={editingService.seoTitle}
                  onChange={(e) => setEditingService({ ...editingService, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary H1 Headline</label>
                <input
                  type="text"
                  required
                  value={editingService.h1}
                  onChange={(e) => setEditingService({ ...editingService, h1: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Meta Description</label>
                <span className="text-[11px] text-slate-400">
                  {editingService.metaDescription.length} chars (Target: 140–160)
                </span>
              </div>
              <textarea
                rows={2}
                value={editingService.metaDescription}
                onChange={(e) => setEditingService({ ...editingService, metaDescription: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Card Description</label>
              <textarea
                rows={2}
                value={editingService.shortDescription}
                onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Service Overview</label>
              <textarea
                rows={4}
                value={editingService.overview}
                onChange={(e) => setEditingService({ ...editingService, overview: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
              />
            </div>

            {/* Benefits Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">Key Commercial Benefits</label>
                <button
                  type="button"
                  onClick={addBenefit}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Benefit
                </button>
              </div>
              <div className="space-y-2">
                {editingService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => updateBenefit(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(idx)}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Service Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  /services/{srv.slug}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  {srv.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{srv.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-3 mb-4">{srv.shortDescription}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => navigate(`/services/${srv.slug}`)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <button
                onClick={() => setEditingService(srv)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/30"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Practice</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

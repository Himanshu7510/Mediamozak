import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Search, Copy, Check, Trash2, Edit2, Save, X } from 'lucide-react';
import { getMediaItems, saveMediaItem, deleteMediaItem } from '../services/storage';
import { MediaItem } from '../types';

export const AdminMediaLibrary: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>(getMediaItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const refresh = () => setItems(getMediaItems());

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    saveMediaItem(editingItem);
    refresh();
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this media asset?')) {
      deleteMediaItem(id);
      refresh();
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) return;

    const item: MediaItem = {
      id: `media-${Date.now()}`,
      title: newTitle,
      url: newUrl,
      altText: newAlt || newTitle,
      uploadedAt: new Date().toISOString().slice(0, 10),
      mimeType: 'image/jpeg',
    };

    saveMediaItem(item);
    refresh();
    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    setNewAlt('');
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ImageIcon className="w-7 h-7 text-indigo-400" />
            <span>Media Assets & Image Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain marketing photography, banners, OG preview assets, and SEO alt texts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-lg shadow-indigo-950/50"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter media by title or alt text..."
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 max-w-lg shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Add Image / Asset</h3>
            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleAddItem} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Asset Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Performance Dashboard Chart"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Direct Image URL</label>
              <input
                type="url"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">SEO Alt Text (Mandatory for Accessibility)</label>
              <input
                type="text"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                placeholder="Descriptive text for Google Image Indexing"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
              >
                Save Asset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Alt Text Modal */}
      {editingItem && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 max-w-lg shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Edit Media: {editingItem.title}</h3>
            <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Title</label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Alt Text</label>
              <input
                type="text"
                required
                value={editingItem.altText}
                onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
              <input
                type="url"
                required
                value={editingItem.url}
                onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl"
              >
                Update Metadata
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
          >
            <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">Alt: {item.altText}</p>
              <div className="text-[10px] text-slate-500">{item.uploadedAt}</div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1"
                  title="Copy URL"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    title="Edit Metadata"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

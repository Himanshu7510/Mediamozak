import React, { useState } from 'react';
import { ArrowRightLeft, Plus, Trash2, CheckCircle2, AlertTriangle, Save, X } from 'lucide-react';
import { getRedirects, saveRedirect, deleteRedirect } from '../services/storage';
import { RedirectRule } from '../types';

export const AdminRedirectManager: React.FC = () => {
  const [redirects, setRedirects] = useState<RedirectRule[]>(getRedirects());
  const [sourcePath, setSourcePath] = useState('');
  const [destinationPath, setDestinationPath] = useState('');
  const [statusCode, setStatusCode] = useState<301 | 302>(301);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => setRedirects(getRedirects());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const src = sourcePath.trim().toLowerCase();
    const dst = destinationPath.trim().toLowerCase();

    if (!src || !dst) return;

    // Loop prevention check
    if (src === dst) {
      setError('Redirect loop detected: Source and Destination cannot be identical.');
      return;
    }

    // Check if destination already redirects back to source
    const inverse = redirects.find((r) => r.sourcePath === dst && r.destinationPath === src);
    if (inverse) {
      setError(`Infinite loop risk: Rule already exists from "${dst}" to "${src}".`);
      return;
    }

    const s = src.startsWith('/') ? src : `/${src}`;
    const d = dst.startsWith('/') || dst.startsWith('http') ? dst : `/${dst}`;

    const newRule: RedirectRule = {
      id: `redir-${Date.now()}`,
      source: s,
      destination: d,
      sourcePath: s,
      destinationPath: d,
      statusCode,
      isActive: true,
      hits: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    saveRedirect(newRule);
    refresh();
    setSourcePath('');
    setDestinationPath('');
    setMessage('Redirect rule successfully added!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id: string) => {
    deleteRedirect(id);
    refresh();
  };

  const handleToggle = (rule: RedirectRule) => {
    saveRedirect({ ...rule, isActive: !rule.isActive });
    refresh();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <ArrowRightLeft className="w-7 h-7 text-indigo-400" />
          <span>URL Redirect Manager (301 & 302)</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Maintain SEO link equity when restructuring services or migrating legacy paths with built-in infinite loop prevention.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Redirect Form */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Create New Redirect Rule
        </h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end text-xs">
          <div className="sm:col-span-4">
            <label className="block text-slate-400 mb-1">Source Path (Old URL)</label>
            <input
              type="text"
              required
              value={sourcePath}
              onChange={(e) => setSourcePath(e.target.value)}
              placeholder="/old-service-url"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-slate-400 mb-1">Destination Path (New URL)</label>
            <input
              type="text"
              required
              value={destinationPath}
              onChange={(e) => setDestinationPath(e.target.value)}
              placeholder="/services/seo-services-delhi"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 mb-1">HTTP Status</label>
            <select
              value={statusCode}
              onChange={(e) => setStatusCode(Number(e.target.value) as 301 | 302)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold"
            >
              <option value={301}>301 (Permanent)</option>
              <option value={302}>302 (Temporary)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rule</span>
            </button>
          </div>
        </form>
      </div>

      {/* Redirects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800">
          {redirects.map((r) => (
            <div key={r.id} className="p-4 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 min-w-0 font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-400 font-bold">
                  {r.statusCode}
                </span>
                <span className="text-white truncate">{r.sourcePath}</span>
                <span className="text-slate-500">→</span>
                <span className="text-emerald-400 truncate">{r.destinationPath}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleToggle(r)}
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                    r.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {r.isActive ? 'Active' : 'Disabled'}
                </button>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400"
                  title="Remove Redirect"
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

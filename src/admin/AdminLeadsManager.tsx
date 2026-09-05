import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Download,
  Filter,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { getLeads, updateLead, deleteLead, exportLeadsToCsv } from '../services/storage';
import { Lead } from '../types';

export const AdminLeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);

  const refresh = () => {
    const updated = getLeads();
    setLeads(updated);
    if (selectedLead) {
      const match = updated.find((l) => l.id === selectedLead.id);
      setSelectedLead(match || updated[0] || null);
    }
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    updateLead(leadId, { status: newStatus });
    refresh();
  };

  const handleNotesChange = (leadId: string, notes: string) => {
    updateLead(leadId, { notes });
    refresh();
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this lead?')) {
      deleteLead(leadId);
      refresh();
    }
  };

  const handleExportCsv = () => {
    const csvContent = exportLeadsToCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `mediamozak_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.service && l.service.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Inbox className="w-7 h-7 text-indigo-400" />
            <span>Lead & Inquiry Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time pipeline from website forms, consultation modals, and phone/WhatsApp contacts.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export All Leads (CSV)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'new', 'contacted', 'qualified', 'converted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Leads List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leads Table / List */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredLeads.length} inquiries</span>
            <span>Click row to view full details & notes</span>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No inquiries found matching your filter criteria.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80 max-h-[620px] overflow-y-auto">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedLead?.id === lead.id
                      ? 'bg-indigo-950/40 border-l-4 border-indigo-500'
                      : 'hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{lead.name}</span>
                      {lead.company && (
                        <span className="text-xs text-slate-400">({lead.company})</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : lead.status === 'qualified'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                          : lead.status === 'converted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="font-mono text-indigo-300">{lead.phone}</span>
                    <span className="truncate">{lead.service || 'General Consultation'}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{lead.message}</p>

                  <div className="text-[10px] text-slate-500 mt-2 flex items-center justify-between">
                    <span>Source: {lead.page || '/'}</span>
                    <span>{new Date(lead.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Lead Inspector */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl sticky top-6">
          {selectedLead ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-400">{selectedLead.company || 'Individual / Unspecified Company'}</p>
                </div>

                <button
                  onClick={() => handleDelete(selectedLead.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Pipeline Stage
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="new">New (Needs Response)</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified Opportunity</option>
                  <option value="converted">Converted Client</option>
                  <option value="closed">Closed / Archive</option>
                </select>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone Number:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedLead.phone.replace(/\s+/g, '')}`}
                      className="text-white font-mono hover:text-indigo-400 flex items-center gap-1 font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email Address:</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-white hover:text-indigo-400 flex items-center gap-1 truncate max-w-[200px]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selectedLead.email}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service Interest:</span>
                  <span className="text-indigo-300 font-semibold">{selectedLead.service || 'General'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Page Received:</span>
                  <span className="text-slate-300 font-mono">{selectedLead.page}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-400">{new Date(selectedLead.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Inquiry Message
                </label>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed max-h-32 overflow-y-auto">
                  {selectedLead.message || 'No message provided.'}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Agency Internal Follow-Up Notes
                </label>
                <textarea
                  rows={3}
                  value={selectedLead.notes || ''}
                  onChange={(e) => handleNotesChange(selectedLead.id, e.target.value)}
                  placeholder="Record call logs, proposed budgets, or next action dates..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Quick Communication Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedLead.name}, this is Mediamozak Marketing Agency regarding your consultation inquiry.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 font-semibold text-xs border border-emerald-800 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Lead</span>
                </a>

                <a
                  href={`tel:${selectedLead.phone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>Call Direct</span>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select an inquiry from the left to inspect and take action.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

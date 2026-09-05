import React from 'react';
import {
  Inbox,
  Briefcase,
  BookOpen,
  Activity,
  ArrowRight,
  TrendingUp,
  PlusCircle,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { getServices, getBlogPosts, getPages, getLeads, auditSeoHealth, getSettings } from '../services/storage';
import { AdminTab } from './AdminLayout';

interface AdminDashboardProps {
  onSelectTab: (tab: AdminTab) => void;
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectTab, navigate }) => {
  const services = getServices();
  const blogs = getBlogPosts();
  const pages = getPages();
  const leads = getLeads();
  const seoAudit = auditSeoHealth();
  const settings = getSettings();

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const publishedServicesCount = services.filter((s) => s.status === 'published').length;
  const publishedBlogsCount = blogs.filter((b) => b.status === 'published').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Admin Control Center</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome, Agency Administrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Managing <strong className="text-slate-200">Mediamozak Marketing Agency</strong> in Hari Nagar, West Delhi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('leads')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-950/50"
          >
            <Inbox className="w-4 h-4" />
            <span>Manage Leads ({newLeadsCount} New)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Leads */}
        <div
          onClick={() => onSelectTab('leads')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{leads.length}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                +{newLeadsCount} new
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">From website forms & WhatsApp</p>
        </div>

        {/* Card 2: SEO Health */}
        <div
          onClick={() => onSelectTab('seo-health')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SEO Health Score</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold ${seoAudit.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {seoAudit.score}%
            </span>
            <span className="text-xs text-slate-400">
              ({seoAudit.issues.length} audit notes)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Live scan of all titles, descriptions & H1s</p>
        </div>

        {/* Card 3: Core Services */}
        <div
          onClick={() => onSelectTab('services')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Services CMS</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{publishedServicesCount}</span>
            <span className="text-xs text-slate-400">Active Practices</span>
          </div>
          <p className="text-[11px] text-slate-500">SEO, Q-Commerce, Performance, etc.</p>
        </div>

        {/* Card 4: Blog Posts */}
        <div
          onClick={() => onSelectTab('blog')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blog Articles</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{publishedBlogsCount}</span>
            <span className="text-xs text-slate-400">Published</span>
          </div>
          <p className="text-[11px] text-slate-500">Driving organic topical authority</p>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Customer Inquiries</h2>
              <p className="text-xs text-slate-400">Latest business inquiries needing review & follow-up.</p>
            </div>
            <button
              onClick={() => onSelectTab('leads')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View Full Pipeline ({leads.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {leads.slice(0, 4).map((lead) => (
              <div key={lead.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white truncate">{lead.name}</span>
                    <span className="text-xs text-slate-400 truncate">({lead.company || 'Direct Client'})</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : lead.status === 'qualified'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{lead.message}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span>{lead.phone}</span>
                    <span>•</span>
                    <span>{lead.email}</span>
                    <span>•</span>
                    <span>{lead.page}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-900/60 hover:bg-emerald-900"
                    title="Message on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Quick CMS Operations</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onSelectTab('blog')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-between border border-slate-700/60"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-indigo-400" />
                  <span>Publish New Blog Article</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => onSelectTab('services')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-between border border-slate-700/60"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Edit Services & Deliverables</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => onSelectTab('seo-manager')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-between border border-slate-700/60"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Inspect Meta Tags & SERP Preview</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => onSelectTab('whatsapp')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-between border border-slate-700/60"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Configure WhatsApp Number & Msg</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Agency Details Summary */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 text-xs space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Business Contact</span>
            <div className="text-slate-300 space-y-1">
              <div><strong className="text-white">Agency:</strong> {settings.agencyName}</div>
              <div><strong className="text-white">Phone/WA:</strong> {settings.phone}</div>
              <div><strong className="text-white">Office:</strong> {settings.address}, {settings.city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

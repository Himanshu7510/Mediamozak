import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BookOpen,
  Image,
  Inbox,
  Search,
  Activity,
  ArrowRightLeft,
  Settings,
  MessageSquare,
  BarChart,
  FileCode,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';

export type AdminTab =
  | 'dashboard'
  | 'pages'
  | 'services'
  | 'blog'
  | 'media'
  | 'leads'
  | 'seo-manager'
  | 'seo-health'
  | 'redirects'
  | 'settings'
  | 'whatsapp'
  | 'analytics'
  | 'sitemap-robots';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  navigate,
  children,
}) => {
  const { user, logout } = useAdminAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { tab: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { tab: 'pages', label: 'Pages CMS', icon: <FileText className="w-4 h-4" /> },
    { tab: 'services', label: 'Services CMS', icon: <Briefcase className="w-4 h-4" /> },
    { tab: 'blog', label: 'Blog CMS', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'media', label: 'Media Library', icon: <Image className="w-4 h-4" /> },
    { tab: 'leads', label: 'Lead Manager', icon: <Inbox className="w-4 h-4" /> },
    { tab: 'seo-manager', label: 'SEO Manager', icon: <Search className="w-4 h-4" /> },
    { tab: 'seo-health', label: 'SEO Health Audit', icon: <Activity className="w-4 h-4" /> },
    { tab: 'redirects', label: 'Redirect Manager', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { tab: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
    { tab: 'whatsapp', label: 'WhatsApp Settings', icon: <MessageSquare className="w-4 h-4" /> },
    { tab: 'analytics', label: 'Analytics IDs', icon: <BarChart className="w-4 h-4" /> },
    { tab: 'sitemap-robots', label: 'Sitemap & Robots', icon: <FileCode className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: AdminTab) => {
    onSelectTab(tab);
    setMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            M
          </div>
          <div>
            <span className="font-bold text-sm text-white block">MEDIAMOZAK</span>
            <span className="text-[10px] text-slate-400 block -mt-1">Admin CMS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between shrink-0 z-40 ${
          mobileSidebarOpen
            ? 'fixed inset-y-0 left-0 flex'
            : 'hidden lg:flex sticky top-0 h-screen'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-base shadow-md">
                M
              </div>
              <div>
                <span className="font-extrabold text-sm text-white tracking-tight block">
                  MEDIAMOZAK
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block">
                  Agency CMS
                </span>
              </div>
            </div>

            {mobileSidebarOpen && (
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-1 flex-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Content & Operations
            </div>
            {navItems.map((item) => (
              <button
                key={item.tab}
                id={`admin-nav-${item.tab}`}
                onClick={() => handleTabClick(item.tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                  currentTab === item.tab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <span className={currentTab === item.tab ? 'text-white' : 'text-indigo-400'}>
                  {item.icon}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {currentTab === item.tab && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </button>
            ))}
          </div>

          {/* User Profile & Actions Footer */}
          <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/40">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="truncate">
                <span className="font-bold text-slate-200 block truncate">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-slate-400 block truncate">{user?.email || 'admin@mediamozak.com'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                Active
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <ExternalLink className="w-3 h-3 text-indigo-400" />
                <span>Live Site</span>
              </button>

              <button
                id="admin-logout-btn"
                onClick={handleLogout}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs border border-rose-500/20 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

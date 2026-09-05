import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminLayout, AdminTab } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminPagesCMS } from './AdminPagesCMS';
import { AdminServicesCMS } from './AdminServicesCMS';
import { AdminBlogCMS } from './AdminBlogCMS';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminLeadsManager } from './AdminLeadsManager';
import { AdminSeoManager } from './AdminSeoManager';
import { AdminSeoHealth } from './AdminSeoHealth';
import { AdminRedirectManager } from './AdminRedirectManager';
import { AdminSettings } from './AdminSettings';
import { AdminWhatsAppSettings } from './AdminWhatsAppSettings';
import { AdminAnalyticsManager } from './AdminAnalyticsManager';
import { AdminSitemapRobots } from './AdminSitemapRobots';

interface AdminPortalProps {
  initialTab?: AdminTab;
  navigate: (path: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ initialTab = 'dashboard', navigate }) => {
  const { isAuthenticated } = useAdminAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>(initialTab);

  if (!isAuthenticated) {
    return <AdminLoginPage navigate={navigate} />;
  }

  return (
    <AdminLayout currentTab={currentTab} onSelectTab={setCurrentTab} navigate={navigate}>
      {currentTab === 'dashboard' && (
        <AdminDashboard onSelectTab={setCurrentTab} navigate={navigate} />
      )}
      {currentTab === 'pages' && <AdminPagesCMS navigate={navigate} />}
      {currentTab === 'services' && <AdminServicesCMS navigate={navigate} />}
      {currentTab === 'blog' && <AdminBlogCMS navigate={navigate} />}
      {currentTab === 'media' && <AdminMediaLibrary />}
      {currentTab === 'leads' && <AdminLeadsManager />}
      {currentTab === 'seo-manager' && <AdminSeoManager />}
      {currentTab === 'seo-health' && <AdminSeoHealth />}
      {currentTab === 'redirects' && <AdminRedirectManager />}
      {currentTab === 'settings' && <AdminSettings />}
      {currentTab === 'whatsapp' && <AdminWhatsAppSettings />}
      {currentTab === 'analytics' && <AdminAnalyticsManager />}
      {currentTab === 'sitemap-robots' && <AdminSitemapRobots />}
    </AdminLayout>
  );
};

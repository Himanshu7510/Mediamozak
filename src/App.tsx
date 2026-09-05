import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { ConsultationModal } from './components/common/ConsultationModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapViewPage } from './pages/SitemapViewPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AdminAuthProvider } from './admin/AdminAuthContext';
import { AdminPortal } from './admin/AdminPortal';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { getRedirects, getPages } from './services/storage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string | undefined>(undefined);

  // Router navigation helper
  const navigate = useCallback((path: string) => {
    // Check 301/302 Redirect Rules first
    const cleanPath = path.replace(/\/$/, '') || '/';
    const redirects = getRedirects();
    const activeRule = redirects.find(
      (r) =>
        (r.isActive !== false) &&
        (r.source === cleanPath || r.sourcePath === cleanPath || r.source === path || r.sourcePath === path)
    );

    const targetPath = activeRule ? (activeRule.destination || activeRule.destinationPath || path) : path;

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(targetPath);
  }, []);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen for custom trigger to open consultation modal
  useEffect(() => {
    const handleOpenModal = (e: any) => {
      setConsultationService(e.detail?.service);
      setConsultationOpen(true);
    };

    window.addEventListener('openConsultationModal', handleOpenModal);
    return () => window.removeEventListener('openConsultationModal', handleOpenModal);
  }, []);

  // Handle consultation open with optional service
  const handleOpenConsultation = (serviceSlug?: string) => {
    setConsultationService(serviceSlug);
    setConsultationOpen(true);
  };

  // Route matching logic
  const normalizedPath = currentPath.replace(/\/$/, '') || '/';

  // Admin Routes Check
  if (normalizedPath.startsWith('/admin')) {
    return (
      <AdminAuthProvider>
        {normalizedPath === '/admin/login' ? (
          <AdminLoginPage navigate={navigate} />
        ) : (
          <AdminPortal navigate={navigate} />
        )}
      </AdminAuthProvider>
    );
  }

  // Determine which page component to render
  let pageContent: React.ReactNode = null;

  if (normalizedPath === '/' || normalizedPath === '/home') {
    pageContent = (
      <HomePage
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  } else if (normalizedPath === '/about' || normalizedPath === '/about-us') {
    pageContent = (
      <AboutPage
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  } else if (normalizedPath === '/services') {
    pageContent = (
      <ServicesIndexPage
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  } else if (normalizedPath.startsWith('/services/')) {
    const slug = normalizedPath.replace('/services/', '');
    pageContent = (
      <ServiceDetailPage
        slug={slug}
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation(slug)}
      />
    );
  } else if (normalizedPath === '/contact' || normalizedPath === '/contact-us') {
    pageContent = <ContactPage navigate={navigate} />;
  } else if (normalizedPath === '/blog') {
    pageContent = <BlogIndexPage navigate={navigate} />;
  } else if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '');
    pageContent = (
      <BlogPostPage
        slug={slug}
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    );
  } else if (normalizedPath === '/privacy-policy') {
    pageContent = <LegalPage type="privacy" navigate={navigate} />;
  } else if (normalizedPath === '/terms-and-conditions') {
    pageContent = <LegalPage type="terms" navigate={navigate} />;
  } else if (normalizedPath === '/sitemap.xml') {
    pageContent = <SitemapViewPage type="sitemap" navigate={navigate} />;
  } else if (normalizedPath === '/robots.txt') {
    pageContent = <SitemapViewPage type="robots" navigate={navigate} />;
  } else {
    // Check if custom page from CMS exists
    const pages = getPages();
    const matchedCustomPage = pages.find(
      (p) => p.status === 'published' && (p.slug === normalizedPath.replace(/^\//, '') || `/${p.slug}` === normalizedPath)
    );

    if (matchedCustomPage) {
      pageContent = (
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {matchedCustomPage.h1 || matchedCustomPage.title}
          </h1>
          <p className="text-slate-400 text-sm">{matchedCustomPage.metaDescription}</p>
          <div className="prose prose-invert text-slate-300 text-sm leading-relaxed whitespace-pre-line pt-4 border-t border-slate-800">
            {matchedCustomPage.content}
          </div>
        </div>
      );
    } else {
      pageContent = <NotFoundPage navigate={navigate} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16 lg:pb-0">
      {/* 1. Universal Top Header */}
      <Header
        currentPath={normalizedPath}
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 2. Page Content */}
      <main className="flex-1">{pageContent}</main>

      {/* 3. Universal SEO & Contact Footer */}
      <Footer navigate={navigate} onOpenConsultation={() => handleOpenConsultation()} />

      {/* 4. Conversion Accelerators: Floating WhatsApp button */}
      <FloatingWhatsApp />

      {/* 5. Mobile Sticky Bottom Navigation */}
      <MobileBottomBar
        currentPath={normalizedPath}
        navigate={navigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 6. Lead Capture Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={consultationService}
        sourcePage={normalizedPath}
      />
    </div>
  );
}

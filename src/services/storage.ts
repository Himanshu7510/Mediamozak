import {
  Service,
  BlogPost,
  PageContent,
  Lead,
  MediaItem,
  RedirectRule,
  WebsiteSettings,
  SeoAuditIssue,
  LeadStatus,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_BLOG_POSTS,
  INITIAL_PAGES,
  INITIAL_LEADS,
  INITIAL_MEDIA,
  INITIAL_REDIRECTS,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'mediamozak_settings',
  SERVICES: 'mediamozak_services',
  BLOGS: 'mediamozak_blogs',
  PAGES: 'mediamozak_pages',
  LEADS: 'mediamozak_leads',
  MEDIA: 'mediamozak_media',
  REDIRECTS: 'mediamozak_redirects',
};

// Event emitter for cross-component reactive updates
type StorageListener = () => void;
const listeners: Set<StorageListener> = new Set();

export function subscribeStorage(listener: StorageListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifySubscribers() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Storage subscriber error:', e);
    }
  });
}

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifySubscribers();
  } catch (e) {
    console.error(`Error saving localStorage key "${key}":`, e);
  }
}

// -------------------------------------------------------------
// SETTINGS
// -------------------------------------------------------------
export function getSettings(): WebsiteSettings {
  return getStoredItem<WebsiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export function saveSettings(settings: WebsiteSettings): void {
  setStoredItem(STORAGE_KEYS.SETTINGS, settings);
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export function getServices(): Service[] {
  return getStoredItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export function getServiceBySlug(slug: string): Service | undefined {
  const services = getServices();
  return services.find((s) => s.slug === slug);
}

export function saveService(service: Service): void {
  const services = getServices();
  const existingIdx = services.findIndex((s) => s.id === service.id || s.slug === service.slug);
  let updated: Service[];
  if (existingIdx >= 0) {
    updated = [...services];
    updated[existingIdx] = { ...service, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    updated = [
      ...services,
      {
        ...service,
        id: service.id || `srv-${Date.now()}`,
        updatedAt: new Date().toISOString().split('T')[0],
      },
    ];
  }
  setStoredItem(STORAGE_KEYS.SERVICES, updated);
}

export function deleteService(id: string): void {
  const services = getServices().filter((s) => s.id !== id);
  setStoredItem(STORAGE_KEYS.SERVICES, services);
}

// -------------------------------------------------------------
// BLOG POSTS
// -------------------------------------------------------------
export function getBlogPosts(): BlogPost[] {
  return getStoredItem<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOG_POSTS);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const existingIdx = posts.findIndex((p) => p.id === post.id);
  let updated: BlogPost[];
  if (existingIdx >= 0) {
    updated = [...posts];
    updated[existingIdx] = post;
  } else {
    updated = [
      {
        ...post,
        id: post.id || `post-${Date.now()}`,
        publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
      },
      ...posts,
    ];
  }
  setStoredItem(STORAGE_KEYS.BLOGS, updated);
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  setStoredItem(STORAGE_KEYS.BLOGS, posts);
}

// -------------------------------------------------------------
// PAGES
// -------------------------------------------------------------
export function getPages(): PageContent[] {
  return getStoredItem<PageContent[]>(STORAGE_KEYS.PAGES, INITIAL_PAGES);
}

export function getPageBySlug(slug: string): PageContent | undefined {
  const pages = getPages();
  return pages.find((p) => p.slug === slug);
}

export function savePage(page: PageContent): void {
  const pages = getPages();
  const existingIdx = pages.findIndex((p) => p.id === page.id || p.slug === page.slug);
  let updated: PageContent[];
  if (existingIdx >= 0) {
    updated = [...pages];
    updated[existingIdx] = { ...page, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    updated = [
      ...pages,
      {
        ...page,
        id: page.id || `page-${Date.now()}`,
        updatedAt: new Date().toISOString().split('T')[0],
      },
    ];
  }
  setStoredItem(STORAGE_KEYS.PAGES, updated);
}

export function deletePage(id: string): void {
  const pages = getPages().filter((p) => p.id !== id);
  setStoredItem(STORAGE_KEYS.PAGES, pages);
}

// -------------------------------------------------------------
// LEADS
// -------------------------------------------------------------
export function getLeads(): Lead[] {
  return getStoredItem<Lead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}

export function addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...leadData,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  setStoredItem(STORAGE_KEYS.LEADS, [newLead, ...leads]);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus, notes?: string): void {
  const leads = getLeads();
  const updated = leads.map((l) => (l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l));
  setStoredItem(STORAGE_KEYS.LEADS, updated);
}

export function updateLead(idOrLead: string | Lead, partial?: Partial<Lead>): void {
  const leads = getLeads();
  if (typeof idOrLead === 'string') {
    const updated = leads.map((l) => (l.id === idOrLead ? { ...l, ...(partial || {}) } : l));
    setStoredItem(STORAGE_KEYS.LEADS, updated);
  } else {
    const updated = leads.map((l) => (l.id === idOrLead.id ? idOrLead : l));
    setStoredItem(STORAGE_KEYS.LEADS, updated);
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter((l) => l.id !== id);
  setStoredItem(STORAGE_KEYS.LEADS, leads);
}

export function exportLeadsToCsv(): string {
  const leads = getLeads();
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Source', 'Page', 'Created At', 'Message', 'Notes'];
  const rows = leads.map((l) => [
    l.id,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email}"`,
    `"${l.phone}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${l.service}"`,
    l.status,
    `"${l.source}"`,
    `"${l.page}"`,
    `"${l.createdAt}"`,
    `"${l.message.replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

// -------------------------------------------------------------
// MEDIA
// -------------------------------------------------------------
export function getMedia(): MediaItem[] {
  return getStoredItem<MediaItem[]>(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
}

export const getMediaItems = getMedia;

export function addMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
  const media = getMedia();
  const newItem: MediaItem = {
    ...item,
    id: `media-${Date.now()}`,
    uploadedAt: new Date().toISOString().split('T')[0],
  };
  setStoredItem(STORAGE_KEYS.MEDIA, [newItem, ...media]);
  return newItem;
}

export function saveMediaItem(item: MediaItem): void {
  const media = getMedia();
  const idx = media.findIndex((m) => m.id === item.id);
  if (idx >= 0) {
    const updated = [...media];
    updated[idx] = item;
    setStoredItem(STORAGE_KEYS.MEDIA, updated);
  } else {
    setStoredItem(STORAGE_KEYS.MEDIA, [item, ...media]);
  }
}

export function deleteMediaItem(id: string): void {
  const media = getMedia().filter((m) => m.id !== id);
  setStoredItem(STORAGE_KEYS.MEDIA, media);
}

// -------------------------------------------------------------
// REDIRECTS
// -------------------------------------------------------------
export function getRedirects(): RedirectRule[] {
  return getStoredItem<RedirectRule[]>(STORAGE_KEYS.REDIRECTS, INITIAL_REDIRECTS);
}

export function saveRedirect(rule: Partial<RedirectRule> & { id?: string; source?: string; destination?: string; sourcePath?: string; destinationPath?: string; statusCode?: 301 | 302; isActive?: boolean }): { success: boolean; error?: string } {
  const src = (rule.source || rule.sourcePath || '').trim();
  const dst = (rule.destination || rule.destinationPath || '').trim();
  const statusCode = rule.statusCode || 301;
  const isActive = rule.isActive !== false;

  // Loop prevention check
  if (src && dst && src === dst) {
    return { success: false, error: 'Source and destination cannot be identical.' };
  }
  const redirects = getRedirects();
  // Check if destination points to source elsewhere
  const loop = redirects.find((r) => (r.source === dst || r.sourcePath === dst) && (r.destination === src || r.destinationPath === src));
  if (loop) {
    return { success: false, error: 'This redirect creates an infinite circular loop with an existing rule.' };
  }

  const existingIdx = rule.id ? redirects.findIndex((r) => r.id === rule.id) : -1;
  let updated: RedirectRule[];
  if (existingIdx >= 0) {
    updated = [...redirects];
    updated[existingIdx] = {
      ...redirects[existingIdx],
      source: src,
      destination: dst,
      sourcePath: src,
      destinationPath: dst,
      statusCode,
      isActive,
    };
  } else {
    updated = [
      ...redirects,
      {
        id: rule.id || `red-${Date.now()}`,
        source: src,
        destination: dst,
        sourcePath: src,
        destinationPath: dst,
        statusCode,
        isActive,
        hits: 0,
        createdAt: new Date().toISOString().split('T')[0],
      },
    ];
  }
  setStoredItem(STORAGE_KEYS.REDIRECTS, updated);
  return { success: true };
}

export function deleteRedirect(id: string): void {
  const redirects = getRedirects().filter((r) => r.id !== id);
  setStoredItem(STORAGE_KEYS.REDIRECTS, redirects);
}

export function matchRedirect(path: string): string | null {
  const redirects = getRedirects();
  const rule = redirects.find((r) => r.source.toLowerCase() === path.toLowerCase());
  if (rule) {
    // Record hit
    rule.hits += 1;
    setStoredItem(STORAGE_KEYS.REDIRECTS, redirects);
    return rule.destination;
  }
  return null;
}

// -------------------------------------------------------------
// SEO HEALTH AUDIT ENGINE
// -------------------------------------------------------------
export function auditSeoHealth(): { score: number; issues: SeoAuditIssue[]; summary: { critical: number; warning: number; info: number } } {
  const issues: SeoAuditIssue[] = [];
  const services = getServices();
  const blogs = getBlogPosts();
  const pages = getPages();

  // Audit Services
  services.forEach((s) => {
    const url = `/services/${s.slug}`;
    if (!s.seoTitle || s.seoTitle.trim().length === 0) {
      issues.push({
        id: `srv-${s.id}-title`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'critical',
        issue: 'Missing SEO Title',
        recommendation: 'Add a distinct title (50-60 characters) targeting commercial search keywords.',
      });
    } else if (s.seoTitle.length < 30) {
      issues.push({
        id: `srv-${s.id}-title-short`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'warning',
        issue: 'SEO Title Too Short (< 30 characters)',
        recommendation: 'Expand title to include secondary commercial keywords and local Delhi context.',
      });
    } else if (s.seoTitle.length > 65) {
      issues.push({
        id: `srv-${s.id}-title-long`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'warning',
        issue: 'SEO Title Exceeds 65 Characters (May Truncate in SERP)',
        recommendation: 'Shorten title to keep the most important keywords visible in Google search results.',
      });
    }

    if (!s.metaDescription || s.metaDescription.trim().length === 0) {
      issues.push({
        id: `srv-${s.id}-desc`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'critical',
        issue: 'Missing Meta Description',
        recommendation: 'Add an action-oriented meta description between 120 and 160 characters.',
      });
    } else if (s.metaDescription.length < 90) {
      issues.push({
        id: `srv-${s.id}-desc-short`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'warning',
        issue: 'Meta Description Too Short (< 90 characters)',
        recommendation: 'Elaborate on the service benefits and clear call-to-action to increase CTR.',
      });
    }

    if (!s.h1 || s.h1.trim().length === 0) {
      issues.push({
        id: `srv-${s.id}-h1`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'critical',
        issue: 'Missing H1 Heading',
        recommendation: 'Ensure each service page contains an explicit primary H1 heading matching the search intent.',
      });
    }

    if (!s.canonicalUrl) {
      issues.push({
        id: `srv-${s.id}-canonical`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'warning',
        issue: 'Missing Explicit Canonical URL',
        recommendation: 'Declare canonical URL to consolidate ranking equity.',
      });
    }

    if (!s.ogImage) {
      issues.push({
        id: `srv-${s.id}-og`,
        pageType: 'service',
        title: s.name,
        url,
        severity: 'info',
        issue: 'No Custom Social Share Image (OG Image)',
        recommendation: 'Set an Open Graph image for richer WhatsApp and social media link previews.',
      });
    }
  });

  // Audit Blog Posts
  blogs.forEach((b) => {
    const url = `/blog/${b.slug}`;
    if (!b.seoTitle) {
      issues.push({
        id: `blog-${b.id}-title`,
        pageType: 'blog',
        title: b.title,
        url,
        severity: 'critical',
        issue: 'Missing SEO Title',
        recommendation: 'Set a compelling article title for search engine result snippets.',
      });
    }
    if (!b.metaDescription) {
      issues.push({
        id: `blog-${b.id}-desc`,
        pageType: 'blog',
        title: b.title,
        url,
        severity: 'critical',
        issue: 'Missing Meta Description',
        recommendation: 'Summarize the article in 140-160 characters with your focus keyword.',
      });
    }
    if (!b.featuredImageAlt) {
      issues.push({
        id: `blog-${b.id}-alt`,
        pageType: 'blog',
        title: b.title,
        url,
        severity: 'warning',
        issue: 'Missing Image Alt Text on Featured Image',
        recommendation: 'Add descriptive alt text to the featured image for Google Image search & accessibility.',
      });
    }
  });

  // Audit Pages
  pages.forEach((p) => {
    const url = p.slug ? `/${p.slug}` : '/';
    if (!p.seoTitle) {
      issues.push({
        id: `page-${p.id}-title`,
        pageType: 'page',
        title: p.title,
        url,
        severity: 'critical',
        issue: 'Missing SEO Title',
        recommendation: 'Add a title to define the page intent clearly.',
      });
    }
    if (!p.metaDescription && p.slug !== 'privacy-policy' && p.slug !== 'terms-and-conditions') {
      issues.push({
        id: `page-${p.id}-desc`,
        pageType: 'page',
        title: p.title,
        url,
        severity: 'critical',
        issue: 'Missing Meta Description',
        recommendation: 'Add a meta description for this core landing page.',
      });
    }
  });

  const critical = issues.filter((i) => i.severity === 'critical').length;
  const warning = issues.filter((i) => i.severity === 'warning').length;
  const info = issues.filter((i) => i.severity === 'info').length;

  // Score computation: base 100, -8 per critical, -3 per warning, -1 per info
  const penalty = critical * 8 + warning * 3 + info * 1;
  const score = Math.max(10, Math.min(100, 100 - penalty));

  return { score, issues, summary: { critical, warning, info } };
}

// -------------------------------------------------------------
// BACKUP & RESTORE
// -------------------------------------------------------------
export function exportEntireDatabaseJson(): string {
  const data = {
    settings: getSettings(),
    services: getServices(),
    blogs: getBlogPosts(),
    pages: getPages(),
    leads: getLeads(),
    media: getMedia(),
    redirects: getRedirects(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabaseJson(jsonString: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.settings) setStoredItem(STORAGE_KEYS.SETTINGS, parsed.settings);
    if (Array.isArray(parsed.services)) setStoredItem(STORAGE_KEYS.SERVICES, parsed.services);
    if (Array.isArray(parsed.blogs)) setStoredItem(STORAGE_KEYS.BLOGS, parsed.blogs);
    if (Array.isArray(parsed.pages)) setStoredItem(STORAGE_KEYS.PAGES, parsed.pages);
    if (Array.isArray(parsed.leads)) setStoredItem(STORAGE_KEYS.LEADS, parsed.leads);
    if (Array.isArray(parsed.media)) setStoredItem(STORAGE_KEYS.MEDIA, parsed.media);
    if (Array.isArray(parsed.redirects)) setStoredItem(STORAGE_KEYS.REDIRECTS, parsed.redirects);
    notifySubscribers();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Invalid JSON format' };
  }
}

export function resetDatabaseToDefaults(): void {
  setStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  setStoredItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setStoredItem(STORAGE_KEYS.BLOGS, INITIAL_BLOG_POSTS);
  setStoredItem(STORAGE_KEYS.PAGES, INITIAL_PAGES);
  setStoredItem(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  setStoredItem(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
  setStoredItem(STORAGE_KEYS.REDIRECTS, INITIAL_REDIRECTS);
  notifySubscribers();
}

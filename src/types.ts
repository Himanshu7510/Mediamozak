export type ServiceSlug =
  | 'digital-marketing'
  | 'social-media-marketing'
  | 'seo'
  | 'performance-marketing'
  | 'q-commerce-marketing'
  | 'e-commerce-marketing'
  | 'lead-generation-marketing'
  | string;

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  slug: ServiceSlug;
  shortDescription: string;
  iconName: string;
  heroHeadline: string;
  heroSubheadline: string;
  overview: string;
  benefits: string[];
  strategy: string[];
  process: ServiceProcessStep[];
  deliverables: ServiceDeliverable[];
  faqs: ServiceFAQ[];
  relatedServiceSlugs: string[];
  // SEO fields
  seoTitle: string;
  metaDescription: string;
  h1: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  focusKeyword?: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt?: string;
  author: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  publishedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  // SEO
  seoTitle: string;
  metaDescription: string;
  h1: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  customJsonLd?: string;
  focusKeyword?: string;
  faqs?: ServiceFAQ[];
  internalLinks?: { anchor: string; url: string }[];
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  seoTitle: string;
  metaDescription: string;
  h1: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  focusKeyword?: string;
  isIndexable?: boolean;
  updatedAt: string;
}

export type Page = PageContent;

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: string;
  page: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name?: string;
  title?: string;
  url: string;
  alt?: string;
  altText?: string;
  caption?: string;
  description?: string;
  type?: string;
  mimeType?: string;
  sizeBytes?: number;
  uploadedAt: string;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  statusCode: 301 | 302;
  hits?: number;
  createdAt: string;
  sourcePath?: string;
  destinationPath?: string;
  isActive?: boolean;
}

export interface WebsiteSettings {
  agencyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // SEO & Analytics
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  defaultRobots: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  metaPixelId: string;
  googleSearchConsoleVerification: string;
  customJsonLd: string;
  robotsTxt: string;
  // Social
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  whatsappTemplates: {
    default: string;
    services: Record<string, string>;
  };
}

export interface SeoAuditIssue {
  id: string;
  pageType: 'service' | 'blog' | 'page';
  title: string;
  url: string;
  severity: 'critical' | 'warning' | 'info';
  issue: string;
  recommendation: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

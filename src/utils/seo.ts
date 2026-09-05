import { WebsiteSettings } from '../types';

interface MetaTagsConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  jsonLd?: object | string;
}

function setMetaTag(nameOrProperty: 'name' | 'property', key: string, content: string): void {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(nameOrProperty, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function updatePageSeo(config: MetaTagsConfig, settings?: WebsiteSettings): void {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = config.title;

  // 2. Meta Description
  setMetaTag('name', 'description', config.description);

  // 3. Robots
  const robots = config.robots || settings?.defaultRobots || 'index, follow';
  setMetaTag('name', 'robots', robots);

  // 4. Canonical URL
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (config.canonicalUrl) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', config.canonicalUrl);
  } else if (canonicalEl) {
    canonicalEl.remove();
  }

  // 5. Open Graph
  const ogTitle = config.ogTitle || config.title;
  const ogDescription = config.ogDescription || config.description;
  const ogImage = config.ogImage || settings?.defaultOgImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
  const ogType = config.ogType || 'website';

  setMetaTag('property', 'og:title', ogTitle);
  setMetaTag('property', 'og:description', ogDescription);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:type', ogType);
  if (config.canonicalUrl) {
    setMetaTag('property', 'og:url', config.canonicalUrl);
  }
  setMetaTag('property', 'og:site_name', settings?.agencyName || 'Mediamozak Marketing Agency');

  // 6. Twitter / X Card
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', config.twitterTitle || ogTitle);
  setMetaTag('name', 'twitter:description', config.twitterDescription || ogDescription);
  setMetaTag('name', 'twitter:image', config.twitterImage || ogImage);

  // 7. Dynamic JSON-LD Schema
  const existingScript = document.getElementById('dynamic-jsonld-schema');
  if (existingScript) existingScript.remove();

  if (config.jsonLd) {
    const script = document.createElement('script');
    script.id = 'dynamic-jsonld-schema';
    script.type = 'application/ld+json';
    try {
      script.textContent = typeof config.jsonLd === 'string' ? config.jsonLd : JSON.stringify(config.jsonLd);
      document.head.appendChild(script);
    } catch (e) {
      console.error('Failed to parse dynamic JSON-LD:', e);
    }
  }
}

// Generate Service Schema
export function generateServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
  faqs?: { question: string; answer: string }[];
}) {
  const schemaList: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: 'MarketingService',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Mediamozak Marketing Agency',
        telephone: '+91 7982984658',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hari Nagar, West Delhi',
          addressLocality: 'Delhi',
          postalCode: '110064',
          addressCountry: 'IN',
        },
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Delhi NCR',
      },
      description: service.description,
      url: `https://mediamozak.com/services/${service.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mediamozak.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://mediamozak.com/services' },
        { '@type': 'ListItem', position: 3, name: service.name, item: `https://mediamozak.com/services/${service.slug}` },
      ],
    },
  ];

  if (service.faqs && service.faqs.length > 0) {
    schemaList.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  return schemaList;
}

// Generate Article Schema for Blog
export function generateArticleSchema(post: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  featuredImage: string;
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      image: post.featuredImage,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Mediamozak Marketing Agency',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mediamozak.com/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://mediamozak.com/blog/${post.slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mediamozak.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mediamozak.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://mediamozak.com/blog/${post.slug}` },
      ],
    },
  ];
}

// Analytics Conversion Tracking Dispatcher
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
    (window as any).dataLayer = dataLayer;
    console.log(`[Analytics Event] ${eventName}:`, params);
  } catch (err) {
    console.warn('Analytics event dispatch error:', err);
  }
}

import { getServices, getBlogPosts, getPages } from '../services/storage';

export function generateSitemapXml(baseUrl: string = 'https://mediamozak.com'): string {
  const services = getServices().filter((s) => s.status === 'published');
  const blogs = getBlogPosts().filter((b) => b.status === 'published');
  const pages = getPages().filter((p) => p.status === 'published');

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Home
  urls.push({
    loc: `${baseUrl}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0',
  });

  // Services Index
  urls.push({
    loc: `${baseUrl}/services`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9',
  });

  // Individual Services
  services.forEach((s) => {
    urls.push({
      loc: `${baseUrl}/services/${s.slug}`,
      lastmod: s.updatedAt || new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // Blog Index
  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.8',
  });

  // Blog Posts
  blogs.forEach((b) => {
    urls.push({
      loc: `${baseUrl}/blog/${b.slug}`,
      lastmod: b.publishedAt || new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7',
    });
  });

  // Core Static Pages
  const staticSlugs = ['about', 'contact', 'privacy-policy', 'terms-and-conditions'];
  staticSlugs.forEach((slug) => {
    const pageObj = pages.find((p) => p.slug === slug);
    urls.push({
      loc: `${baseUrl}/${slug}`,
      lastmod: pageObj?.updatedAt || new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: slug === 'contact' || slug === 'about' ? '0.8' : '0.4',
    });
  });

  const xmlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

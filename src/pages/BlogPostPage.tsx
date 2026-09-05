import React, { useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  ArrowRight,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts, getSettings } from '../services/storage';
import { updatePageSeo, generateArticleSchema, trackEvent } from '../utils/seo';

interface BlogPostPageProps {
  slug: string;
  navigate: (path: string) => void;
  onOpenConsultation: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, navigate, onOpenConsultation }) => {
  const post = getBlogPostBySlug(slug);
  const allPosts = getBlogPosts().filter((p) => p.status === 'published' && p.slug !== slug);
  const settings = getSettings();

  useEffect(() => {
    if (post) {
      updatePageSeo(
        {
          title: post.seoTitle || post.title,
          description: post.metaDescription || post.excerpt,
          canonicalUrl: post.canonicalUrl || `https://mediamozak.com/blog/${post.slug}`,
          ogTitle: post.ogTitle || post.title,
          ogDescription: post.ogDescription || post.excerpt,
          ogImage: post.ogImage || post.featuredImage,
          ogType: 'article',
          twitterTitle: post.twitterTitle || post.title,
          twitterDescription: post.twitterDescription || post.excerpt,
          twitterImage: post.twitterImage || post.featuredImage,
          jsonLd: generateArticleSchema({
            title: post.title,
            description: post.metaDescription || post.excerpt,
            slug: post.slug,
            author: post.author,
            publishedAt: post.publishedAt,
            featuredImage: post.featuredImage,
          }),
        },
        settings
      );
    }
  }, [post, settings]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
        <p className="text-slate-400 mb-6">The requested article has been moved or unpublished.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>
      </div>
    );
  }

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://mediamozak.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} — via Mediamozak Marketing Agency`);

  return (
    <article className="space-y-12 sm:space-y-16 pb-16">
      {/* Article Header & Breadcrumb */}
      <header className="pt-8 sm:pt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-400">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-indigo-400 transition-colors">
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => navigate('/blog')} className="hover:text-indigo-400 transition-colors">
                Blog
              </button>
            </li>
            <li>/</li>
            <li className="text-indigo-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </li>
          </ol>
        </nav>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.h1 || post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 pb-4 border-b border-slate-800">
            <span>By <strong className="text-slate-200">{post.author}</strong></span>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 shadow-2xl">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Main Content Body */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple markdown / structured renderer */}
        <div className="prose prose-invert prose-indigo max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          {post.content.split('\n\n').map((block, idx) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white pt-4 pb-1 border-b border-slate-800/80">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-100 pt-3">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('* ') || block.startsWith('- ')) {
              const items = block.split('\n');
              return (
                <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-300">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^(\*|-)\s+/, '')}</li>
                  ))}
                </ul>
              );
            }
            if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
              const items = block.split('\n');
              return (
                <ol key={idx} className="space-y-2 list-decimal pl-5 text-slate-300">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^\d+\.\s+/, '')}</li>
                  ))}
                </ol>
              );
            }
            if (block.startsWith('```')) {
              const code = block.replace(/```[a-z]*\n/, '').replace(/\n```$/, '');
              return (
                <pre key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 overflow-x-auto font-mono">
                  <code>{code}</code>
                </pre>
              );
            }
            if (block === '---') {
              return <hr key={idx} className="border-slate-800 my-6" />;
            }
            return <p key={idx} className="text-slate-300 leading-relaxed">{block}</p>;
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Tags:
            </span>
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Share this article:</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-900 text-xs font-semibold hover:bg-emerald-900 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              X / Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900 text-xs font-semibold hover:bg-blue-900 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* In-Article Consultation Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need Expert Strategy to Execute These Tactics?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Mediamozak Marketing Agency handles end-to-end SEO, Google Ads, and lead generation for high-growth businesses in Delhi NCR.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all"
            >
              Claim Free Consultation
            </button>
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hi Mediamozak, I read your article "${post.title}" and would like to discuss applying this to my business.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 text-emerald-400 font-semibold text-xs sm:text-sm border border-slate-700 hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {allPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">More Marketing Insights</h3>
            <button
              onClick={() => navigate('/blog')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View All Articles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPosts.slice(0, 2).map((rel) => (
              <div
                key={rel.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{rel.category}</span>
                  <h4 className="text-base font-bold text-white mt-1 mb-2 line-clamp-2">{rel.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{rel.excerpt}</p>
                </div>
                <button
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="pt-4 text-xs font-bold text-indigo-400 hover:underline text-left inline-flex items-center gap-1"
                >
                  Read Article →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

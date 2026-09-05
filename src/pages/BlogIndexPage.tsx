import React, { useEffect, useState } from 'react';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getBlogPosts, getSettings } from '../services/storage';
import { updatePageSeo } from '../utils/seo';

interface BlogIndexPageProps {
  navigate: (path: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ navigate }) => {
  const allPosts = getBlogPosts().filter((p) => p.status === 'published');
  const settings = getSettings();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updatePageSeo(
      {
        title: 'Marketing Insights & SEO Strategies | Mediamozak Agency Blog',
        description:
          'Actionable guides on digital marketing, performance ads, local SEO in Delhi, and quick commerce growth written by Mediamozak strategists.',
        canonicalUrl: 'https://mediamozak.com/blog',
        ogTitle: 'Mediamozak Marketing Agency Blog',
        ogDescription: 'Actionable strategies for performance marketing, SEO, and business growth.',
      },
      settings
    );
  }, [settings]);

  const categories = ['all', ...Array.from(new Set(allPosts.map((p) => p.category)))];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="pt-12 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span>Knowledge & Field Playbooks</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Marketing Insights That Move Your Business Forward
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Direct playbooks, local search tactics for Delhi NCR, and performance frameworks from our senior practitioners.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, keywords..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-indigo-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-200 group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-indigo-300 border border-slate-800">
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTimeMinutes} min read</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                    By {post.author}
                  </span>
                  <button
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

import { Service, BlogPost, PageContent, Lead, MediaItem, RedirectRule, WebsiteSettings } from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  agencyName: 'Mediamozak Marketing Agency',
  tagline: 'Marketing That Moves Your Business Forward.',
  phone: '+91 7982984658',
  whatsapp: '+91 7982984658',
  email: 'contact@mediamozak.com',
  address: 'Hari Nagar, West Delhi',
  city: 'Delhi',
  state: 'Delhi',
  postalCode: '110064',
  country: 'India',
  defaultSeoTitle: 'Mediamozak Marketing Agency | Performance & Digital Marketing Delhi',
  defaultMetaDescription: 'Mediamozak is a leading digital and performance marketing agency in Delhi offering SEO, social media, paid ads, Q-commerce, and high-conversion lead generation.',
  defaultOgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  defaultRobots: 'index, follow',
  googleAnalyticsId: 'G-MEDIAMOZAK01',
  googleTagManagerId: 'GTM-MMZ2026',
  metaPixelId: '',
  googleSearchConsoleVerification: 'gsc-verification-mediamozak',
  customJsonLd: JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'MarketingAgency',
      name: 'Mediamozak Marketing Agency',
      telephone: '+91 7982984658',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hari Nagar, West Delhi',
        addressLocality: 'Delhi',
        postalCode: '110064',
        addressCountry: 'IN',
      },
      areaServed: ['Delhi', 'West Delhi', 'Delhi NCR', 'India'],
      priceRange: '₹₹',
    },
    null,
    2
  ),
  robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/*\n\nSitemap: https://mediamozak.com/sitemap.xml`,
  socialLinks: {
    instagram: 'https://instagram.com/mediamozak',
    linkedin: 'https://linkedin.com/company/mediamozak',
    facebook: 'https://facebook.com/mediamozak',
    twitter: 'https://twitter.com/mediamozak',
  },
  whatsappTemplates: {
    default: 'Hi Mediamozak Marketing Agency, I would like to enquire about your marketing services for my business.',
    services: {
      'digital-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your Digital Marketing services. I would like to discuss my requirements.',
      'social-media-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your Social Media Marketing services. I would like to discuss my requirements.',
      'seo': 'Hi Mediamozak Marketing Agency, I am interested in your Search Engine Optimization (SEO) services. I would like to discuss my requirements.',
      'performance-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your Performance Marketing (Google/Meta Ads) services. I would like to discuss my requirements.',
      'q-commerce-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your Q-Commerce Marketing services (Blinkit, Zepto, Instamart). I would like to discuss my requirements.',
      'e-commerce-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your E-Commerce Marketing services. I would like to discuss my requirements.',
      'lead-generation-marketing': 'Hi Mediamozak Marketing Agency, I am interested in your Lead Generation Marketing services. I would like to discuss my requirements.',
    },
  },
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    shortDescription: 'Full-funnel digital marketing strategies connecting brand storytelling, multichannel acquisition, and conversion optimization for sustainable growth.',
    iconName: 'Globe',
    heroHeadline: 'Strategic Full-Funnel Digital Marketing in Delhi',
    heroSubheadline: 'Align your brand visibility, targeted traffic acquisition, and conversion funnels into a predictable, revenue-generating engine.',
    overview: 'Digital marketing at Mediamozak is not about disjointed tactics. We architect connected ecosystems combining audience discovery, high-intent traffic capture, retargeting funnels, and retention frameworks. Serving growth-stage brands and local Delhi businesses, we tailor marketing systems that drive qualified prospects directly to your sales pipeline.',
    benefits: [
      'Holistic omnichannel growth connecting search, social, and direct channels',
      'Data-backed customer journey mapping to minimize drop-offs',
      'Agile marketing execution focused on customer acquisition cost (CAC) optimization',
      'Comprehensive monthly performance reviews and transparent attribution',
      'Strategic brand positioning against category competitors',
    ],
    strategy: [
      'Customer Persona & Search Intent Profiling',
      'Full-Funnel Architecture (Top, Middle, Bottom of Funnel)',
      'Creative Content & Direct-Response Copywriting',
      'Conversion Rate Optimization (CRO) on Landing Pages',
      'Multi-Touch Attribution and Revenue Tracking',
    ],
    process: [
      { stepNumber: 1, title: 'Discovery & Market Audit', description: 'Analyze existing assets, competitor positioning, target audiences, and conversion bottlenecks.' },
      { stepNumber: 2, title: 'Growth Blueprint', description: 'Design a bespoke multichannel roadmap defining budget allocation, messaging, and acquisition channels.' },
      { stepNumber: 3, title: 'Campaign Deployment', description: 'Build and launch conversion-ready landing pages, creative assets, and cross-channel campaigns.' },
      { stepNumber: 4, title: 'Continuous Optimization', description: 'Iteratively test headlines, target audiences, bidding strategies, and user journeys.' },
      { stepNumber: 5, title: 'Scale & Expansion', description: 'Direct capital toward top-performing segments to compound returns and capture market share.' },
    ],
    deliverables: [
      { title: 'Digital Growth Strategy Deck', description: 'Detailed roadmap with audience cohorts, channel mix, and 90-day execution milestones.' },
      { title: 'High-Converting Landing Pages', description: 'Custom-designed, fast-loading landing pages optimized for desktop and mobile conversion.' },
      { title: 'Campaign Management & Copy', description: 'End-to-end creative direction, copywriting, ad creatives, and ad management.' },
      { title: 'Live Performance Dashboard', description: 'Real-time reporting tracking lead flow, CAC, and return on ad spend.' },
    ],
    faqs: [
      {
        question: 'How is Mediamozak’s digital marketing different from other Delhi agencies?',
        answer: 'We focus strictly on measurable commercial outcomes rather than vanity metrics like impressions. Every campaign is engineered with clear cost-per-lead (CPL) and return metrics in mind.',
      },
      {
        question: 'Which platforms do you manage?',
        answer: 'We manage Google Search, Display, YouTube, Meta (Instagram & Facebook), LinkedIn, and contextual ad networks based on where your customers spend their time.',
      },
      {
        question: 'How long does it take to see tangible results?',
        answer: 'Paid campaigns yield initial data and leads within days of launch, while integrated SEO and brand channels compound substantially between months 2 and 4.',
      },
    ],
    relatedServiceSlugs: ['performance-marketing', 'seo', 'lead-generation-marketing'],
    seoTitle: 'Digital Marketing Agency in Delhi | Strategic Growth & SEO — Mediamozak',
    metaDescription: 'Partner with Mediamozak, a premier digital marketing agency in Delhi. We engineer full-funnel digital marketing strategies that turn attention into revenue.',
    h1: 'Digital Marketing Services for Forward-Thinking Businesses',
    canonicalUrl: 'https://mediamozak.com/services/digital-marketing',
    ogTitle: 'Digital Marketing Services in Delhi | Mediamozak Marketing Agency',
    ogDescription: 'Accelerate your commercial growth with data-driven digital marketing, funnel architecture, and lead generation.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Digital Marketing Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-2',
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    shortDescription: 'Build active community engagement, elevate brand authority, and turn social followers into qualified leads across Instagram, Facebook, and LinkedIn.',
    iconName: 'Share2',
    heroHeadline: 'High-Impact Social Media Marketing That Converts',
    heroSubheadline: 'Transform your social channels from passive feeds into active customer engagement and lead generation channels.',
    overview: 'In an era of relentless algorithmic shifts, standard stock graphics don’t cut through. Mediamozak builds structured social media content architectures tailored for Instagram, LinkedIn, and Facebook. We combine thumb-stopping visual storytelling with strategic community management and paid amplification to drive real business discussions.',
    benefits: [
      'Distinctive brand voice and visual aesthetic aligned with your industry',
      'Consistent, calendarized publishing schedules that keep your brand top-of-mind',
      'Active community interaction fostering customer loyalty and direct enquiries',
      'Strategic integration between organic reels/posts and paid ad funnels',
      'Actionable reporting on engagement quality, audience growth, and message enquiries',
    ],
    strategy: [
      'Content Pillar Architecture (Authority, Value, Social Proof, Conversion)',
      'Short-Form Video & Carousel Storytelling',
      'Platform-Specific Adaptation (B2B LinkedIn vs B2C Instagram)',
      'Community Management & Direct Message (DM) Funnel Integration',
      'Paid Boost & Lookalike Audience Amplification',
    ],
    process: [
      { stepNumber: 1, title: 'Brand Voice & Audience Audit', description: 'Analyze your current channels, demographic engagement, and competitor content strategies.' },
      { stepNumber: 2, title: 'Content Calendar Blueprint', description: 'Define monthly themes, post formats, visual style guides, and publishing cadence.' },
      { stepNumber: 3, title: 'Creative Production', description: 'Craft compelling graphics, carousel decks, captions, and high-impact reels.' },
      { stepNumber: 4, title: 'Publishing & Community Care', description: 'Deploy scheduled posts, monitor comments, and channel inbound inquiries to your sales team.' },
      { stepNumber: 5, title: 'Performance Analysis', description: 'Refine creative hooks based on reach, retention, saves, and conversion triggers.' },
    ],
    deliverables: [
      { title: 'Monthly Content Calendar', description: 'Full monthly schedule of curated visual posts, carousels, and reels ready for review.' },
      { title: 'Brand Asset Kit', description: 'Custom typography templates, story highlights, and cover designs.' },
      { title: 'Community & DM Management', description: 'Active monitoring of inbound inquiries with quick escalation to WhatsApp or phone.' },
      { title: 'Monthly Insights Report', description: 'Clear breakdown of engagement metrics, follower velocity, and direct leads generated.' },
    ],
    faqs: [
      {
        question: 'Do you create the graphics and write the captions?',
        answer: 'Yes, our team handles the entire creative workflow including copy, graphic design, and video formatting with your approval prior to publishing.',
      },
      {
        question: 'Which social platforms should my business focus on?',
        answer: 'For B2B and professional services, LinkedIn and Meta are primary. For retail, lifestyle, and local businesses, Instagram and Facebook drive the highest engagement and WhatsApp inquiries.',
      },
      {
        question: 'Can social media generate actual leads, not just likes?',
        answer: 'Absolutely. We embed lead generation mechanisms like DM automation prompts, bio landing links, and direct WhatsApp actions into every content campaign.',
      },
    ],
    relatedServiceSlugs: ['digital-marketing', 'performance-marketing', 'lead-generation-marketing'],
    seoTitle: 'Social Media Marketing Agency in Delhi | Mediamozak',
    metaDescription: 'Grow your brand authority and generate leads with Mediamozak’s social media marketing services in Delhi across Instagram, LinkedIn, and Facebook.',
    h1: 'Social Media Marketing That Builds Authority & Revenue',
    canonicalUrl: 'https://mediamozak.com/services/social-media-marketing',
    ogTitle: 'Social Media Marketing Agency Delhi | Mediamozak',
    ogDescription: 'Engage target audiences and turn social reach into commercial conversations.',
    ogImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Social Media Marketing Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-3',
    name: 'Search Engine Optimization',
    slug: 'seo',
    shortDescription: 'Dominate organic search with technical SEO audits, high-intent keyword ranking, local Delhi Google Maps optimization, and authoritative backlink building.',
    iconName: 'Search',
    heroHeadline: 'SEO Agency in Delhi: Rank for High-Intent Commercial Searches',
    heroSubheadline: 'Capture qualified customers when they are actively searching for your solutions on Google.',
    overview: 'Search Engine Optimization is your highest-ROI long-term acquisition asset. Mediamozak’s SEO framework combines rigorous technical audits, data-driven keyword research, structured data architecture, and local SEO dominance across Delhi and West Delhi. We build transparent organic systems that resist algorithm volatility and consistently compound your organic traffic.',
    benefits: [
      'Top Google search rankings for high-conversion commercial keywords',
      'Dominant Google Business Profile (GBP) visibility in West Delhi and Delhi NCR',
      'Technical site health: fast Core Web Vitals, mobile usability, and zero crawl errors',
      'Sustainable zero-ad-cost traffic pipeline compounding month-over-month',
      'Strict white-hat methodology protecting your domain reputation',
    ],
    strategy: [
      'Commercial Keyword Discovery & Competitor Gap Analysis',
      'Technical Architecture & Core Web Vitals Optimization',
      'On-Page Semantic Optimization & Schema Markup (JSON-LD)',
      'Local Delhi SEO: Google Maps Pack & Geo-targeted Citations',
      'Authoritative Content Strategy & Ethical Link Acquisition',
    ],
    process: [
      { stepNumber: 1, title: 'Comprehensive SEO Audit', description: 'Evaluate crawlability, indexation status, site speed, internal links, and current keyword footprints.' },
      { stepNumber: 2, title: 'Keyword & Content Mapping', description: 'Identify commercial keywords with strong search volume and map them to targeted service pages.' },
      { stepNumber: 3, title: 'Technical & On-Page Remediation', description: 'Fix metadata, heading structures, canonical tags, schema markup, and speed bottlenecks.' },
      { stepNumber: 4, title: 'Local GBP & Authority Building', description: 'Optimize Google Business Profile for West Delhi and secure localized citations.' },
      { stepNumber: 5, title: 'Monitoring & Continuous Iteration', description: 'Track rank movements in Google Search Console and expand topical coverage.' },
    ],
    deliverables: [
      { title: 'Technical Audit & Remediation Log', description: 'Detailed record of indexation, canonical, and speed fixes executed on your site.' },
      { title: 'Keyword Ranking Matrix', description: 'Live tracking of primary commercial and local keywords across Delhi search results.' },
      { title: 'Google Business Profile Optimization', description: 'Complete setup, categories, geo-posts, and local pack ranking tactics.' },
      { title: 'Monthly Organic Traffic Report', description: 'Transparent GSC and analytics reporting showing organic impressions, clicks, and leads.' },
    ],
    faqs: [
      {
        question: 'Do you target local Delhi and West Delhi searches?',
        answer: 'Yes! Local SEO is a core pillar. We optimize your website, citations, and Google Business Profile for localized searches such as "in Delhi", "in West Delhi", and nearby micro-markets.',
      },
      {
        question: 'How long does SEO take to produce measurable rankings?',
        answer: 'Noticeable ranking movements and local map impressions typically appear within 60 to 90 days. Competitive commercial terms generally mature between months 4 and 6.',
      },
      {
        question: 'Do you guarantee #1 ranking on Google?',
        answer: 'No ethical SEO agency guarantees #1 rankings because Google’s algorithm is proprietary. What we guarantee is rigorous, proven white-hat execution that systematically increases your organic rankings and leads.',
      },
    ],
    relatedServiceSlugs: ['digital-marketing', 'lead-generation-marketing', 'performance-marketing'],
    seoTitle: 'SEO Agency in Delhi | West Delhi Local & Technical SEO — Mediamozak',
    metaDescription: 'Rank on Google’s first page with Mediamozak, a top SEO company in Delhi. Technical SEO, local Delhi Google Maps optimization, and commercial keyword rankings.',
    h1: 'Results-Driven Search Engine Optimization in Delhi',
    canonicalUrl: 'https://mediamozak.com/services/seo',
    ogTitle: 'SEO Agency in Delhi | Local & Technical SEO Experts — Mediamozak',
    ogDescription: 'Capture high-intent organic search traffic across Delhi NCR with technical SEO and local Google Maps optimization.',
    ogImage: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'SEO Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-4',
    name: 'Performance Marketing',
    slug: 'performance-marketing',
    shortDescription: 'Scalable paid advertising campaigns across Google Ads and Meta Ads engineered for maximized ROAS, lower customer acquisition costs, and transparent attribution.',
    iconName: 'TrendingUp',
    heroHeadline: 'Performance Marketing Built for High Return on Ad Spend (ROAS)',
    heroSubheadline: 'Eliminate wasted ad spend with surgical audience targeting, conversion tracking, and direct-response creatives.',
    overview: 'Performance marketing at Mediamozak is governed by data discipline. We architect, launch, and scale paid acquisition campaigns on Google Search, Performance Max, YouTube, Meta (Instagram & Facebook), and programmatic networks. Every rupee spent is tracked against pipeline value, ensuring positive unit economics and predictable scale.',
    benefits: [
      'Maximized return on ad spend (ROAS) and minimized cost-per-acquisition (CPA)',
      'Full-funnel tracking with server-side Conversion API (CAPI) and Google Tag Manager',
      'Relentless creative testing to identify fatigue-resistant winning ad variations',
      'Tight negative keyword strategies to prevent budget bleed on irrelevant clicks',
      'Transparent weekly reporting with zero hidden markup on ad spend',
    ],
    strategy: [
      'Intent-Driven Google Search & Performance Max Campaigns',
      'Meta Direct-Response Ad Creatives & Video Hook Testing',
      'Dynamic Retargeting and Segmented Audience Exclusions',
      'Custom Landing Page Optimization with Rapid A/B Testing',
      'Server-Side Event Tracking for Post-iOS Privacy Resilience',
    ],
    process: [
      { stepNumber: 1, title: 'Tracking & Pixel Infrastructure', description: 'Install GA4, Google Ads Conversion tracking, and Meta CAPI to record accurate revenue events.' },
      { stepNumber: 2, title: 'Audience & Keyword Segmentation', description: 'Group search keywords and social audiences by buyer journey intent levels.' },
      { stepNumber: 3, title: 'Creative & Copy Production', description: 'Produce compelling direct-response video hooks, headlines, and benefit-driven ad copy.' },
      { stepNumber: 4, title: 'Controlled Launch & Bid Optimization', description: 'Deploy campaigns with disciplined budget caps to evaluate baseline CPA and conversion velocity.' },
      { stepNumber: 5, title: 'Scale & Retargeting', description: 'Increase budget into winning creative-audience pairs while deploying warm retargeting funnels.' },
    ],
    deliverables: [
      { title: 'Google Ads & Meta Ads Account Management', description: 'Daily campaign monitoring, bid optimization, and audience refinement.' },
      { title: 'Ad Creative Suite', description: 'Static banners, carousels, and short video concepts tested weekly.' },
      { title: 'Conversion Tracking Architecture', description: 'Complete GTM and CAPI setup to ensure clean attribution.' },
      { title: 'Weekly Performance Reports', description: 'Clear breakdown of spend, impressions, clicks, CTR, CPL, CPA, and ROAS.' },
    ],
    faqs: [
      {
        question: 'Do you promise guaranteed ROAS or leads?',
        answer: 'We do not make misleading guarantees. Ad performance depends on product-market fit, offer strength, pricing, and market competition. However, we guarantee rigorous testing, waste elimination, and optimization aimed at beating your historical benchmarks.',
      },
      {
        question: 'What is the recommended minimum ad budget?',
        answer: 'For Google or Meta campaigns in India, we generally recommend starting with an ad spend of at least ₹30,000 to ₹50,000/month to allow the algorithms sufficient data to exit the learning phase.',
      },
      {
        question: 'Who owns the ad accounts?',
        answer: 'You retain 100% ownership of your Google Ads and Meta Business Manager accounts. We operate via partner access with complete transparency.',
      },
    ],
    relatedServiceSlugs: ['digital-marketing', 'lead-generation-marketing', 'e-commerce-marketing'],
    seoTitle: 'Performance Marketing Agency in Delhi | Google & Meta Ads — Mediamozak',
    metaDescription: 'Scale revenue and lower CPA with Mediamozak’s performance marketing services in Delhi. Expert Google Ads, Meta Ads, and ROAS-focused campaign management.',
    h1: 'Data-Driven Performance Marketing That Scales Profitably',
    canonicalUrl: 'https://mediamozak.com/services/performance-marketing',
    ogTitle: 'Performance Marketing Agency Delhi | Mediamozak',
    ogDescription: 'Precision paid advertising across Google and Meta engineered for maximized ROAS and transparent attribution.',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Performance Marketing Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-5',
    name: 'Q-Commerce Marketing',
    slug: 'q-commerce-marketing',
    shortDescription: 'Accelerate product discoverability, brand visibility, and share of shelf across India’s booming quick-commerce platforms including Blinkit, Zepto, and Instamart.',
    iconName: 'Zap',
    heroHeadline: 'Q-Commerce Marketing: Win the 10-Minute Shelf in Delhi NCR',
    heroSubheadline: 'Optimize brand visibility, sponsored search, and promotional velocity on Blinkit, Zepto, and Swiggy Instamart.',
    overview: 'Quick commerce has fundamentally transformed consumer purchasing habits in metros like Delhi. Being listed on dark-store apps is no longer enough; your products must dominate top search tiles and impulse banners. Mediamozak provides end-to-end quick commerce marketing—managing in-app sponsored search, keyword bidding, inventory sync alignment, and promotional calendars.',
    benefits: [
      'High-visibility placement on top category listings and search queries',
      'Optimized in-app sponsored ads driving immediate impulse checkout',
      'Dark store availability tracking and localized Delhi NCR campaign pacing',
      'A/B testing of product pack visuals, titles, and highlight badges',
      'Data-driven insights to maximize return on retail ad spend (ROAS)',
    ],
    strategy: [
      'In-App Keyword & Search Rank Optimization',
      'Platform Sponsored Ads & Banner Placements (Blinkit / Zepto / Instamart)',
      'Dark-Store Pin-Code Pacing & Stock Level Synchronization',
      'Bundling, Sampling & Flash Promo Campaign Management',
      'Share-of-Voice (SOV) Monitoring against Category Incumbents',
    ],
    process: [
      { stepNumber: 1, title: 'Category & Platform Audit', description: 'Analyze your product presence, ratings, competitor pricing, and shelf placement on key platforms.' },
      { stepNumber: 2, title: 'Listing & Asset Optimization', description: 'Revamp product hero imagery, feature highlights, and searchable keywords for mobile app layouts.' },
      { stepNumber: 3, title: 'Sponsored Campaign Setup', description: 'Launch targeted keyword bids and top-of-funnel banner campaigns on Blinkit, Zepto, and Instamart.' },
      { stepNumber: 4, title: 'Pin-Code & Stock Tracking', description: 'Coordinate campaign pacing with high-velocity dark stores across Delhi NCR to avoid out-of-stock waste.' },
      { stepNumber: 5, title: 'Performance & Shelf Share Review', description: 'Evaluate cost-per-order, repeat orders, and organic rank momentum.' },
    ],
    deliverables: [
      { title: 'Platform Sponsored Search Management', description: 'Continuous bid adjustments, keyword optimization, and dayparting on quick-commerce ad consoles.' },
      { title: 'Mobile-Optimized Creative Tiles', description: 'Crisp, high-contrast pack shot graphics optimized for fast scrolling app feeds.' },
      { title: 'Promotional Calendar Execution', description: 'Coordination of discount days, bundle highlights, and festive pushes.' },
      { title: 'Q-Commerce Velocity Dashboard', description: 'Holistic view of orders, ad spend, and dark-store coverage performance.' },
    ],
    faqs: [
      {
        question: 'Which quick commerce platforms do you support?',
        answer: 'We support marketing and sponsored ad management across Blinkit, Zepto, Swiggy Instamart, and BB Now (BigBasket).',
      },
      {
        question: 'Do you manage onboarding and distributor listings?',
        answer: 'Our primary expertise is demand generation, listing optimization, and platform ad management. We can advise your supply chain team on dark-store listing best practices.',
      },
      {
        question: 'Why is marketing necessary if my product is already listed on Blinkit or Zepto?',
        answer: 'With thousands of SKUs competing inside dark-store catalogues, organic visibility without sponsored keywords or category ranking is virtually zero. Strategic ads ensure your brand is seen first when consumers search.',
      },
    ],
    relatedServiceSlugs: ['e-commerce-marketing', 'performance-marketing', 'digital-marketing'],
    seoTitle: 'Q-Commerce Marketing Agency in Delhi | Blinkit, Zepto & Instamart Ads — Mediamozak',
    metaDescription: 'Boost product visibility and sales on Blinkit, Zepto, and Swiggy Instamart with Mediamozak’s specialized Q-commerce marketing services in Delhi.',
    h1: 'Quick Commerce Marketing for High-Velocity Consumer Brands',
    canonicalUrl: 'https://mediamozak.com/services/q-commerce-marketing',
    ogTitle: 'Q-Commerce Marketing Agency Delhi | Mediamozak',
    ogDescription: 'Scale on-demand grocery and FMCG sales across Blinkit, Zepto, and Instamart in Delhi NCR.',
    ogImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Q-Commerce Marketing Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-6',
    name: 'E-Commerce Marketing',
    slug: 'e-commerce-marketing',
    shortDescription: 'Comprehensive growth systems for online stores combining Google Shopping, Meta DPA catalogs, marketplace SEO, and checkout conversion rate optimization.',
    iconName: 'ShoppingBag',
    heroHeadline: 'E-Commerce Marketing Engineered for Scalable Online Revenue',
    heroSubheadline: 'Turn digital window shoppers into loyal, repeat customers with high-converting shopping funnels.',
    overview: 'E-commerce success demands more than driving generic website traffic. It requires laser-focused shopping campaigns, frictionless checkout flows, high customer lifetime value (LTV), and strategic remarketing. Mediamozak empowers D2C brands and e-commerce businesses to scale profitably on Shopify, WooCommerce, and major marketplaces.',
    benefits: [
      'High-intent Google Shopping and Performance Max product catalog campaigns',
      'Dynamic Product Ads (DPA) on Meta retargeting cart abandoners with precision',
      'Conversion Rate Optimization (CRO) reducing checkout abandonment rates',
      'E-commerce SEO for category pages and rich product schema snippets',
      'Customer lifetime value enhancement via automated retention flows',
    ],
    strategy: [
      'Merchant Center Feed Hygiene & Title/Attribute Optimization',
      'Catalog-Powered Dynamic Ads & First-Order Incentive Campaigns',
      'Frictionless Checkout UX & Mobile Speed Enhancements',
      'Segmented Abandoned Cart & Post-Purchase Sequences',
      'Cohort Analysis of Repeat Purchase Frequency & Blended CAC',
    ],
    process: [
      { stepNumber: 1, title: 'Store & Funnel Audit', description: 'Evaluate site load speed, product descriptions, cart checkout friction, and analytics integrity.' },
      { stepNumber: 2, title: 'Product Feed Architecture', description: 'Clean and enrich your Google Merchant Center and Meta product catalogs with high-search-intent titles.' },
      { stepNumber: 3, title: 'Acquisition & Catalog Ads', description: 'Launch Google Shopping and Meta collection ads targeting active category shoppers.' },
      { stepNumber: 4, title: 'Cart Recovery & Retargeting', description: 'Deploy multi-stage remarketing sequences to recover high-intent shoppers.' },
      { stepNumber: 5, title: 'Scaling & Retention', description: 'Scale high-converting SKU campaigns and implement customer retention frameworks.' },
    ],
    deliverables: [
      { title: 'Shopping Campaign Management', description: 'Daily management of Google Shopping, PMax, and Meta catalog ads.' },
      { title: 'Product Feed Optimization', description: 'Structured feed enrichment to boost organic and paid shopping visibility.' },
      { title: 'Conversion Rate Audit', description: 'Actionable UI/UX recommendations for product detail pages and checkout steps.' },
      { title: 'E-Commerce Analytics & ROAS Tracker', description: 'Real-time metrics on conversion rates, average order value (AOV), and ROAS.' },
    ],
    faqs: [
      {
        question: 'Which e-commerce platforms do you support?',
        answer: 'We work extensively with Shopify, WooCommerce, Magento, custom headless setups, as well as Amazon and Flipkart marketplace advertising.',
      },
      {
        question: 'How do you address high abandoned cart rates?',
        answer: 'We combine on-site conversion improvements (simplified one-click checkouts, clear shipping costs) with dynamic retargeting ads and automated WhatsApp recovery flows.',
      },
      {
        question: 'What metrics do you track for e-commerce clients?',
        answer: 'We track return on ad spend (ROAS), Customer Acquisition Cost (CAC), Average Order Value (AOV), Conversion Rate, and Customer Lifetime Value (LTV).',
      },
    ],
    relatedServiceSlugs: ['performance-marketing', 'q-commerce-marketing', 'seo'],
    seoTitle: 'E-Commerce Marketing Agency in Delhi | D2C Growth & Shopping Ads — Mediamozak',
    metaDescription: 'Scale your online store with Mediamozak. Expert e-commerce marketing services in Delhi covering Google Shopping, Meta catalogs, and CRO.',
    h1: 'Scalable E-Commerce Marketing for Modern Online Stores',
    canonicalUrl: 'https://mediamozak.com/services/e-commerce-marketing',
    ogTitle: 'E-Commerce Marketing Agency Delhi | Mediamozak',
    ogDescription: 'Drive measurable online sales with high-ROAS shopping ads and conversion-optimized funnels.',
    ogImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'E-Commerce Marketing Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
  {
    id: 'srv-7',
    name: 'Lead Generation Marketing',
    slug: 'lead-generation-marketing',
    shortDescription: 'Generate high-intent B2B and consumer leads with high-converting landing pages, instant WhatsApp funnels, and automated CRM qualification.',
    iconName: 'Target',
    heroHeadline: 'High-Intent Lead Generation That Fills Your Sales Pipeline',
    heroSubheadline: 'Attract qualified decision-makers, verify buyer intent, and streamline lead delivery directly to your sales team.',
    overview: 'Generating random contact details is easy; generating sales-qualified leads that convert into high-ticket revenue requires strategic precision. Mediamozak designs full-cycle lead generation systems for B2B enterprises, real estate, healthcare, education, and professional services. We combine targeted paid search, intent-focused social ads, frictionless WhatsApp funnels, and qualification filters to deliver genuine opportunities.',
    benefits: [
      'Consistently delivered sales-qualified leads with validated contact info',
      'Frictionless lead routing to WhatsApp, email, and internal CRMs',
      'Pre-qualification questioning filters out low-intent window shoppers',
      'Fast-loading, mobile-first landing pages engineered solely for conversion',
      'Lower cost per qualified lead (CPQL) through continuous testing',
    ],
    strategy: [
      'High-Intent Commercial Keyword Capture on Google',
      'Interactive Meta Lead Forms & Native Instant Experiences',
      'Direct-to-WhatsApp Click-to-Chat Funnels for Fast Response',
      'Lead Qualification Questionnaires & Spam Protection',
      'Automated Webhook Routing into CRM & Sales Team WhatsApp',
    ],
    process: [
      { stepNumber: 1, title: 'ICP & Offer Definition', description: 'Define your Ideal Customer Profile (ICP), unique value proposition, and compelling lead magnet or consultation offer.' },
      { stepNumber: 2, title: 'Landing Page & Form Engineering', description: 'Build high-speed, distraction-free landing pages optimized for desktop and mobile devices.' },
      { stepNumber: 3, title: 'Targeted Campaign Deployment', description: 'Launch search and social campaigns targeting verified decision-makers and high-intent searchers.' },
      { stepNumber: 4, title: 'Lead Qualification & Routing', description: 'Implement mandatory qualification fields and instant routing to your sales team via WhatsApp and CRM.' },
      { stepNumber: 5, title: 'Feedback Loop Optimization', description: 'Regularly meet with your sales team to review lead quality and adjust targeting to eliminate unqualified inquiries.' },
    ],
    deliverables: [
      { title: 'Turnkey Lead Generation Machine', description: 'End-to-end setup of landing pages, forms, ad accounts, and tracking.' },
      { title: 'Real-Time Lead Notifications', description: 'Instant alerts sent to your phone/WhatsApp when a qualified prospect submits an inquiry.' },
      { title: 'CRM & Webhook Integration', description: 'Automatic syncing with tools like Google Sheets, Zoho, HubSpot, or custom databases.' },
      { title: 'Lead Quality & Cost Reporting', description: 'Transparent reporting displaying total leads, contact rate, qualified leads, and CPQL.' },
    ],
    faqs: [
      {
        question: 'How do you ensure lead quality over mere quantity?',
        answer: 'We introduce strategic friction: qualification questions (e.g. budget, timeframe, business type) in our forms, OTP verification where necessary, and continuous feedback alignment with your sales team.',
      },
      {
        question: 'How quickly are leads delivered to our team?',
        answer: 'Instantly. Leads submitted through the website or ads are delivered in real time to your database, email, and WhatsApp so your sales representatives can follow up within minutes.',
      },
      {
        question: 'Can you generate leads via WhatsApp directly?',
        answer: 'Yes! WhatsApp click-to-chat campaigns with pre-filled inquiries are one of our highest-converting channels for Indian audiences.',
      },
    ],
    relatedServiceSlugs: ['performance-marketing', 'digital-marketing', 'seo'],
    seoTitle: 'Lead Generation Agency in Delhi | High-Intent B2B & B2C Leads — Mediamozak',
    metaDescription: 'Accelerate your sales pipeline with Mediamozak, a top lead generation agency in Delhi. Qualified leads via Google Ads, Meta, and WhatsApp funnels.',
    h1: 'Performance Lead Generation Services in Delhi',
    canonicalUrl: 'https://mediamozak.com/services/lead-generation-marketing',
    ogTitle: 'Lead Generation Agency Delhi | Mediamozak Marketing Agency',
    ogDescription: 'Generate qualified B2B and B2C sales inquiries with precision targeting and conversion-optimized landing pages.',
    ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Lead Generation Agency in Delhi',
    status: 'published',
    updatedAt: '2026-03-01',
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How High-Growth Delhi Businesses Scale with Performance Marketing & Funnel Optimization',
    slug: 'delhi-businesses-scale-performance-marketing',
    excerpt: 'Discover why relying solely on vanity reach burns capital, and how leading Delhi enterprises engineer full-funnel paid campaigns that reliably generate positive ROAS.',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Performance marketing metrics and growth analytics dashboard',
    author: 'Mediamozak Strategy Team',
    category: 'Performance Marketing',
    tags: ['Google Ads', 'Meta Ads', 'ROAS', 'Delhi Business Growth'],
    status: 'published',
    publishedAt: '2026-02-18',
    readingTimeMinutes: 5,
    featured: true,
    content: `## The Era of Vanity Metrics Is Officially Over

For years, many businesses in Delhi NCR evaluated marketing success through vanity numbers: Instagram follower counts, generic video impressions, and website visits that never converted. In today’s competitive advertising landscape, customer acquisition costs (CAC) require strict mathematical discipline.

To scale profitably, modern business leaders must replace unmeasured promotion with structured **performance marketing**.

---

### 1. Build Full-Funnel Advertising Rather Than Isolated Ads

A common misstep is treating paid ads as standalone transactional requests. Prospective customers rarely convert on their first touchpoint. Successful campaigns employ a 3-tier structure:

1. **Top of Funnel (TOF - Awareness):** Problem-aware video hooks and educational carousels explaining industry pain points.
2. **Middle of Funnel (MOF - Consideration):** Solution-focused case studies, product comparisons, and detailed feature breakdowns.
3. **Bottom of Funnel (BOF - Decision):** Direct-response offers, client proof, free consultation bookings, and localized WhatsApp actions.

---

### 2. The Power of Direct WhatsApp Funnels in Delhi NCR

In the Indian market, speed to conversation is everything. Prospective buyers often hesitate to fill lengthy forms. Integrating **direct-to-WhatsApp Click-to-Chat ads** allows your sales reps to initiate high-touch dialogue within 60 seconds of initial interest.

At Mediamozak, our client campaigns demonstrate up to **42% higher qualification rates** when prospective leads can transition immediately from an ad to a personalized WhatsApp thread.

---

### 3. Rigorous Creative Testing

Algorithms on Meta and Google prioritize creative resonance above manual bid tricks. Top-performing brands test at least 4 to 6 creative hooks weekly—varying headline urgency, visual proof, and value proposition framing.

When an ad variations strikes a chord, capital can be allocated aggressively with minimal risk of budget waste.

---

### Summary Checklist for Performance Marketing
* Establish server-side event tracking (CAPI) to combat privacy loss.
* Maintain negative keyword lists in Google Ads to eliminate irrelevant clicks.
* Route high-intent mobile visitors to immediate consultation or WhatsApp channels.
* Track blended return on ad spend (ROAS) rather than platform-reported estimates alone.`,
    seoTitle: 'How Delhi Businesses Scale with Performance Marketing — Mediamozak',
    metaDescription: 'Learn how Delhi businesses achieve high ROAS with full-funnel performance marketing, creative testing, and direct WhatsApp lead funnels.',
    h1: 'Scaling Delhi Businesses Through Performance Marketing & Funnel Optimization',
    canonicalUrl: 'https://mediamozak.com/blog/delhi-businesses-scale-performance-marketing',
    ogTitle: 'Performance Marketing Strategy for Delhi Brands | Mediamozak',
    ogDescription: 'Eliminate wasted ad spend and build predictable revenue engines with performance marketing.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Performance Marketing Delhi',
  },
  {
    id: 'post-2',
    title: 'Local SEO in Delhi: How West Delhi Businesses Can Dominate Google Maps & Organic Search',
    slug: 'local-seo-delhi-west-delhi-google-maps',
    excerpt: 'A practical, step-by-step roadmap for local businesses in West Delhi to capture the Google 3-Pack, outrank competitors, and drive continuous phone calls and store visits.',
    featuredImage: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Local search engine optimization on map interface',
    author: 'Mediamozak SEO Team',
    category: 'SEO',
    tags: ['Local SEO', 'West Delhi', 'Google Business Profile', 'Google Maps'],
    status: 'published',
    publishedAt: '2026-02-24',
    readingTimeMinutes: 6,
    featured: false,
    content: `## Why Local Search Is West Delhi’s Most Valuable Real Estate

Every single day, thousands of high-intent consumers in Hari Nagar, Janakpuri, Rajouri Garden, and across West Delhi search for services using queries like:
- *"Best digital marketing agency near me"*
- *"SEO company in West Delhi"*
- *"Performance marketing agency in Delhi"*

When users search with local intent, Google prominently showcases the **Google Maps 3-Pack** before organic web links. If your business is missing from these top 3 positions, you are ceding market share to competitors.

---

### Step 1: Maximize Your Google Business Profile (GBP) Completeness

An incomplete profile severely depresses your local ranking. Ensure:
* **Accurate NAP:** Name, Address, and Phone number must be 100% identical across your website, GBP, and all directory listings.
* **Category Specificity:** Choose the most accurate primary category (e.g. *Marketing Agency*) followed by relevant secondary categories.
* **Geographic Service Areas:** Define specific pin-codes and districts served across West Delhi and Delhi NCR.

---

### Step 2: Implement On-Page Local Schema Markup

Search engine crawlers rely on structured data to verify physical legitimacy. Implementing \`LocalBusiness\` or \`MarketingAgency\` JSON-LD schema with exact latitude, longitude, address, phone number, and opening hours establishes unambiguous authority.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Mediamozak Marketing Agency",
  "address": {
    "streetAddress": "Hari Nagar, West Delhi",
    "addressLocality": "Delhi",
    "postalCode": "110064",
    "addressCountry": "IN"
  }
}
\`\`\`

---

### Step 3: Localized Geo-Targeted Content Pages

Avoid generic landing pages that mention no geographic context. Create dedicated service pages that naturally integrate regional focus:
* Highlight local business challenges and success in Delhi.
* Provide clear neighborhood landmarks (such as Hari Nagar, West Delhi).
* Avoid spammy keyword stuffing; write natural, authoritative copy tailored to Delhi business owners.

---

### Step 4: Authentic Review Velocity

Encourage genuine reviews from satisfied clients with specific mentions of the services received. Consistent, organic review frequency signals freshness and trustworthiness to the local ranking algorithm.`,
    seoTitle: 'Local SEO Delhi: Rank in West Delhi Google Maps — Mediamozak',
    metaDescription: 'Master local SEO in Delhi and West Delhi. Learn how to rank in the Google Maps 3-Pack, optimize your Google Business Profile, and capture local search leads.',
    h1: 'Dominating Local Search & Google Maps in West Delhi',
    canonicalUrl: 'https://mediamozak.com/blog/local-seo-delhi-west-delhi-google-maps',
    ogTitle: 'Local SEO Strategy for West Delhi Businesses | Mediamozak',
    ogDescription: 'Rank on top of Google Maps and organic local searches across Delhi NCR.',
    ogImage: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Local SEO Delhi',
  },
  {
    id: 'post-3',
    title: 'Quick Commerce Marketing: Winning Share of Shelf on Blinkit, Zepto, and Instamart',
    slug: 'q-commerce-marketing-blinkit-zepto-instamart',
    excerpt: 'The playbook for modern FMCG and consumer brands to drive brand discoverability, manage dark-store sponsored ads, and boost instant checkouts in 10 minutes.',
    featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Modern quick-commerce packaging and retail fulfillment warehouse',
    author: 'Mediamozak Commerce Team',
    category: 'Q-Commerce',
    tags: ['Q-Commerce', 'Blinkit', 'Zepto', 'Instamart', 'Retail Media'],
    status: 'published',
    publishedAt: '2026-03-01',
    readingTimeMinutes: 5,
    featured: false,
    content: `## The 10-Minute Retail Revolution

Quick commerce is no longer merely an emergency grocery channel—it has evolved into the primary shopping destination for millions of urban households in Delhi, Mumbai, and Bengaluru. Consumers increasingly discover and purchase packaged foods, beverages, personal care, and electronics on dark-store apps.

However, as thousands of new brands crowd the catalog, organic visibility on Blinkit, Zepto, and Swiggy Instamart has plummeted. To win, brands must treat quick commerce as a sophisticated **retail media network**.

---

### 1. In-App Keyword Bidding & Share of Voice (SOV)

Just like Google Search, consumers on quick-commerce apps type generic queries (e.g., *"organic peanut butter"*, *"energy drink"*, *"protein bar"*).
* Bidding on high-intent generic keywords guarantees placement in the top 2 product positions.
* Protecting your brand keywords prevents aggressive competitors from intercepting your existing customers.

---

### 2. High-Contrast Packshot Design for 6-Inch Screens

A product image designed for a physical supermarket shelf or desktop e-commerce page often fails on a mobile app feed. On quick commerce platforms:
* Crop hero packshots tightly with 0% wasted border space.
* Highlight key differentiators (e.g., *Sugar-Free*, *100% Arabica*, *Pack of 2*) in bold callout badges.
* Ensure pack text remains legible even when shrunk down to a 100x100 pixel smartphone thumbnail.

---

### 3. Coordinating Ad Spend with Dark-Store Inventory

One of the costliest errors in quick commerce marketing is advertising products in pin-codes where local dark stores are out of stock. At Mediamozak, our performance team syncs campaign pacing with regional inventory data to avoid wasting ad spend on unavailable SKUs.

---

### Key Takeaways for Q-Commerce Growth
* Treat quick commerce as an intent-driven retail media channel, not passive inventory.
* Combine sponsored search with impulse banners during peak order windows (morning breakfast and evening rush).
* Measure blended return on ad spend (ROAS) and repeat customer purchase cadence.`,
    seoTitle: 'Q-Commerce Marketing: Blinkit, Zepto & Instamart Strategy — Mediamozak',
    metaDescription: 'Unlock fast grocery growth with Mediamozak’s Q-Commerce marketing strategy for Blinkit, Zepto, and Instamart. Sponsored search and share-of-shelf optimization.',
    h1: 'Winning the 10-Minute Shelf: Quick Commerce Marketing Strategy',
    canonicalUrl: 'https://mediamozak.com/blog/q-commerce-marketing-blinkit-zepto-instamart',
    ogTitle: 'Quick Commerce Marketing for Consumer Brands | Mediamozak',
    ogDescription: 'Accelerate in-app search rankings and sales across Blinkit, Zepto, and Instamart.',
    ogImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Q-Commerce Marketing',
  },
];

export const INITIAL_PAGES: PageContent[] = [
  {
    id: 'page-home',
    title: 'Home',
    slug: '',
    content: 'Home page of Mediamozak Marketing Agency. Marketing that moves your business forward.',
    status: 'published',
    seoTitle: 'Mediamozak Marketing Agency | Leading Digital & Performance Marketing Delhi',
    metaDescription: 'Mediamozak is a premier digital marketing agency in Delhi specializing in SEO, Performance Marketing, Social Media, Q-Commerce, E-Commerce, and Lead Generation.',
    h1: 'Marketing That Moves Your Business Forward.',
    canonicalUrl: 'https://mediamozak.com/',
    ogTitle: 'Mediamozak Marketing Agency | Marketing That Moves Your Business Forward',
    ogDescription: 'Data-driven digital marketing, SEO, performance marketing, and lead generation based in Hari Nagar, West Delhi.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Digital Marketing Agency Delhi',
    updatedAt: '2026-03-01',
  },
  {
    id: 'page-about',
    title: 'About Us',
    slug: 'about',
    content: 'About Mediamozak Marketing Agency. Who we are, our philosophy, approach, and commitment to measurable growth.',
    status: 'published',
    seoTitle: 'About Us | Mediamozak Marketing Agency — Performance Marketing Delhi',
    metaDescription: 'Learn about Mediamozak Marketing Agency. We are a results-obsessed digital and performance marketing agency in Delhi focused on measurable business growth.',
    h1: 'About Mediamozak Marketing Agency',
    canonicalUrl: 'https://mediamozak.com/about',
    ogTitle: 'About Mediamozak Marketing Agency Delhi',
    ogDescription: 'Discover our approach, philosophy, and how we help businesses grow with performance-driven marketing.',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'About Mediamozak Marketing Agency',
    updatedAt: '2026-03-01',
  },
  {
    id: 'page-services',
    title: 'Services',
    slug: 'services',
    content: 'Explore our full suite of 7 digital marketing services designed for forward-thinking brands.',
    status: 'published',
    seoTitle: 'Marketing Services | Digital, SEO, Performance & Q-Commerce — Mediamozak',
    metaDescription: 'Explore Mediamozak’s complete marketing services: Digital Marketing, SEO, Social Media, Performance Marketing, Q-Commerce, E-Commerce, and Lead Generation.',
    h1: 'Comprehensive Marketing Services Designed for Growth',
    canonicalUrl: 'https://mediamozak.com/services',
    ogTitle: 'Digital & Performance Marketing Services | Mediamozak Delhi',
    ogDescription: 'Full-funnel marketing solutions engineered for commercial scale and measurable return on investment.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Digital Marketing Services Delhi',
    updatedAt: '2026-03-01',
  },
  {
    id: 'page-contact',
    title: 'Contact Us',
    slug: 'contact',
    content: 'Get in touch with Mediamozak Marketing Agency in Hari Nagar, West Delhi. Consultation, calls, and WhatsApp.',
    status: 'published',
    seoTitle: 'Contact Us | Mediamozak Marketing Agency Delhi',
    metaDescription: 'Contact Mediamozak Marketing Agency in Hari Nagar, West Delhi. Call or WhatsApp +91 7982984658 for a free marketing consultation.',
    h1: 'Connect with Mediamozak Marketing Agency',
    canonicalUrl: 'https://mediamozak.com/contact',
    ogTitle: 'Contact Mediamozak Marketing Agency Delhi',
    ogDescription: 'Reach out to discuss your marketing objectives. Call or WhatsApp +91 7982984658.',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80',
    focusKeyword: 'Contact Mediamozak Delhi',
    updatedAt: '2026-03-01',
  },
  {
    id: 'page-privacy',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: 'Privacy policy for Mediamozak Marketing Agency detailing data protection, cookie usage, and user rights.',
    status: 'published',
    seoTitle: 'Privacy Policy | Mediamozak Marketing Agency',
    metaDescription: 'Privacy policy for Mediamozak Marketing Agency outlining how we collect, safeguard, and process your personal information.',
    h1: 'Privacy Policy',
    canonicalUrl: 'https://mediamozak.com/privacy-policy',
    updatedAt: '2026-03-01',
  },
  {
    id: 'page-terms',
    title: 'Terms and Conditions',
    slug: 'terms-and-conditions',
    content: 'Terms and conditions governing the use of Mediamozak Marketing Agency website and professional services.',
    status: 'published',
    seoTitle: 'Terms & Conditions | Mediamozak Marketing Agency',
    metaDescription: 'Read the terms and conditions governing the services and website of Mediamozak Marketing Agency.',
    h1: 'Terms and Conditions',
    canonicalUrl: 'https://mediamozak.com/terms-and-conditions',
    updatedAt: '2026-03-01',
  },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rajesh Sharma',
    email: 'rajesh@sharmaretail.in',
    phone: '+91 9811023456',
    company: 'Sharma Retail West Delhi',
    service: 'seo',
    message: 'We want to improve our Google Maps ranking for local West Delhi footfall and rank for regional search terms.',
    source: 'Website Contact Form',
    page: '/services/seo',
    status: 'qualified',
    notes: 'Called on Mar 2. Very interested in 6-month local SEO package. Scheduled proposal review.',
    createdAt: '2026-03-02T10:15:00Z',
  },
  {
    id: 'lead-2',
    name: 'Pooja Verma',
    email: 'pooja@vermafmcg.com',
    phone: '+91 9876543210',
    company: 'Verma Naturals FMCG',
    service: 'q-commerce-marketing',
    message: 'Looking for a dedicated agency to manage our Blinkit and Zepto sponsored product campaigns across Delhi NCR.',
    source: 'Direct WhatsApp Click',
    page: '/services/q-commerce-marketing',
    status: 'contacted',
    notes: 'Sent initial Q-Commerce deck via WhatsApp.',
    createdAt: '2026-03-03T14:40:00Z',
  },
  {
    id: 'lead-3',
    name: 'Amitabh Sen',
    email: 'amitabh@senconsulting.co',
    phone: '+91 9955112233',
    company: 'Sen Corporate Advisory',
    service: 'lead-generation-marketing',
    message: 'Need high-intent B2B leads for financial advisory services in Delhi NCR. Require qualified bookings.',
    source: 'Homepage Consultation Modal',
    page: '/',
    status: 'new',
    createdAt: '2026-03-04T09:20:00Z',
  },
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    name: 'Marketing Analytics Dashboard',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    alt: 'High-performance digital marketing dashboard and analytics',
    caption: 'Marketing dashboard tracking lead generation velocity and ROAS',
    description: 'Hero imagery for digital marketing and performance marketing campaigns',
    type: 'image/jpeg',
    sizeBytes: 184500,
    uploadedAt: '2026-02-01',
  },
  {
    id: 'media-2',
    name: 'SEO & Search Engine Interface',
    url: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Search engine optimization concept and Google ranking illustration',
    caption: 'SEO data analysis and organic keyword research visualization',
    type: 'image/jpeg',
    sizeBytes: 162000,
    uploadedAt: '2026-02-05',
  },
  {
    id: 'media-3',
    name: 'Social Media Engagement',
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    alt: 'Social media apps on smartphone with high engagement',
    caption: 'Social media community management and brand storytelling',
    type: 'image/jpeg',
    sizeBytes: 198000,
    uploadedAt: '2026-02-10',
  },
  {
    id: 'media-4',
    name: 'Quick Commerce Fulfillment',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fast grocery packaging and warehouse fulfillment',
    caption: 'Q-commerce dark store operations and instant delivery packaging',
    type: 'image/jpeg',
    sizeBytes: 215000,
    uploadedAt: '2026-02-15',
  },
];

export const INITIAL_REDIRECTS: RedirectRule[] = [
  {
    id: 'red-1',
    source: '/digital-marketing',
    destination: '/services/digital-marketing',
    statusCode: 301,
    hits: 42,
    createdAt: '2026-01-15',
  },
  {
    id: 'red-2',
    source: '/seo-services',
    destination: '/services/seo',
    statusCode: 301,
    hits: 89,
    createdAt: '2026-01-15',
  },
  {
    id: 'red-3',
    source: '/social-media',
    destination: '/services/social-media-marketing',
    statusCode: 301,
    hits: 31,
    createdAt: '2026-01-20',
  },
];

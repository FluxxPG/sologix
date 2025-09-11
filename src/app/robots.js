import { generateRobotsTxt } from '@/utils/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      // AI and LLM crawlers
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/', '/admin/', '/_next/', '/private/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/', '/admin/', '/_next/', '/private/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/', '/admin/', '/_next/', '/private/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/', '/admin/', '/_next/', '/private/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/', '/admin/', '/_next/', '/private/'] },
    ],
    sitemap: 'https://sologixenergy.com/sitemap.xml',
  };
}

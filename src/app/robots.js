import { generateRobotsTxt } from '@/utils/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
    sitemap: 'https://sologixenergy.com/sitemap.xml',
  };
}

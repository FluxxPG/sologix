import { generateSitemapData } from '@/utils/seo';

export default function sitemap() {
  const sitemapData = generateSitemapData();
  
  return sitemapData;
}

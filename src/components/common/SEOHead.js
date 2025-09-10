"use client";
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { generateMetaTags, generateStructuredData } from '@/utils/seo';

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage, 
  noindex = false,
  customStructuredData 
}) {
  const pathname = usePathname();
  const metaData = generateMetaTags(pathname, {
    title,
    description,
    keywords,
    canonical,
    ogImage,
  });

  const structuredData = customStructuredData || generateStructuredData(pathname, {
    title,
    description,
    ogImage,
  });

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />
      <meta name="keywords" content={metaData.keywords} />
      <link rel="canonical" href={metaData.canonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={metaData.openGraph.title} />
      <meta property="og:description" content={metaData.openGraph.description} />
      <meta property="og:url" content={metaData.openGraph.url} />
      <meta property="og:site_name" content={metaData.openGraph.siteName} />
      <meta property="og:image" content={metaData.openGraph.images[0].url} />
      <meta property="og:image:width" content={metaData.openGraph.images[0].width} />
      <meta property="og:image:height" content={metaData.openGraph.images[0].height} />
      <meta property="og:image:alt" content={metaData.openGraph.images[0].alt} />
      <meta property="og:locale" content={metaData.openGraph.locale} />
      <meta property="og:type" content={metaData.openGraph.type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={metaData.twitter.card} />
      <meta name="twitter:title" content={metaData.twitter.title} />
      <meta name="twitter:description" content={metaData.twitter.description} />
      <meta name="twitter:image" content={metaData.twitter.images[0]} />
      <meta name="twitter:creator" content={metaData.twitter.creator} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Sologix Energy" />
      <meta name="publisher" content="Sologix Energy" />
      <meta name="copyright" content="Sologix Energy" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Sologix Energy" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      )}
    </Head>
  );
}

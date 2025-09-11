// SEO Configuration and Utilities
export const seoConfig = {
  siteName: "Sologix Energy",
  siteUrl: "https://sologixenergy.com",
  defaultTitle: "Sologix Energy - Leading Solar Power Solutions in India",
  defaultDescription: "Transform your energy future with Sologix Energy's premium solar solutions. Expert installation, 25+ years experience, 10K+ panels installed. Get clean, reliable, and affordable solar power for your home and business.",
  defaultKeywords: "solar energy, solar panels, solar power, renewable energy, clean energy, solar installation, solar solutions, solar company, solar panels India, solar power India, rooftop solar, commercial solar, residential solar, solar inverter, solar battery, net metering, solar subsidy, PM Surya Ghar Yojana",
  author: "Sologix Energy",
  twitterHandle: "@sologixenergy",
  facebookAppId: "sologixenergy",
  googleAnalyticsId: "G-XXXXXXXXXX", // Replace with actual GA ID
  googleTagManagerId: "GTM-XXXXXXX", // Replace with actual GTM ID
  tileColor: "#00237D",
  themeColor: "#00237D",
};

// Page-specific SEO data
export const pageSeoData = {
  "/": {
    title: "Sologix Energy - India's Leading Solar Power Solutions Provider",
    description: "Transform your energy future with Sologix Energy's premium solar solutions. Expert installation, 25+ years experience, 10K+ panels installed. Get clean, reliable, and affordable solar power for your home and business.",
    keywords: "solar energy India, solar panels India, solar power solutions, renewable energy, clean energy, solar installation, rooftop solar, commercial solar, residential solar, PM Surya Ghar Yojana, solar subsidy India",
    canonical: "https://sologixenergy.com",
    ogImage: "/og-home.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sologix Energy",
      "url": "https://sologixenergy.com",
      "logo": "https://sologixenergy.com/logo.png",
      "description": "Leading solar power solutions provider in India",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "STPI Building, Plot -8, Namkum Industrial Area",
        "addressLocality": "Ranchi",
        "addressRegion": "Jharkhand",
        "postalCode": "834010",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8287766474",
        "contactType": "customer service",
        "email": "info@sologixenergy.com"
      },
      "sameAs": [
        "https://facebook.com/sologixenergy",
        "https://twitter.com/sologixenergy",
        "https://instagram.com/sologixenergy",
        "https://linkedin.com/company/sologixenergy",
        "https://youtube.com/@sologixenergy"
      ]
    }
  },
  "/aboutus": {
    title: "About Sologix Energy - 25+ Years of Solar Excellence in India",
    description: "Learn about Sologix Energy's 25+ years of experience in solar power solutions. Our mission to make clean energy accessible to all Indians through innovative solar technology and expert installation services.",
    keywords: "about sologix energy, solar company history, solar experience, solar mission, clean energy mission, solar team, solar expertise, renewable energy company",
    canonical: "https://sologixenergy.com/aboutus",
    ogImage: "/og-about.jpg"
  },
  "/forhome": {
    title: "Residential Solar Solutions - Power Your Home with Clean Energy",
    description: "Transform your home with Sologix Energy's residential solar solutions. Save up to 90% on electricity bills with our high-efficiency solar panels. Expert installation, 25-year warranty, and government subsidies available.",
    keywords: "residential solar, home solar panels, rooftop solar, solar for home, solar electricity, solar savings, solar warranty, solar installation home, PM Surya Ghar Yojana, solar subsidy home",
    canonical: "https://sologixenergy.com/forhome",
    ogImage: "/og-home-solar.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Residential Solar Installation",
      "provider": {
        "@type": "Organization",
        "name": "Sologix Energy"
      },
      "description": "Complete residential solar power solutions for Indian homes",
      "areaServed": "India",
      "serviceType": "Solar Installation"
    }
  },
  "/solorbusiness": {
    title: "Commercial Solar Solutions - Power Your Business with Solar Energy",
    description: "Boost your business with Sologix Energy's commercial solar solutions. Reduce operational costs by up to 80% with our industrial-grade solar systems. Expert installation, maintenance, and ROI optimization.",
    keywords: "commercial solar, business solar, industrial solar, solar for business, solar ROI, solar investment, solar maintenance, commercial solar installation, solar energy business",
    canonical: "https://sologixenergy.com/solorbusiness",
    ogImage: "/og-business-solar.jpg"
  },
  "/becomepartner": {
    title: "Become a Solar Partner - Join Sologix Energy's Network",
    description: "Join Sologix Energy's partner network and grow your business in the solar industry. Get training, support, and exclusive products. Start your solar journey with India's leading solar company.",
    keywords: "solar partner, solar dealer, solar distributor, solar franchise, solar business opportunity, solar partnership, solar network, solar training",
    canonical: "https://sologixenergy.com/becomepartner",
    ogImage: "/og-partner.jpg"
  },
  "/contactus": {
    title: "Contact Sologix Energy - Get Free Solar Consultation",
    description: "Get in touch with Sologix Energy for free solar consultation. Our experts will help you choose the perfect solar solution for your needs. Call +91-8287766474 or visit our office in Ranchi.",
    keywords: "contact sologix energy, solar consultation, solar quote, solar inquiry, solar contact, solar support, solar helpline",
    canonical: "https://sologixenergy.com/contactus",
    ogImage: "/og-contact.jpg"
  },
  "/afterleadingpage": {
    title: "Solar Products - Explore Our Range of Solar Solutions",
    description: "Browse Sologix Energy's comprehensive range of solar products. From residential to commercial solutions, find the perfect solar system for your energy needs. Expert consultation and installation included.",
    keywords: "solar products, solar systems, solar panels, solar inverters, solar batteries, solar accessories, solar equipment, solar technology",
    canonical: "https://sologixenergy.com/afterleadingpage",
    ogImage: "/og-products.jpg"
  },
  "/cart": {
    title: "Shopping Cart - Complete Your Solar Order",
    description: "Review your selected solar products and complete your order. Secure checkout with flexible payment options and expert consultation included with every purchase.",
    keywords: "solar cart, solar order, solar checkout, solar purchase, solar shopping",
    canonical: "https://sologixenergy.com/cart",
    ogImage: "/og-cart.jpg"
  },
  "/payment-history": {
    title: "Payment History - Track Your Solar Investments",
    description: "View your solar investment history and track all payments made to Sologix Energy. Access detailed invoices and payment receipts for your records.",
    keywords: "payment history, solar payments, solar invoices, solar receipts, solar investment tracking",
    canonical: "https://sologixenergy.com/payment-history",
    ogImage: "/og-payments.jpg"
  }
};

// Generate meta tags for a page
export const generateMetaTags = (pathname, customData = {}) => {
  const pageData = pageSeoData[pathname] || pageSeoData["/"];
  const data = { ...pageData, ...customData };
  
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    canonical: data.canonical,
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.canonical,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${data.ogImage || '/og-default.jpg'}`,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [`${seoConfig.siteUrl}${data.ogImage || '/og-default.jpg'}`],
      creator: seoConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    alternates: {
      canonical: data.canonical,
    },
  };
};

// Generate structured data for a page
export const generateStructuredData = (pathname, customData = {}) => {
  const pageData = pageSeoData[pathname] || pageSeoData["/"];
  const data = { ...pageData, ...customData };
  
  return data.structuredData || null;
};

// Generate sitemap data
export const generateSitemapData = () => {
  const baseUrl = seoConfig.siteUrl;
  const currentDate = new Date().toISOString();
  
  return Object.keys(pageSeoData).map(path => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified: currentDate,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.8,
  }));
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

Sitemap: ${seoConfig.siteUrl}/sitemap.xml

# Block access to admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Allow all other content
Allow: /`;
};

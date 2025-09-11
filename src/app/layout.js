import './globals.css';
import { Inter } from 'next/font/google';
import { ClientLayout } from './ClientLayout';
import { generateMetaTags } from '@/utils/seo';
import StructuredData from '@/components/common/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  ...generateMetaTags('/'),
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  authors: [{ name: 'Sologix Energy' }],
  creator: 'Sologix Energy',
  publisher: 'Sologix Energy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sologixenergy.com'),
  alternates: {
    canonical: 'https://sologixenergy.com',
  },
  category: 'technology',
  applicationName: 'Sologix Energy',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#00237D',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sologix-web-nvm3.vercel.app" />
        <meta name="theme-color" content="#00237D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no,address=no,email=no" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <link rel="canonical" href="https://sologixenergy.com" />
        <meta property="og:site_name" content="Sologix Energy" />
        <meta name="twitter:site" content="@sologixenergy" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

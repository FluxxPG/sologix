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
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

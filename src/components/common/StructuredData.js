"use client";
import { generateStructuredData } from '@/utils/seo';
import { usePathname } from 'next/navigation';

export default function StructuredData({ customData = {} }) {
  const pathname = usePathname();
  const structuredData = generateStructuredData(pathname, customData);

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

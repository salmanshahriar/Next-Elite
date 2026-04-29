import { baseUrl } from '@/features/site/config';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/api/', '/dashboard'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/login', '/api/', '/dashboard'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

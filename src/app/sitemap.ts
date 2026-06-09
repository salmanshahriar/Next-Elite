import { baseUrl } from '@/features/site/config';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/ui-components', '/about', '/login', '/unauthorized'];
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : ('monthly' as const),
    priority: path === '' ? 1 : 0.8,
  }));
}

import { baseUrl } from '@/features/site/config';
import type { MetadataRoute } from 'next';

type SitemapEntry = MetadataRoute.Sitemap[number];

const routes: (Pick<SitemapEntry, 'changeFrequency' | 'priority'> & {
  path: string;
})[] = [{ path: '', changeFrequency: 'weekly', priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}

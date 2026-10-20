import { siteConfigSchema } from '@/features/site/schema';
import siteData from '@/features/site/site.config.json';
import { describe, expect, it } from 'vitest';

describe('site.config.json', () => {
  it('matches the site config schema', () => {
    expect(siteConfigSchema.safeParse(siteData).error?.issues).toBeUndefined();
  });

  it('defines every supported locale', () => {
    const { supported, default: fallback, locales } = siteData.languages;
    expect(supported).toContain(fallback);
    for (const code of supported) expect(locales).toHaveProperty(code);
  });
});

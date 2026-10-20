import type { SiteConfig } from './schema';
import siteData from './site.config.json';

export const siteConfig = siteData as SiteConfig;

export type Locale = keyof SiteConfig['languages']['locales'];

export const supportedLocales: readonly Locale[] = siteConfig.languages
  .supported as readonly Locale[];

export const defaultLocale: Locale = siteConfig.languages.default as Locale;

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return siteConfig.languages.locales[locale]?.direction ?? 'ltr';
}

import { publicEnv } from '@/core/env';
import {
  siteConfigSchema,
  type SiteConfig,
} from '@/lib/validation/site-config';
import seoData from './app-main-meta-data.json';

export const siteConfig = siteConfigSchema.parse(seoData);

const envUrl = publicEnv.NEXT_PUBLIC_APP_URL?.trim();

export const baseUrl = envUrl || siteConfig.domain || 'https://yourdomain.com';

export type Locale = keyof SiteConfig['languages']['locales'];

export const supportedLocales = siteConfig.languages
  .supported as readonly Locale[];
export const defaultLocale = siteConfig.languages.default as Locale;

export type { SiteConfig };

import type { Locale } from '@/lib/config/site';
import { defaultLocale, supportedLocales } from '@/lib/config/site';
import { z } from 'zod';

const supportedLocaleSet = new Set(supportedLocales);

export const localeSchema = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase())
  .pipe(z.custom<Locale>((value) => supportedLocaleSet.has(value as Locale)));

export function resolveLocale(value: string | null | undefined): Locale {
  const parsed = localeSchema.safeParse(value);
  return parsed.success ? parsed.data : defaultLocale;
}

import {
  defaultLocale,
  supportedLocales,
  type Locale,
} from '@/features/site/config';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const routing = {
  locales: supportedLocales,
  defaultLocale,
  cookieName: LOCALE_COOKIE_NAME,
} as const;

export function isValidLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (supportedLocales as readonly string[]).includes(value)
  );
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isValidLocale(value) ? value : defaultLocale;
}

export type { Locale };

import { type Locale } from '@/features/i18n/types/types';
import { resolveLocale } from '@/lib/validation/i18n';
import { cookies } from 'next/headers';

const LOCALE_COOKIE_NAME = 'locale';

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return resolveLocale(cookieLocale);
}

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

'use client';

import { getLocaleDirection, type Locale } from '@/features/site/config';
import { useLocale } from 'next-intl';

export function useIsRtl() {
  const locale = useLocale() as Locale;
  return getLocaleDirection(locale) === 'rtl';
}

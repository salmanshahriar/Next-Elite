'use client';

import { supportedLocales, type Locale } from '@/features/site/config';
import { Icon } from '@/components/icons/app-icons';
import { useLocale } from 'next-intl';
import { lazy, Suspense } from 'react';

const LanguageMenu = lazy(() => import('./language-menu'));

const localeShortCodes: Record<string, string> = supportedLocales.reduce(
  (acc, code) => {
    acc[code] = code.split('-')[0]?.toUpperCase() ?? code.toUpperCase();
    return acc;
  },
  {} as Record<string, string>,
);

const LanguageSwitcher = () => {
  const currentLocale = useLocale() as Locale;

  const trigger = (
    <button className="flex cursor-pointer items-center gap-1.5 rounded-md border-0 bg-transparent px-2 py-1.5 text-muted-foreground transition-all hover:text-foreground focus:outline-hidden">
      <Icon name="globe" className="h-4 w-4" />
      <span className="text-sm font-medium">
        {localeShortCodes[currentLocale]}
      </span>
      <Icon name="down" className="h-3 w-3 opacity-60" />
      <span className="sr-only">Change language</span>
    </button>
  );

  return (
    <Suspense fallback={trigger}>
      <LanguageMenu trigger={trigger} />
    </Suspense>
  );
};

export default LanguageSwitcher;

'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  siteConfig,
  supportedLocales,
  type Locale,
} from '@/features/site/config';
import { cn } from '@/libs/utils';
import { useLocale } from 'next-intl';
import { useTransition, type ReactElement } from 'react';
import { setLocaleAction } from '../../features/i18n/locale-actions';

const localeLabels: Record<string, string> = supportedLocales.reduce(
  (acc, code) => {
    acc[code] = siteConfig.languages.locales[code]?.nativeName ?? code;
    return acc;
  },
  {} as Record<string, string>,
);

const LanguageMenu = ({ trigger }: { trigger: ReactElement }) => {
  const currentLocale = useLocale() as Locale;
  const [, startTransition] = useTransition();

  const switchLocale = (locale: Locale) => {
    startTransition(() => {
      void setLocaleAction(locale);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[160px] rounded-lg border border-border/60 bg-popover/95 p-1.5 shadow-lg backdrop-blur-xl"
      >
        {supportedLocales.map((loc) => {
          const isActive = currentLocale === loc;
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                'cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {localeLabels[loc]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;

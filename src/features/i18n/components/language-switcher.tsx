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
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { setLocaleAction } from '../locale-actions';

const localeLabels: Record<string, string> = supportedLocales.reduce(
  (acc, code) => {
    acc[code] = siteConfig.languages.locales[code]?.nativeName ?? code;
    return acc;
  },
  {} as Record<string, string>,
);

const localeShortCodes: Record<string, string> = supportedLocales.reduce(
  (acc, code) => {
    acc[code] = code.split('-')[0]?.toUpperCase() ?? code.toUpperCase();
    return acc;
  },
  {} as Record<string, string>,
);

interface LanguageSwitcherProps {
  variant?: 'default' | 'titled';
  title?: string;
}

const LanguageSwitcher = ({
  variant = 'default',
  title = 'Language',
}: LanguageSwitcherProps) => {
  const currentLocale = useLocale() as Locale;
  const [, startTransition] = useTransition();

  const switchLocale = (locale: Locale) => {
    startTransition(() => {
      void setLocaleAction(locale);
    });
  };

  const dropdownContent = (
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
  );

  if (variant === 'titled') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 text-start transition-all hover:bg-accent/60">
            <span className="truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {title}
            </span>
            <span className="flex h-9 items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="text-[11px] font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                {localeShortCodes[currentLocale]}
              </span>
            </span>
            <span className="sr-only">Change language</span>
          </button>
        </DropdownMenuTrigger>
        {dropdownContent}
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1.5 rounded-md border-0 bg-transparent px-2 py-1.5 text-muted-foreground transition-all hover:text-foreground focus:outline-hidden">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide">
            {localeShortCodes[currentLocale]}
          </span>
          <ChevronDown className="h-3 w-3 opacity-60" />
          <span className="sr-only">Change language</span>
        </button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

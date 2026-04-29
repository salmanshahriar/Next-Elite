'use client';

import { Button } from '@/components/ui/button';
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
import { Languages } from 'lucide-react';
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

  const items = (
    <DropdownMenuContent align="end">
      {supportedLocales.map((loc) => (
        <DropdownMenuItem
          key={loc}
          onClick={() => switchLocale(loc)}
          className={currentLocale === loc ? 'bg-accent' : ''}
        >
          <span>{localeLabels[loc]}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );

  if (variant === 'titled') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 text-left transition-all hover:bg-accent/60">
            <span className="truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {title}
            </span>
            <span className="flex h-9 w-9 items-center justify-center">
              <Languages className="h-4 w-4" />
            </span>
            <span className="sr-only">Change language</span>
          </button>
        </DropdownMenuTrigger>
        {items}
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      {items}
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

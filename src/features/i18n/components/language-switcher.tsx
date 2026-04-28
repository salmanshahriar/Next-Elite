'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/features/i18n/hooks/language-context';
import { type Locale, LOCALES } from '@/features/i18n/types/types';
import { siteConfig } from '@/features/site/config/site';
import { Languages } from 'lucide-react';
import { useEffect } from 'react';

function getLocaleLabels(): Record<Locale, string> {
  const labels = {} as Record<Locale, string>;
  for (const code of LOCALES) {
    labels[code as Locale] =
      siteConfig.languages.locales[code]?.nativeName ?? code;
  }
  return labels;
}

const localeLabels = getLocaleLabels();

interface LanguageSwitcherProps {
  variant?: 'default' | 'titled';
  title?: string;
}

const LanguageSwitcher = ({
  variant = 'default',
  title = 'Language',
}: LanguageSwitcherProps) => {
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const dropdownMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={locale === loc ? 'bg-accent' : ''}
          >
            <span>{localeLabels[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (variant === 'titled') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-2 text-left transition-all hover:bg-accent/60">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {title}
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center">
              <Languages className="h-4 w-4" />
            </div>
            <span className="sr-only">Change language</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LOCALES.map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={locale === loc ? 'bg-accent' : ''}
            >
              <span>{localeLabels[loc]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return dropdownMenu;
};

export default LanguageSwitcher;

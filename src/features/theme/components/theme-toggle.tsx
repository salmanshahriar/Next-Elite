'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/features/theme/context/theme-provider';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ThemeToggleProps {
  variant?: 'default' | 'titled';
  title?: string;
}

export function ThemeToggle({
  variant = 'default',
  title = 'Theme',
}: ThemeToggleProps) {
  const { setTheme } = useTheme();
  const t = useTranslations();

  const themeIcons = (
    <span suppressHydrationWarning className="relative inline-flex h-4 w-4">
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </span>
  );

  const items = (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setTheme('light')}>
        <Sun className="mr-2 h-4 w-4" />
        <span>{t('theme.light')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        <Moon className="mr-2 h-4 w-4" />
        <span>{t('theme.dark')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        <Monitor className="mr-2 h-4 w-4" />
        <span>{t('theme.system')}</span>
      </DropdownMenuItem>
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
              {themeIcons}
            </span>
            <span className="sr-only">{t('common.toggleTheme')}</span>
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
          {themeIcons}
          <span className="sr-only">{t('common.toggleTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      {items}
    </DropdownMenu>
  );
}

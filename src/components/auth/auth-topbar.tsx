'use client';

import LanguageSwitcher from '@/components/shared/language-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/app-icons';
import Link from 'next/link';

export function AuthTopbar() {
  return (
    <div className="flex w-full items-center justify-between py-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-8 gap-1 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
      >
        <Link href="/" aria-label="Go back to home">
          <Icon name="left" className="h-5 w-5 text-primary" />
          <span className="text-primary">Back</span>
        </Link>
      </Button>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

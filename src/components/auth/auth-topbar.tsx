'use client';

import LanguageSwitcher from '@/components/shared/language-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export function AuthTopbar() {
  return (
    <div className="flex w-full items-center justify-end py-2">
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

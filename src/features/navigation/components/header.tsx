'use client';

import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/auth-context';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { getTranslations } from '@/features/i18n/config/get-translations';
import { useLanguage } from '@/features/i18n/hooks/language-context';
import { useTranslations } from '@/features/i18n/hooks/use-translations';
import { siteConfig } from '@/features/site/config/site';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const { locale } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="z-10 flex items-center">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-2.5 font-bold text-primary',
                isRtl && 'flex-row-reverse',
              )}
            >
              <Logo size={28} className="h-7 w-7" />
              <div className="flex flex-col text-lg leading-tight font-semibold whitespace-nowrap">
                {siteConfig.appName || siteConfig.title}
              </div>
            </Link>
          </div>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t('navigation.home')}
            </Link>
            <Link
              href="/about"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/about'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t('navigation.about')}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname?.startsWith('/dashboard')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('navigation.dashboard')}
              </Link>
            )}
          </nav>

          <div className="z-10 hidden items-center gap-2 md:flex">
            <div className="mr-2 flex items-center gap-1 border-r border-border pr-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="max-w-[120px] truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={logout}
                >
                  {t('navigation.logout')}
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="h-8 text-xs">
                  {t('navigation.login')}
                </Button>
              </Link>
            )}
          </div>

          <div className="z-10 flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('navigation.home')}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/about'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('navigation.about')}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname?.startsWith('/dashboard')
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {t('navigation.dashboard')}
                </Link>
              )}
            </nav>

            <div className="border-t border-border pt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t('navigation.logout')}
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    {t('navigation.login')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

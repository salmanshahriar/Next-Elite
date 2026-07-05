'use client';

import { AppBrand } from '@/components/shared/app-brand';
import { UserDropdown } from '@/components/shared/user-dropdown';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { setHeaderChromeActive } from '@/features/theme/context/theme-provider';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/libs/utils';
import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const { user } = useAuth();
  const pathname = usePathname();
  const isRtl = locale === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScroll(50);
  const headerActive = scrolled || mobileMenuOpen;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setHeaderChromeActive(headerActive);
  }, [headerActive]);

  useEffect(() => {
    const onThemeChange = () => setHeaderChromeActive(headerActive);
    window.addEventListener('theme-change', onThemeChange);
    return () => window.removeEventListener('theme-change', onThemeChange);
  }, [headerActive]);

  useEffect(() => {
    return () => setHeaderChromeActive(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex w-full flex-col justify-center pt-[env(safe-area-inset-top,0px)] transition-all duration-300',
        headerActive
          ? 'border-b border-border/40 bg-background/95 backdrop-blur-xl'
          : 'border-b-0 border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-app-header items-center justify-between">
          <div className="z-10 flex items-center">
            <AppBrand href="/" isRtl={isRtl} />
          </div>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t('home')}
            </Link>
            <Link
              href="/ui-components"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/ui-components'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t('uiComponents')}
            </Link>
            <Link
              href="/about"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/about'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {t('about')}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname?.startsWith('/dashboard')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('dashboard')}
              </Link>
            )}
          </nav>

          <div className="z-10 hidden items-center gap-2 md:flex">
            <div className="me-2 flex items-center gap-1 border-e border-border pe-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <UserDropdown hideEmailOnMobile />
            ) : (
              <Button asChild size="sm" className="h-8 rounded-full text-xs">
                <Link href="/login">{t('login')}</Link>
              </Button>
            )}
          </div>

          <div className="z-10 flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle menu"
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

      <div
        className={cn(
          'absolute top-full left-0 z-20 grid w-full overflow-hidden bg-background/98 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden',
          mobileMenuOpen
            ? 'grid-rows-[1fr] border-t border-b border-border/40'
            : 'pointer-events-none grid-rows-[0fr] border-t-0 border-b-0 border-transparent',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              'mx-auto max-w-7xl space-y-3 px-4 py-4 transition-all duration-300 ease-in-out',
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4',
            )}
          >
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('home')}
              </Link>
              <Link
                href="/ui-components"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/ui-components'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('uiComponents')}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/about'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {t('about')}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname?.startsWith('/dashboard')
                      ? 'text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  {t('dashboard')}
                </Link>
              )}
            </nav>

            <div className="flex items-center justify-center gap-4 border-t border-border pt-4">
              {user ? (
                <UserDropdown
                  contentClassName="w-56"
                  onLogout={() => setMobileMenuOpen(false)}
                />
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs"
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    {t('login')}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

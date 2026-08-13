'use client';

import { AppBrand } from '@/components/shared/app-brand';
import { UserDropdown } from '@/components/shared/user-dropdown';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { setHeaderChromeActive } from '@/features/theme/context/theme-provider';
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
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const headerActive = scrollOpacity > 0.05 || mobileMenuOpen;
  const surfaceOpacity = mobileMenuOpen ? 1 : scrollOpacity;

  useEffect(() => {
    const updateScrollOpacity = () => {
      setScrollOpacity(Math.min(1, Math.max(0, window.scrollY / 72)));
    };

    updateScrollOpacity();
    window.addEventListener('scroll', updateScrollOpacity, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollOpacity);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((open) => {
      const next = !open;
      document.body.classList.toggle('overflow-hidden', next);
      return next;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  useEffect(() => {
    setHeaderChromeActive(headerActive);
    return () => setHeaderChromeActive(false);
  }, [headerActive]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <header className="relative sticky top-0 z-30 mx-0 shrink-0 rounded-none md:top-2 md:mx-2 md:rounded-xl">
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-none border-0 border-b bg-background/90 shadow-sm backdrop-blur-md md:rounded-xl md:border dark:bg-card',
          headerActive
            ? 'border-border/40 dark:border-border/60'
            : 'border-b-transparent md:border-transparent',
        )}
        style={{ opacity: surfaceOpacity }}
      />
      <div className="relative z-10 px-3 md:px-4 lg:px-8">
        <div className="flex h-app-header items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex min-w-0 items-center justify-start">
            <AppBrand href="/" isRtl={isRtl} />
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
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
                  : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
              )}
            >
              {t('uiComponents')}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname?.startsWith('/dashboard')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('dashboard')}
              </Link>
            )}
          </nav>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <div className="me-2 flex items-center gap-1 border-e border-border/40 pe-2">
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

          <div className="flex shrink-0 items-center justify-end gap-1 md:hidden">
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
          'relative z-10 grid overflow-hidden border-t transition-[border-color,grid-template-rows] duration-300 ease-out md:hidden',
          mobileMenuOpen
            ? 'grid-rows-[1fr] border-border/40'
            : 'pointer-events-none grid-rows-[0fr] border-transparent',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              'space-y-3 px-4 py-4 transition-all duration-300 ease-in-out sm:px-6',
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4',
            )}
          >
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('home')}
              </Link>
              <Link
                href="/ui-components"
                onClick={closeMobileMenu}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/ui-components'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('uiComponents')}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname?.startsWith('/dashboard')
                      ? 'text-primary'
                      : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                  )}
                >
                  {t('dashboard')}
                </Link>
              )}
            </nav>

            <div className="flex items-center justify-center gap-4 border-t border-border/40 pt-4">
              {user ? (
                <UserDropdown
                  contentClassName="w-56"
                  onLogout={closeMobileMenu}
                />
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs"
                >
                  <Link href="/login" onClick={closeMobileMenu}>
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

'use client';

import { AppBrand } from '@/components/layout/app-brand';
import LanguageSwitcher from '@/components/shared/language-switcher';
import { setHeaderChromeActive } from '@/components/shared/theme-provider';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import type { AuthUser } from '@/features/auth/types';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/icons/app-icons';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserDropdown = dynamic(() =>
  import('@/components/shared/user-dropdown').then(
    (mod) => mod.StandaloneUserDropdown,
  ),
);

const HIDE_AFTER_PX = 80;
const SCROLL_DELTA_PX = 6;

interface HeaderProps {
  user: AuthUser | null;
}

const Header = ({ user }: HeaderProps) => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const headerActive = scrollOpacity > 0.05 || mobileMenuOpen;
  const surfaceOpacity = mobileMenuOpen ? 1 : scrollOpacity;
  const isHidden = hiddenOnScroll && !mobileMenuOpen;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollY = window.scrollY;
        setScrollOpacity(Math.min(1, Math.max(0, scrollY / 72)));

        const delta = scrollY - lastScrollY;
        if (scrollY < HIDE_AFTER_PX) {
          setHiddenOnScroll(false);
        } else if (Math.abs(delta) > SCROLL_DELTA_PX) {
          setHiddenOnScroll(delta > 0);
        } else {
          return;
        }
        lastScrollY = scrollY;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setHeaderChromeActive(headerActive);
    return () => setHeaderChromeActive(false);
  }, [headerActive]);

  return (
    <header
      className={cn(
        'relative sticky top-0 z-30 mx-0 shrink-0 rounded-none transition-transform duration-300 ease-out motion-reduce:transition-none md:top-2 md:mx-2 md:rounded-md',
        isHidden && '-translate-y-[calc(100%+0.5rem)]',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-none border-0 border-b bg-background shadow-sm backdrop-blur-md md:rounded-md md:border dark:bg-card',
          headerActive
            ? 'border-border/40 dark:border-border/60'
            : 'border-b-transparent md:border-transparent',
        )}
        style={{ opacity: surfaceOpacity }}
      />
      <div className="relative z-10 px-3 md:px-4 lg:px-8">
        <div className="flex h-app-header items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex items-center justify-start">
            <AppBrand href="/" />
          </div>

          <nav
            aria-label={t('primary')}
            className="hidden items-center gap-1 md:flex"
          >
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'bg-primary/8 font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
              )}
            >
              {t('home')}
            </Link>
            <Link
              href="/ui-components"
              aria-current={pathname === '/ui-components' ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/ui-components'
                  ? 'bg-primary/8 font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
              )}
            >
              {t('uiComponents')}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                aria-current={
                  pathname?.startsWith('/dashboard') ? 'page' : undefined
                }
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname?.startsWith('/dashboard')
                    ? 'bg-primary/8 font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('dashboard')}
              </Link>
            )}
          </nav>

          <div className="hidden items-center justify-end gap-3 md:flex">
            <div className="flex items-center gap-1 border-e border-border/40 pe-1">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <UserDropdown user={user} hideEmailOnMobile />
            ) : (
              <Button asChild size="sm" className="text-xs">
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
              aria-label={t('menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? (
                <Icon name="close" className="h-5 w-5" />
              ) : (
                <Icon name="menu" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        inert={!mobileMenuOpen ? true : undefined}
        className={cn(
          'relative z-10 grid overflow-hidden border-t transition-[border-color,grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden',
          mobileMenuOpen
            ? 'grid-rows-[1fr] border-border/40'
            : 'pointer-events-none grid-rows-[0fr] border-transparent',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              'space-y-3 px-4 py-4 transition-all duration-300 ease-in-out motion-reduce:transition-none sm:px-6',
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4',
            )}
          >
            <nav
              id="mobile-nav"
              aria-label={t('menu')}
              className="flex flex-col gap-1"
            >
              <Link
                href="/"
                onClick={closeMobileMenu}
                aria-current={pathname === '/' ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-primary/8 font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('home')}
              </Link>
              <Link
                href="/ui-components"
                onClick={closeMobileMenu}
                aria-current={
                  pathname === '/ui-components' ? 'page' : undefined
                }
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === '/ui-components'
                    ? 'bg-primary/8 font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                )}
              >
                {t('uiComponents')}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  aria-current={
                    pathname?.startsWith('/dashboard') ? 'page' : undefined
                  }
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname?.startsWith('/dashboard')
                      ? 'bg-primary/8 font-semibold text-primary'
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
                  user={user}
                  contentClassName="w-56"
                  onLogout={closeMobileMenu}
                />
              ) : (
                <Button asChild size="sm" className="text-xs">
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

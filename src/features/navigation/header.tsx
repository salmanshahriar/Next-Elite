'use client';

import { Logo } from '@/components/shared/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { siteConfig } from '@/features/site/config';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { setHeaderChromeActive } from '@/features/theme/context/theme-provider';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/libs/utils';
import { LogOut, Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const { user, signOut } = useAuth();
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

  const initials = user?.email?.split('@')[0]?.slice(0, 2).toUpperCase() || 'U';

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
        <div className="relative flex h-[60px] items-center justify-between">
          <div className="z-10 flex items-center">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-2.5 font-bold text-foreground',
                isRtl && 'flex-row-reverse',
              )}
            >
              <Logo size={28} className="h-7 w-7" />
              <span className="text-lg leading-tight font-semibold whitespace-nowrap">
                {siteConfig.appName || siteConfig.title}
              </span>
            </Link>
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
            <div className="mr-2 flex items-center gap-1 border-r border-border pr-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-border/40 bg-background/40 p-1 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-accent/40 focus:outline-hidden">
                    <Avatar className="size-8 h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[120px] truncate pr-2 text-xs font-medium text-foreground lg:inline-block">
                      {user.email}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center justify-between gap-2">
                      <span className="max-w-[140px] truncate text-sm leading-none font-medium">
                        {user.email}
                      </span>
                      <span
                        className={cn(
                          'inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold capitalize',
                          user.role === 'admin'
                            ? 'border-primary/20 bg-primary/15 text-primary'
                            : 'border-border bg-muted text-muted-foreground',
                        )}
                      >
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => void signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex shrink-0 cursor-pointer items-center rounded-full border border-border/40 bg-background/40 p-1 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-accent/40 focus:outline-hidden">
                      <Avatar className="size-8 h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-[120px] truncate pr-2 text-xs font-medium text-foreground">
                        {user.email}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center justify-between gap-2">
                        <span className="max-w-[120px] truncate text-sm leading-none font-medium">
                          {user.email}
                        </span>
                        <span
                          className={cn(
                            'inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold capitalize',
                            user.role === 'admin'
                              ? 'border-primary/20 bg-primary/15 text-primary'
                              : 'border-border bg-muted text-muted-foreground',
                          )}
                        >
                          {user.role}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={() => {
                        void signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

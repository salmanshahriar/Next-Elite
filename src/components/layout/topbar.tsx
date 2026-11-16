'use client';

import LanguageSwitcher from '@/components/shared/language-switcher';
import { DocumentTitle } from '@/components/shared/document-title';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserDropdown } from '@/components/shared/user-dropdown';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import { Icon } from '@/components/icons/app-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';

export function Topbar() {
  const t = useTranslations();
  const { user } = useAuth();
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();

  const segments = useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname],
  );

  const formatSegment = (segment: string) => {
    const key = `navigation.${segment}` as Parameters<typeof t>[0];
    return t.has(key)
      ? t(key)
      : segment
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const lastSegment = segments.at(-1);
  const pageTitle = lastSegment
    ? formatSegment(lastSegment)
    : t('navigation.dashboard');

  return (
    <header className="sticky top-0 z-30 hidden h-app-header shrink-0 items-center justify-between border-b border-border/40 bg-muted/70 px-4 sm:px-6 md:flex lg:px-8 dark:border-border/60 dark:bg-background">
      <DocumentTitle title={pageTitle} />
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="-ms-2 h-8 w-8 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          onClick={toggleSidebar}
          aria-expanded={open}
          aria-label={
            open ? t('common.collapseSidebar') : t('common.expandSidebar')
          }
        >
          <Icon name="sidebarSimple" weight="fill" className="h-4 w-4" />
        </Button>

        <div className="min-w-0 flex-1">
          <Breadcrumb aria-label={t('common.breadcrumbs')}>
            <BreadcrumbList>
              {segments.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('navigation.dashboard')}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;
                  const href = `/${segments.slice(0, index + 1).join('/')}`;
                  const label = formatSegment(segment);

                  return (
                    <Fragment key={href}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-e border-border/40 pe-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {user && <UserDropdown hideEmailOnMobile />}
      </div>
    </header>
  );
}

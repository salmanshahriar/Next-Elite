'use client';

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
import { useAuth } from '@/features/auth/hooks/auth-provider';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { useSidebarCollapsed } from './sidebar';

export function Topbar() {
  const t = useTranslations();
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useSidebarCollapsed();

  const segments = pathname.split('/').filter(Boolean);

  const segmentLabels: Record<string, string> = {
    dashboard: t('navigation.dashboard'),
    profile: t('navigation.profile'),
  };

  const getSegmentLabel = (segment: string) =>
    segmentLabels[segment] ??
    segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <header className="sticky top-2 z-30 me-2 mt-2 mb-2 hidden h-app-header shrink-0 items-center justify-between rounded-xl border border-border/40 bg-background/90 px-4 md:flex md:px-6 dark:border-border/60 dark:bg-background">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>

        <div className="min-w-0 flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              {segments.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('navigation.dashboard')}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;
                  const path = `/${segments.slice(0, index + 1).join('/')}`;
                  const label = getSegmentLabel(segment);

                  return (
                    <Fragment key={path}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
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
        <div className="flex items-center gap-1 border-e border-border/40 pe-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {user && <UserDropdown hideEmailOnMobile />}
      </div>
    </header>
  );
}

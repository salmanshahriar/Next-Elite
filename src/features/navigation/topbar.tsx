'use client';

import React from 'react';

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
    <header className="topbar-glass sticky top-0 z-30 hidden h-app-header w-full shrink-0 items-center justify-between border-b border-border/40 px-4 md:flex md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-8 w-8 cursor-pointer text-muted-foreground hover:bg-accent/40 hover:text-foreground md:flex"
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
                    <React.Fragment key={path}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Right Hand Actions */}
      <div className="flex items-center gap-3">
        {/* Theme and Translation Selectors */}
        <div className="flex items-center gap-1 border-e border-border/40 pe-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* User Account Menu */}
        {user && <UserDropdown hideEmailOnMobile />}
      </div>
    </header>
  );
}

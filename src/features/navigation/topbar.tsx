'use client';

import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { cn } from '@/libs/utils';
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useSidebarCollapsed } from './sidebar';

export function Topbar() {
  const t = useTranslations();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useSidebarCollapsed();

  // Extract initials from email
  const initials = user?.email?.split('@')[0]?.slice(0, 2).toUpperCase() || 'U';

  // Generate breadcrumbs from path
  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="topbar-glass sticky top-0 z-30 hidden h-[61px] w-full shrink-0 items-center justify-between border-b border-border/40 px-4 md:flex md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Sidebar Toggle Button for Desktop */}
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

        {/* Dynamic Breadcrumbs */}
        <div className="min-w-0 flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              {segments.length === 1 && segments[0] === 'dashboard' ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('navigation.dashboard')}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                      {t('navigation.dashboard')}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {segments.slice(1).map((segment, index) => {
                    const isLast = index === segments.length - 2;
                    const path = `/dashboard/${segments.slice(1, index + 2).join('/')}`;
                    const displayLabel =
                      segment.charAt(0).toUpperCase() + segment.slice(1);
                    return (
                      <React.Fragment key={path}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{displayLabel}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={path}>
                              {displayLabel}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Right Hand Actions */}
      <div className="flex items-center gap-3">
        {/* Theme and Translation Selectors */}
        <div className="flex items-center gap-1 border-r border-border/40 pr-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* User Account Menu */}
        {user && (
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
                <span>{t('navigation.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

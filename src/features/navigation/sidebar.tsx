'use client';

import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import type { AuthUser } from '@/features/auth/types';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { siteConfig } from '@/features/site/config';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { cn } from '@/libs/utils';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from 'react';

interface MenuItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface SidebarContentProps {
  user: AuthUser | null;
  pathname: string;
  isRtl: boolean;
  menuItems: MenuItem[];
  labels: {
    adminPanel: string;
    userPanel: string;
    theme: string;
    language: string;
    logout: string;
  };
  onLogoutRequest: () => void;
  onItemClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function SidebarContent({
  user,
  pathname,
  isRtl,
  menuItems,
  labels,
  onLogoutRequest,
  onItemClick,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col bg-background',
        isRtl && 'text-right',
      )}
    >
      <div
        className={cn(
          'flex items-center border-b border-border transition-all',
          isCollapsed ? 'h-14 justify-center px-2' : 'h-14 px-4',
        )}
      >
        <Link
          href="/"
          onClick={onItemClick}
          className={cn(
            'flex items-center gap-2 font-bold text-primary transition-all',
            isCollapsed ? 'justify-center' : 'justify-start',
          )}
        >
          <Logo size={28} className="h-7 w-7" />
          {!isCollapsed && (
            <span className="text-md leading-tight font-semibold whitespace-nowrap">
              {siteConfig.appName || siteConfig.title}
            </span>
          )}
        </Link>
      </div>

      {!isCollapsed && user && onToggleCollapse && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-primary">
              {user.role === 'admin' ? labels.adminPanel : labels.userPanel}
            </div>
            <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
              {user.email}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 hover:bg-accent/60"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
          >
            {isRtl ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const link = (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isCollapsed && 'justify-center px-2',
              )}
            >
              <Icon
                className={cn('h-4 w-4 shrink-0', isCollapsed && 'mx-auto')}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );

          if (isCollapsed) {
            return (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side={isRtl ? 'left' : 'right'}>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return link;
        })}
      </nav>

      <div className="border-t border-border bg-muted/30">
        <div className="p-2">
          {isCollapsed ? (
            <div className="space-y-0.5">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center py-1.5">
                      <ThemeToggle />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side={isRtl ? 'left' : 'right'}>
                    <p>{labels.theme}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center py-1.5">
                      <LanguageSwitcher />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side={isRtl ? 'left' : 'right'}>
                    <p>{labels.language}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <ThemeToggle variant="titled" title={labels.theme} />
              <LanguageSwitcher variant="titled" title={labels.language} />
            </div>
          )}
        </div>

        <div className="mx-2 h-px bg-border" />

        <div className="space-y-0.5 p-2">
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-full"
                    onClick={() => {
                      onLogoutRequest();
                      onItemClick?.();
                    }}
                    aria-label={labels.logout}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={isRtl ? 'left' : 'right'}>
                  <p>{labels.logout}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              className="h-8 w-full justify-start gap-2 text-[11px] font-medium"
              onClick={() => {
                onLogoutRequest();
                onItemClick?.();
              }}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{labels.logout}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const COLLAPSED_STORAGE_KEY = 'sidebar-collapsed';
const COLLAPSED_STORAGE_EVENT = 'sidebar-collapsed-change';

function subscribeToCollapsed(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (event: StorageEvent | Event) => {
    if ('key' in event && event.key && event.key !== COLLAPSED_STORAGE_KEY)
      return;
    onStoreChange();
  };
  window.addEventListener('storage', handler);
  window.addEventListener(COLLAPSED_STORAGE_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(COLLAPSED_STORAGE_EVENT, handler);
  };
}

function readCollapsedSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(COLLAPSED_STORAGE_KEY);
}

function parseCollapsed(raw: string | null): boolean {
  if (!raw) return false;
  try {
    return JSON.parse(raw) === true;
  } catch {
    return false;
  }
}

export function Sidebar() {
  const t = useTranslations();
  const { user, signOut } = useAuth();
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'ar';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const collapsedRaw = useSyncExternalStore(
    subscribeToCollapsed,
    readCollapsedSnapshot,
    () => null,
  );
  const collapsed = parseCollapsed(collapsedRaw);
  const setCollapsed = useCallback((value: boolean) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COLLAPSED_STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(new Event(COLLAPSED_STORAGE_EVENT));
  }, []);

  const labels = {
    adminPanel: t('sidebar.adminPanel'),
    userPanel: t('sidebar.userPanel'),
    theme: t('sidebar.theme'),
    language: t('sidebar.language'),
    logout: t('navigation.logout'),
  };

  const menuItems: MenuItem[] = [
    {
      label: t('navigation.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
  ];

  const mobileTitle = pathname.startsWith('/dashboard')
    ? user?.role === 'admin'
      ? labels.adminPanel
      : labels.userPanel
    : t('navigation.dashboard');

  const handleLogoutRequest = () => setLogoutDialogOpen(true);
  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    setMobileOpen(false);
    void signOut();
  };

  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center border-b border-border bg-background px-4 md:hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="flex flex-1 items-center justify-start gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-ml-1 h-8 w-8"
                aria-label={t('sidebar.menu')}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isRtl ? 'right' : 'left'}
              className="w-[240px] p-0"
            >
              <SheetTitle className="sr-only">{t('sidebar.menu')}</SheetTitle>
              <SidebarContent
                user={user}
                pathname={pathname}
                isRtl={isRtl}
                menuItems={menuItems}
                labels={labels}
                onLogoutRequest={handleLogoutRequest}
                onItemClick={() => setMobileOpen(false)}
                isCollapsed={false}
              />
            </SheetContent>
          </Sheet>
          <h1 className="truncate text-lg font-semibold">{mobileTitle}</h1>
        </div>
      </div>

      <aside
        className={cn(
          'relative z-40 hidden h-screen shrink-0 flex-col bg-background transition-all duration-300 ease-in-out md:flex',
          isRtl ? 'border-l border-border' : 'border-r border-border',
          collapsed ? 'w-16' : 'w-56',
        )}
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          isRtl={isRtl}
          menuItems={menuItems}
          labels={labels}
          onLogoutRequest={handleLogoutRequest}
          isCollapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        {collapsed && (
          <div
            className={cn(
              'absolute top-1/2 z-50 -translate-y-1/2',
              isRtl ? '-left-3' : '-right-3',
            )}
          >
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border-2 border-background shadow-md"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
            >
              {isRtl ? (
                <ChevronLeft className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </aside>

      <Dialog.Root open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[70] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg">
            <Dialog.Title className="text-base font-semibold">
              {t('auth.logout.title')}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              {t('auth.logout.confirm')}
            </Dialog.Description>
            <div className="mt-5 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline" size="sm">
                  {t('common.cancel')}
                </Button>
              </Dialog.Close>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleConfirmLogout}
              >
                {t('common.confirm')}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

'use client';

import { AppBrand } from '@/components/shared/app-brand';
import { UserDropdown } from '@/components/shared/user-dropdown';
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
import { useIsRtl } from '@/features/i18n/use-is-rtl';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { cn } from '@/libs/utils';
import * as Dialog from '@radix-ui/react-dialog';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarContentProps {
  pathname: string;
  items: NavItem[];
  logoutLabel?: string;
  onLogoutRequest?: () => void;
  onItemClick?: () => void;
  isCollapsed?: boolean;
  showFooter?: boolean;
}

const SIDEBAR_SURFACE_CLASS =
  'rounded-xl border border-border/40 bg-background/90 dark:border-border/60 dark:bg-background';

const SIDEBAR_PANEL_CLASS = cn(SIDEBAR_SURFACE_CLASS, 'm-2');

const NAV_LINK_CLASS =
  'flex w-full max-w-full items-center gap-2 overflow-hidden rounded-md text-sm font-medium text-sidebar-foreground/50 transition-colors hover:bg-primary/8 hover:text-sidebar-foreground data-[active=true]:bg-primary/8 data-[active=true]:text-primary data-[active=true]:hover:bg-primary/8 data-[active=true]:hover:text-primary';

const NAV_SCROLL_CLASS =
  'min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

const LOGOUT_BUTTON_CLASS =
  'flex w-full items-center gap-2 overflow-hidden rounded-md text-sm font-medium text-destructive/85 transition-colors hover:bg-destructive hover:text-primary-foreground';

const SIDEBAR_BORDER_CLASS = 'border-e border-s-0';

function NavTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const isRtl = useIsRtl();

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={isRtl ? 'left' : 'right'}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkItem({
  item,
  pathname,
  isCollapsed,
  onItemClick,
}: {
  item: NavItem;
  pathname: string;
  isCollapsed: boolean;
  onItemClick?: () => void;
}) {
  const Icon = item.icon;
  const isActive = isNavActive(pathname, item.href);

  const link = (
    <Link
      href={item.href}
      onClick={onItemClick}
      data-active={isActive}
      className={cn(
        NAV_LINK_CLASS,
        isCollapsed
          ? 'mx-auto h-10 w-10 justify-center p-0'
          : 'h-11 px-3 py-2.5',
      )}
    >
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );

  if (!isCollapsed) return link;

  return <NavTooltip label={item.label}>{link}</NavTooltip>;
}

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({
  pathname,
  items,
  logoutLabel,
  onLogoutRequest,
  onItemClick,
  isCollapsed = false,
  showFooter = false,
}: SidebarContentProps) {
  return (
    <div className="flex h-full min-w-0 flex-col bg-transparent text-start">
      <div
        className={cn(
          'flex h-app-header min-h-app-header w-full min-w-0 shrink-0 items-center justify-center overflow-hidden',
          isCollapsed ? 'px-1.5' : 'px-3',
        )}
      >
        <AppBrand
          href="/"
          onClick={onItemClick}
          showName={!isCollapsed}
          size={isCollapsed ? 24 : 26}
          className={cn(
            'max-w-full min-w-0 justify-center',
            isCollapsed ? 'w-auto gap-0' : 'w-full',
          )}
          logoClassName={isCollapsed ? 'h-6 w-6' : 'h-[26px] w-[26px]'}
          nameClassName="text-sidebar-foreground text-sm font-semibold sm:text-base"
        />
      </div>

      <TooltipProvider delayDuration={0}>
        <nav className={NAV_SCROLL_CLASS}>
          <ul className="flex w-full min-w-0 flex-col gap-1.5 pt-1 pb-2">
            {items.map((item) => (
              <li key={item.id}>
                <NavLinkItem
                  item={item}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  onItemClick={onItemClick}
                />
              </li>
            ))}
          </ul>
        </nav>

        {showFooter ? (
          <div className="border-t border-transparent px-2">
            <div className="p-2">
              <button
                type="button"
                className={cn(
                  LOGOUT_BUTTON_CLASS,
                  'cursor-pointer px-4 py-2.5',
                )}
                onClick={() => {
                  onLogoutRequest?.();
                  onItemClick?.();
                }}
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                  <LogOut className="h-[18px] w-[18px]" />
                </span>
                <span>{logoutLabel}</span>
              </button>
            </div>
          </div>
        ) : null}
      </TooltipProvider>
    </div>
  );
}

const COLLAPSED_STORAGE_KEY = 'sidebar-collapsed';
const COLLAPSED_STORAGE_EVENT = 'sidebar-collapsed-change';

function subscribeToCollapsed(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: StorageEvent | Event) => {
    if ('key' in event && event.key && event.key !== COLLAPSED_STORAGE_KEY) {
      return;
    }
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

export function useSidebarCollapsed() {
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

  return [collapsed, setCollapsed] as const;
}

export function Sidebar() {
  const t = useTranslations();
  const { user, signOut } = useAuth();
  const isRtl = useIsRtl();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [collapsed] = useSidebarCollapsed();

  const items = useMemo(
    () => [
      {
        id: 'dashboard',
        label: t('navigation.dashboard'),
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        id: 'profile',
        label: t('navigation.profile'),
        href: '/profile',
        icon: UserCircle,
      },
    ],
    [t],
  );

  const logoutLabel = t('navigation.logout');

  const mobileTitle = useMemo(() => {
    const segment = pathname.split('/').filter(Boolean).at(-1);
    if (!segment) return t('navigation.dashboard');
    if (segment === 'dashboard') return t('navigation.dashboard');
    if (segment === 'profile') return t('navigation.profile');
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [pathname, t]);

  const handleLogoutRequest = () => setLogoutDialogOpen(true);
  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    setMobileOpen(false);
    void signOut();
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-app-header items-center justify-between rounded-none border-0 border-b border-border/40 bg-background px-4 md:hidden dark:border-border/60 dark:bg-card">
        <div className="flex flex-1 items-center justify-start gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-ms-1 h-8 w-8"
                aria-label={t('sidebar.menu')}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isRtl ? 'right' : 'left'}
              showCloseButton={false}
              className={cn(
                SIDEBAR_SURFACE_CLASS,
                SIDEBAR_BORDER_CLASS,
                'h-screen w-[18rem] max-w-[85vw] gap-0 rounded-none bg-background p-0 sm:max-w-[18rem] dark:bg-card',
              )}
            >
              <SheetTitle className="sr-only">{t('sidebar.menu')}</SheetTitle>
              <SidebarContent
                pathname={pathname}
                items={items}
                logoutLabel={logoutLabel}
                onLogoutRequest={handleLogoutRequest}
                onItemClick={() => setMobileOpen(false)}
                showFooter
              />
            </SheetContent>
          </Sheet>
          <h1 className="truncate text-lg font-semibold">{mobileTitle}</h1>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <UserDropdown
              onlyAvatar
              contentClassName="w-56"
              onLogout={() => setMobileOpen(false)}
            />
          ) : null}
        </div>
      </div>

      <aside
        className={cn(
          SIDEBAR_PANEL_CLASS,
          SIDEBAR_BORDER_CLASS,
          'relative z-40 hidden h-[calc(100dvh-1rem)] shrink-0 flex-col overflow-hidden transition-all duration-300 ease-in-out md:flex',
          collapsed ? 'w-16' : 'w-[18.125rem]',
        )}
      >
        <SidebarContent
          pathname={pathname}
          items={items}
          isCollapsed={collapsed}
        />
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

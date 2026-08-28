'use client';

import { AppBrand } from '@/components/layout/app-brand';
import LanguageSwitcher from '@/components/shared/language-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { UserDropdown } from '@/components/shared/user-dropdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import { Icon, type IconName } from '@/components/icons/app-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

export function UserSidebar() {
  const t = useTranslations();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const { toggleSidebar, setOpenMobile } = useSidebar();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const userNavItems: NavItem[] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: t('navigation.dashboard'),
        href: '/dashboard',
        icon: 'dashboard',
      },
      {
        id: 'profile',
        label: t('navigation.profile'),
        href: '/profile',
        icon: 'user',
      },
    ],
    [t],
  );

  const settingsLabel = t.has('navigation.settings')
    ? t('navigation.settings')
    : 'Settings';
  const logoutLabel = t('navigation.logout');

  const mobileTitle = useMemo(() => {
    const segment = pathname.split('/').filter(Boolean).at(-1);
    if (!segment || segment === 'dashboard') return t('navigation.dashboard');
    if (segment === 'profile') return t('navigation.profile');
    if (segment === 'settings') return settingsLabel;
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [pathname, settingsLabel, t]);

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    setOpenMobile(false);
    void signOut();
  };

  const renderContent = (onItemClick?: () => void) => (
    <div className="flex h-full min-w-0 flex-col bg-transparent text-start">
      <SidebarHeader>
        <AppBrand href="/" onClick={onItemClick} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {userNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  onClick={onItemClick}
                >
                  <Link href={item.href}>
                    <Icon
                      name={item.icon}
                      className="size-4.5 shrink-0"
                      weight="fill"
                    />
                    <span className="truncate group-data-[state=collapsed]:hidden">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/settings'}
              tooltip={settingsLabel}
              onClick={onItemClick}
            >
              <Link href="/settings">
                <Icon
                  name="settings"
                  className="size-4.5 shrink-0"
                  weight="fill"
                />
                <span className="truncate group-data-[state=collapsed]:hidden">
                  {settingsLabel}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              variant="destructive"
              tooltip={logoutLabel}
              onClick={() => {
                setLogoutDialogOpen(true);
                onItemClick?.();
              }}
            >
              <Icon name="logout" className="size-4.5 shrink-0" weight="fill" />
              <span className="truncate group-data-[state=collapsed]:hidden">
                {logoutLabel}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-app-header items-center justify-between border-b border-border/40 bg-background/80 px-4 md:hidden dark:border-border/60 dark:bg-card">
        <div className="flex flex-1 items-center justify-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="-ms-1 h-8 w-8"
            onClick={toggleSidebar}
            aria-label={t('sidebar.menu')}
          >
            <Icon name="menu" className="h-5 w-5" />
          </Button>
          <h1 className="truncate text-lg font-semibold">{mobileTitle}</h1>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <UserDropdown
              onlyAvatar
              contentClassName="w-56"
              onLogout={() => setOpenMobile(false)}
            />
          ) : null}
        </div>
      </div>

      <Sidebar>{renderContent(() => setOpenMobile(false))}</Sidebar>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('auth.logout.title')}</DialogTitle>
            <DialogDescription>{t('auth.logout.confirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex-row justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                {t('common.cancel')}
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmLogout}
            >
              {t('common.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

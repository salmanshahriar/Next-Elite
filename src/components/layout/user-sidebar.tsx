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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import { Icon, type IconName } from '@/components/icons/app-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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
  const { open, setOpen, toggleSidebar, setOpenMobile } = useSidebar();

  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

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

  const dashboardItem = userNavItems.find((i) => i.id === 'dashboard');
  const profileItem = userNavItems.find((i) => i.id === 'profile');

  const workspaceLabel = t.has('navigation.workspace')
    ? t('navigation.workspace')
    : 'Workspace';
  const settingsLabel = t.has('navigation.settings')
    ? t('navigation.settings')
    : 'Settings';
  const logoutLabel = t('navigation.logout');

  const mobileTitle = useMemo(() => {
    const segment = pathname.split('/').filter(Boolean).at(-1);
    if (!segment || segment === 'dashboard') return t('navigation.dashboard');
    if (segment === 'profile') return t('navigation.profile');
    if (segment === 'settings') return settingsLabel;
    if (segment === 'analytics') return 'Analytics';
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
        <AppBrand href="/" onClick={onItemClick} className="w-full" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {dashboardItem ? (
            <SidebarMenuItem key={dashboardItem.id}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === dashboardItem.href ||
                  pathname.startsWith(`${dashboardItem.href}/`)
                }
                tooltip={dashboardItem.label}
                onClick={onItemClick}
              >
                <Link href={dashboardItem.href}>
                  <Icon
                    name={dashboardItem.icon}
                    className="size-4.5 shrink-0"
                    weight="fill"
                  />
                  <span className="truncate whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
                    {dashboardItem.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}

          <Collapsible
            open={workspaceOpen}
            onOpenChange={setWorkspaceOpen}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={workspaceLabel}
                  onClick={(e) => {
                    if (!open) {
                      e.preventDefault();
                      setOpen(true);
                      setWorkspaceOpen(true);
                    }
                  }}
                >
                  <Icon
                    name="folder"
                    className="size-4.5 shrink-0"
                    weight="fill"
                  />
                  <span className="truncate whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
                    {workspaceLabel}
                  </span>
                  <Icon
                    name="down"
                    className="ms-auto size-3.5 shrink-0 transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0 group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="group-data-[state=collapsed]:hidden">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={
                        pathname === '/analytics' ||
                        pathname.startsWith('/analytics/')
                      }
                    >
                      <Link href="/analytics" onClick={onItemClick}>
                        <Icon
                          name="chart"
                          className="size-4 shrink-0"
                          weight="fill"
                        />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {profileItem ? (
            <SidebarMenuItem key={profileItem.id}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === profileItem.href ||
                  pathname.startsWith(`${profileItem.href}/`)
                }
                tooltip={profileItem.label}
                onClick={onItemClick}
              >
                <Link href={profileItem.href}>
                  <Icon
                    name={profileItem.icon}
                    className="size-4.5 shrink-0"
                    weight="fill"
                  />
                  <span className="truncate whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
                    {profileItem.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
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
                <span className="truncate whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
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
              <span className="truncate whitespace-nowrap transition-all duration-300 group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
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

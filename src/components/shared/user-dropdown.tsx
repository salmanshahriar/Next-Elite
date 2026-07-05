'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/features/auth/hooks/auth-provider';
import { cn } from '@/libs/utils';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UserDropdownProps {
  hideEmailOnMobile?: boolean;
  onlyAvatar?: boolean;
  align?: 'start' | 'center' | 'end';
  contentClassName?: string;
  onLogout?: () => void;
}

export const UserDropdown = ({
  hideEmailOnMobile = false,
  onlyAvatar = false,
  align = 'end',
  contentClassName,
  onLogout,
}: UserDropdownProps) => {
  const { user, signOut } = useAuth();
  const t = useTranslations('navigation');

  if (!user) return null;

  const initials = user.email?.split('@')[0]?.slice(0, 2).toUpperCase() || 'U';

  const handleSignOut = async () => {
    await signOut();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/40 bg-background/40 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-accent/40 focus:outline-hidden',
            onlyAvatar ? 'h-8 w-8 p-0' : 'gap-2 p-1',
          )}
        >
          <Avatar
            className={cn(
              'shrink-0',
              onlyAvatar ? 'h-7 w-7' : 'size-8 h-8 w-8',
            )}
          >
            <AvatarFallback
              className={cn(
                'font-semibold text-primary',
                onlyAvatar ? 'text-[10px]' : 'text-xs',
              )}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          {!onlyAvatar && (
            <span
              className={cn(
                'max-w-[120px] truncate pe-2 text-xs font-medium text-foreground',
                hideEmailOnMobile ? 'hidden lg:inline-block' : 'inline-block',
              )}
            >
              {user.email}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('w-64', contentClassName)}
        align={align}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2 py-1.5">
            <Avatar className="size-8 h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                'truncate text-sm font-semibold text-foreground',
                hideEmailOnMobile ? 'max-w-[140px]' : 'max-w-[120px]',
              )}
            >
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
          onClick={() => void handleSignOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

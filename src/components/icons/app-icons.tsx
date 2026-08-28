'use client';

import {
  House,
  Gear,
  Bell,
  User,
  SquaresFour,
  SignOut,
  List,
  X,
  CaretLeft,
  CaretRight,
  CaretDown,
  Globe,
  Sun,
  Moon,
  SidebarSimple,
} from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

export const Icons = {
  home: House,
  settings: Gear,
  notifications: Bell,
  user: User,
  dashboard: SquaresFour,
  logout: SignOut,
  menu: List,
  close: X,
  left: CaretLeft,
  right: CaretRight,
  down: CaretDown,
  globe: Globe,
  sun: Sun,
  moon: Moon,
  sidebarSimple: SidebarSimple,
} as const;

export type IconName = keyof typeof Icons;

interface IconProps extends Omit<ComponentProps<typeof House>, 'name'> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = Icons[name];
  return <Cmp {...props} />;
}

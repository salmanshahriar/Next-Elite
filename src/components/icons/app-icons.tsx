'use client';

import {
  HouseIcon,
  GearIcon,
  BellIcon,
  UserIcon,
  SquaresFourIcon,
  SignOutIcon,
  ListIcon,
  XIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretDownIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  SidebarSimpleIcon,
  FolderSimpleIcon,
  ChartBarIcon,
  KanbanIcon,
  FileTextIcon,
} from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

export const Icons = {
  home: HouseIcon,
  settings: GearIcon,
  notifications: BellIcon,
  user: UserIcon,
  dashboard: SquaresFourIcon,
  logout: SignOutIcon,
  menu: ListIcon,
  close: XIcon,
  left: CaretLeftIcon,
  right: CaretRightIcon,
  down: CaretDownIcon,
  globe: GlobeIcon,
  sun: SunIcon,
  moon: MoonIcon,
  sidebarSimple: SidebarSimpleIcon,
  folder: FolderSimpleIcon,
  chart: ChartBarIcon,
  kanban: KanbanIcon,
  fileText: FileTextIcon,
} as const;

export type IconName = keyof typeof Icons;

interface IconProps extends Omit<ComponentProps<typeof HouseIcon>, 'name'> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = Icons[name];
  return <Cmp {...props} />;
}

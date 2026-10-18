import type { Icon } from '@phosphor-icons/react';

interface IconProps {
  iconNode?: Icon | null;
  className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}

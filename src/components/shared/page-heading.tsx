'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  variant?: 'default' | 'admin';
  backButton?: boolean;
  actionButton?: ReactNode;
}

const PageHeading = ({
  title,
  description,
  variant = 'admin',
  backButton = false,
  actionButton,
}: PageHeadingProps) => {
  if (variant === 'admin') {
    return (
      <div className="mb-4 ml-2 flex items-center justify-between gap-2">
        <div className="flex items-center">
          {backButton && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => history.back()}
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <div className="px-4 py-2">
            <h3 className="mb-1 text-2xl font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {actionButton}
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-center justify-between px-4 py-2">
      <div>
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actionButton}
    </div>
  );
};

export default PageHeading;

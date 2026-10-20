'use client';

import { fontSans } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { useEffect } from 'react';
import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    void import('@sentry/nextjs').then((Sentry) =>
      Sentry.captureException(error),
    );
  }, [error]);

  return (
    <html lang="en">
      <body className={cn(fontSans.className, 'antialiased')}>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md space-y-6 text-center">
            <h1 className="text-2xl font-semibold">
              Something went wrong. Please try again.
            </h1>
            <div className="flex items-center justify-center gap-3">
              <Button type="button" onClick={() => reset()}>
                Try again
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.assign('/')}
              >
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;

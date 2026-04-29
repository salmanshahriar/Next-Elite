'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred. You can try again or go back to the
              home page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded-md border px-4 py-2 text-sm font-medium text-foreground"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;

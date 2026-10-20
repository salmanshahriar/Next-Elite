'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const t = useTranslations('errors');

  useEffect(() => {
    void import('@sentry/nextjs').then((Sentry) =>
      Sentry.captureException(error),
    );
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-semibold">{t('generic')}</h1>
        <div className="flex items-center justify-center gap-3">
          <Button type="button" onClick={() => reset()}>
            {t('tryAgain')}
          </Button>
          <Button asChild variant="outline">
            <Link href="/">{t('backToHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const UnauthorizedPage = async () => {
  const t = await getTranslations('errors');

  return (
    <PageLayout centered>
      <PageHeader title={t('403')} subtitle={t('unauthorizedDescription')} />
      <Button asChild className="w-full max-w-sm">
        <Link href="/dashboard">{t('goToDashboard')}</Link>
      </Button>
    </PageLayout>
  );
};

export default UnauthorizedPage;

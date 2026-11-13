'use client';

import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { useTranslations } from 'next-intl';

const AdminDashboardPage = () => {
  const t = useTranslations('dashboard.admin');

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default AdminDashboardPage;

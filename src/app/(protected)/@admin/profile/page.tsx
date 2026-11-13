'use client';

import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { useTranslations } from 'next-intl';

const AdminProfilePage = () => {
  const t = useTranslations('profile');

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default AdminProfilePage;

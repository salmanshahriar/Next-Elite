'use client';

import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { useTranslations } from 'next-intl';

const UserSettingsPage = () => {
  const t = useTranslations('settings');

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default UserSettingsPage;

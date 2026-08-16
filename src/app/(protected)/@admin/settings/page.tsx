import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const AdminSettingsPage = async () => {
  const [, t] = await Promise.all([
    requirePermission('dashboard.view:admin'),
    getTranslations('settings'),
  ]);

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default AdminSettingsPage;

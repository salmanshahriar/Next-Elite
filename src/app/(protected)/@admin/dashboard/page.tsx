import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const AdminDashboardPage = async () => {
  const [, t] = await Promise.all([
    requirePermission('dashboard.view:admin'),
    getTranslations('dashboard.admin'),
  ]);

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default AdminDashboardPage;

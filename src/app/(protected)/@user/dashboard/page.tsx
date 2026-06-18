import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const UserDashboardPage = async () => {
  await requirePermission('dashboard.view:user');
  const t = await getTranslations('dashboard.user');

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default UserDashboardPage;

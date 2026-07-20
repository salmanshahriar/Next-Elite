import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const AdminProfilePage = async () => {
  const [, t] = await Promise.all([
    requirePermission('dashboard.view:admin'),
    getTranslations('profile'),
  ]);

  return (
    <PageLayout>
      <PageHeader title={t('title')} subtitle={t('description')} />
    </PageLayout>
  );
};

export default AdminProfilePage;

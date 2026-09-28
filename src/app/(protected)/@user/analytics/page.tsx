import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';

const UserAnalyticsPage = async () => {
  await requirePermission('dashboard.view:user');

  return (
    <PageLayout>
      <PageHeader
        title="Analytics"
        subtitle="View your usage insights, activity trends, and statistics."
      />
    </PageLayout>
  );
};

export default UserAnalyticsPage;

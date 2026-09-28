import { PageHeader, PageLayout } from '@/components/shared/page-header';
import { requirePermission } from '@/features/auth/rbac/require';

const AdminAnalyticsPage = async () => {
  await requirePermission('dashboard.view:admin');

  return (
    <PageLayout>
      <PageHeader
        title="Analytics"
        subtitle="Track system metrics, user growth, and performance trends."
      />
    </PageLayout>
  );
};

export default AdminAnalyticsPage;

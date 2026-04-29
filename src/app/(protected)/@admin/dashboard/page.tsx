import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const AdminDashboardPage = async () => {
  const user = await requirePermission('dashboard.view:admin');
  const t = await getTranslations('dashboard.admin');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 pt-20 md:pt-12">
      <h1 className="mb-8 text-3xl font-bold">{t('title')}</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('totalUsers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('activeSessions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('adminUsers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('adminInfo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            {t('loggedInAs')}: {user.email}
          </p>
          <p className="text-sm text-muted-foreground">{t('adminOnly')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;

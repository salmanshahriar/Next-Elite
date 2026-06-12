import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requirePermission } from '@/features/auth/rbac/require';
import { getTranslations } from 'next-intl/server';

const UserDashboardPage = async () => {
  const user = await requirePermission('dashboard.view:user');
  const t = await getTranslations('dashboard.user');

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{t('title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('profile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-medium text-muted-foreground">
                {t('email')}
              </p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="block text-sm font-medium text-muted-foreground">
                {t('role')}
              </p>
              <p className="text-lg font-semibold capitalize">{user.role}</p>
            </div>
            <div>
              <p className="block text-sm font-medium text-muted-foreground">
                {t('userId')}
              </p>
              <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardPage;

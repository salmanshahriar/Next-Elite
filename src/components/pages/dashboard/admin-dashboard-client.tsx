'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/hooks/auth-context';
import type { Messages } from '@/features/i18n/config/get-translations';
import { t } from '@/features/i18n/config/get-translations';

export default function AdminDashboardClient({
  messages,
}: {
  messages: Messages;
}) {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 pt-20 md:pt-12">
      <h1 className="mb-8 text-3xl font-bold">
        {t(messages, 'dashboard.admin.title')}
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t(messages, 'dashboard.admin.totalUsers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t(messages, 'dashboard.admin.activeSessions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t(messages, 'dashboard.admin.adminUsers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t(messages, 'dashboard.admin.adminInfo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            {t(messages, 'dashboard.admin.loggedInAs')}: {user?.email}
          </p>
          <p className="text-sm text-muted-foreground">
            {t(messages, 'dashboard.admin.adminOnly')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

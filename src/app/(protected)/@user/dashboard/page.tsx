import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthUser } from '@/features/auth/server/get-auth-user';
import { getTranslations, t } from '@/features/i18n/config/get-translations';
import { getRequestLocale } from '@/features/i18n/server/get-request-locale';

const Page = async () => {
  const user = await getAuthUser();
  const locale = await getRequestLocale();
  const messages = getTranslations(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 pt-20 md:pt-12">
      <h1 className="mb-8 text-3xl font-bold">
        {t(messages, 'dashboard.user.title')}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>{t(messages, 'dashboard.user.profile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                {t(messages, 'dashboard.user.email')}
              </label>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                {t(messages, 'dashboard.user.role')}
              </label>
              <p className="text-lg font-semibold capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                {t(messages, 'dashboard.user.userId')}
              </label>
              <p className="text-sm text-muted-foreground">{user?.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

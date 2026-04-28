import AdminDashboardClient from '@/components/pages/dashboard/admin-dashboard-client';
import { getTranslations } from '@/features/i18n/config/get-translations';
import { getRequestLocale } from '@/features/i18n/server/get-request-locale';

const Page = async () => {
  const locale = await getRequestLocale();
  const messages = getTranslations(locale);

  return <AdminDashboardClient messages={messages} />;
};

export default Page;

import LoginFormClient from '@/features/auth/components/login-form-client';
import { getTranslations } from '@/features/i18n/config/get-translations';
import { getRequestLocale } from '@/features/i18n/server/get-request-locale';

const Page = async () => {
  const locale = await getRequestLocale();
  const messages = getTranslations(locale);
  return <LoginFormClient messages={messages} />;
};

export default Page;

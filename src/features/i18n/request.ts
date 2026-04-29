import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { LOCALE_COOKIE_NAME, resolveLocale } from './routing';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});

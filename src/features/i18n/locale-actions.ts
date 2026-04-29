'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { LOCALE_COOKIE_NAME, isValidLocale } from './routing';

export async function setLocaleAction(locale: string) {
  if (!isValidLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}

import { supportedLocales } from '@/features/site/config';
import { describe, expect, it } from 'vitest';
import en from '../../../../messages/en.json';

type Messages = Record<string, unknown>;

const flattenKeys = (value: Messages, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null
      ? flattenKeys(child as Messages, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

const loadMessages = async (locale: string): Promise<Messages> =>
  (await import(`../../../../messages/${locale}.json`)).default;

describe('translation messages', () => {
  it.each(supportedLocales)('%s has the same keys as en', async (locale) => {
    const messages = await loadMessages(locale);
    expect(flattenKeys(messages).sort()).toEqual(flattenKeys(en).sort());
  });
});

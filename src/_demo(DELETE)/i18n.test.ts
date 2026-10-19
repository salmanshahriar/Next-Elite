import { supportedLocales } from '@/features/site/config';
import { describe, expect, it } from 'vitest';
import coreEn from '../../messages/en.json';
import demoEn from './messages/en.json';

type Messages = Record<string, unknown>;

const flattenKeys = (value: Messages, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null
      ? flattenKeys(child as Messages, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

const loadDemoMessages = async (locale: string): Promise<Messages> =>
  (await import(`./messages/${locale}.json`)).default;

describe('demo translation messages', () => {
  it.each(supportedLocales)('%s has the same keys as en', async (locale) => {
    const messages = await loadDemoMessages(locale);
    expect(flattenKeys(messages).sort()).toEqual(flattenKeys(demoEn).sort());
  });

  it('does not override any core message key', () => {
    const coreKeys = new Set(flattenKeys(coreEn));
    expect(flattenKeys(demoEn).filter((key) => coreKeys.has(key))).toEqual([]);
  });
});

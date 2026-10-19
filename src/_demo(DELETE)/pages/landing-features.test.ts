import { supportedLocales } from '@/features/site/config';
import { describe, expect, it } from 'vitest';
import { HOME_FEATURES } from './landing-features';

type Messages = Record<string, unknown>;

const getPath = (value: Messages, path: string): unknown =>
  path
    .split('.')
    .reduce<unknown>(
      (node, segment) => (node as Messages | undefined)?.[segment],
      value,
    );

const loadMessages = async (locale: string): Promise<Messages> =>
  (await import(`../messages/${locale}.json`)).default;

describe('landing feature translations', () => {
  it.each(supportedLocales)(
    '%s keeps every landing feature highlight verbatim',
    async (locale) => {
      const messages = await loadMessages(locale);
      for (const feature of HOME_FEATURES) {
        for (const detail of feature.details) {
          const text = getPath(messages, `home.features.${detail.key}`);
          expect(typeof text).toBe('string');
          for (const term of detail.highlights) {
            expect(text, `${locale} home.features.${detail.key}`).toContain(
              term,
            );
          }
        }
      }
    },
  );
});

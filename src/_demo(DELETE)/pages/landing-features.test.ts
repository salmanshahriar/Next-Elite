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
    '%s has a title and description for every feature card',
    async (locale) => {
      const messages = await loadMessages(locale);
      for (const { id } of HOME_FEATURES) {
        for (const field of ['title', 'description']) {
          const text = getPath(messages, `home.features.${id}.${field}`);
          expect(typeof text, `${locale} ${id}.${field}`).toBe('string');
          expect((text as string).length).toBeGreaterThan(0);
        }
      }
    },
  );
});

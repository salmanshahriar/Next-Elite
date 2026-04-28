import { defaultLocale } from '@/lib/config/site';
import { resolveLocale } from '@/lib/validation/i18n';
import { describe, expect, it } from 'vitest';

describe('i18n validation', () => {
  it('returns supported locale values', () => {
    expect(resolveLocale('en')).toBe('en');
  });

  it('falls back to default locale for invalid values', () => {
    expect(resolveLocale('invalid-locale')).toBe(defaultLocale);
  });
});

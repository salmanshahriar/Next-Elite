import { isValidLocale, resolveLocale } from '@/features/i18n/routing';
import { defaultLocale } from '@/features/site/config';
import { describe, expect, it } from 'vitest';

describe('i18n routing', () => {
  it('returns supported locale values', () => {
    expect(resolveLocale('en')).toBe('en');
  });

  it('falls back to the default locale for invalid values', () => {
    expect(resolveLocale('invalid-locale')).toBe(defaultLocale);
  });

  it('returns null/undefined as default', () => {
    expect(resolveLocale(null)).toBe(defaultLocale);
    expect(resolveLocale(undefined)).toBe(defaultLocale);
  });

  it('isValidLocale narrows correctly', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('xx')).toBe(false);
    expect(isValidLocale(123)).toBe(false);
  });
});

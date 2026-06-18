import { describe, expect, it } from 'vitest';
import { z } from 'zod';

/**
 * Replicate the transform schemas from env.ts to test their logic.
 * The createEnv() from @t3-oss/env-nextjs runs once at module load and
 * caches internally, making it unreliable to test with process.env changes.
 * Instead we test the transform logic directly.
 */
const csvEmails = z
  .string()
  .optional()
  .transform((value) =>
    (value ?? '')
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );

const booleanFromString = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

describe('env transform: csvEmails', () => {
  it('parses single email', () => {
    expect(csvEmails.parse('admin@test.com')).toEqual(['admin@test.com']);
  });

  it('parses multiple comma-separated emails', () => {
    expect(csvEmails.parse('admin@test.com,user@test.com')).toEqual([
      'admin@test.com',
      'user@test.com',
    ]);
  });

  it('trims whitespace around emails', () => {
    expect(csvEmails.parse('  admin@test.com  ,  user@test.com  ')).toEqual([
      'admin@test.com',
      'user@test.com',
    ]);
  });

  it('lowercases emails', () => {
    expect(csvEmails.parse('ADMIN@Test.COM')).toEqual(['admin@test.com']);
  });

  it('returns empty array for undefined', () => {
    expect(csvEmails.parse(undefined)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(csvEmails.parse('')).toEqual([]);
  });

  it('filters empty entries from trailing/double commas', () => {
    expect(csvEmails.parse('admin@test.com,,')).toEqual(['admin@test.com']);
    expect(csvEmails.parse(',')).toEqual([]);
  });
});

describe('env transform: booleanFromString', () => {
  it('returns true for "true"', () => {
    expect(booleanFromString.parse('true')).toBe(true);
  });

  it('returns false for "false"', () => {
    expect(booleanFromString.parse('false')).toBe(false);
  });

  it('defaults to "false" when undefined', () => {
    expect(booleanFromString.parse(undefined)).toBe(false);
  });

  it('rejects non-boolean strings', () => {
    expect(() => booleanFromString.parse('yes')).toThrow();
    expect(() => booleanFromString.parse('1')).toThrow();
  });
});

describe('defaultAuthUrl logic', () => {
  // Test the fallback logic in isolation
  function resolveAuthUrl(betterAuthUrl?: string, vercelUrl?: string): string {
    if (betterAuthUrl) return betterAuthUrl;
    if (vercelUrl) return `https://${vercelUrl}`;
    return 'http://localhost:3000';
  }

  it('prioritizes BETTER_AUTH_URL', () => {
    expect(resolveAuthUrl('https://auth.example.com', 'foo.vercel.app')).toBe(
      'https://auth.example.com',
    );
  });

  it('uses https + VERCEL_URL when BETTER_AUTH_URL is empty', () => {
    expect(resolveAuthUrl('', 'myapp.vercel.app')).toBe(
      'https://myapp.vercel.app',
    );
  });

  it('falls back to localhost:3000 when neither is set', () => {
    expect(resolveAuthUrl('', '')).toBe('http://localhost:3000');
    expect(resolveAuthUrl(undefined, undefined)).toBe('http://localhost:3000');
  });
});

describe('BETTER_AUTH_SECRET default', () => {
  const PLACEHOLDER = 'PLEASE_SET_BETTER_AUTH_SECRET_32_CHARS_MIN';

  it('placeholder is at least 32 characters', () => {
    expect(PLACEHOLDER.length).toBeGreaterThanOrEqual(32);
  });

  it('placeholder used when secret not set', () => {
    const provided = undefined;
    expect(provided ?? PLACEHOLDER).toBe(PLACEHOLDER);
  });

  it('provided secret used when set', () => {
    const provided = 'a-very-long-secret-that-is-at-least-32-chars!!';
    expect(provided ?? PLACEHOLDER).toBe(
      'a-very-long-secret-that-is-at-least-32-chars!!',
    );
  });
});

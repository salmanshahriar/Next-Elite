import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('deduplicates tailwind classes with twMerge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles falsy values', () => {
    expect(cn('a', false, null, 'b')).toBe('a b');
  });
});

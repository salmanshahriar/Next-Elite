import { describe, expect, it } from 'vitest';

import { userListSchema, userSchema } from './user';

describe('userSchema', () => {
  const validUser = {
    id: '1',
    email: 'user@example.com',
  };

  it('accepts a valid user with id and email', () => {
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('accepts optional name', () => {
    const result = userSchema.safeParse({
      ...validUser,
      name: 'John Doe',
    });
    expect(result.success).toBe(true);
  });

  it('accepts null name', () => {
    const result = userSchema.safeParse({
      ...validUser,
      name: null,
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional avatarUrl', () => {
    const result = userSchema.safeParse({
      ...validUser,
      avatarUrl: 'https://example.com/avatar.png',
    });
    expect(result.success).toBe(true);
  });

  it('accepts null avatarUrl', () => {
    const result = userSchema.safeParse({
      ...validUser,
      avatarUrl: null,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing id', () => {
    const result = userSchema.safeParse({ email: 'user@example.com' });
    expect(result.success).toBe(false);
  });

  it('rejects missing email', () => {
    const result = userSchema.safeParse({ id: '1' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = userSchema.safeParse({
      id: '1',
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid avatarUrl', () => {
    const result = userSchema.safeParse({
      ...validUser,
      avatarUrl: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});

describe('userListSchema', () => {
  it('accepts an array of valid users', () => {
    const result = userListSchema.safeParse([
      { id: '1', email: 'a@example.com' },
      { id: '2', email: 'b@example.com' },
    ]);
    expect(result.success).toBe(true);
  });

  it('accepts an empty array', () => {
    const result = userListSchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  it('rejects an array with an invalid user', () => {
    const result = userListSchema.safeParse([
      { id: '1', email: 'a@example.com' },
      { id: '2' },
    ]);
    expect(result.success).toBe(false);
  });

  it('rejects a non-array value', () => {
    const result = userListSchema.safeParse({ id: '1' });
    expect(result.success).toBe(false);
  });
});

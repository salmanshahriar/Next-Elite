import { describe, expect, it } from 'vitest';

import { registerSchema } from './register';

describe('registerSchema', () => {
  const validInput = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  };

  it('accepts valid input with matching passwords', () => {
    const result = registerSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('trims whitespace from name', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      name: '  John Doe  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
    }
  });

  it('rejects a name shorter than 2 characters', () => {
    const result = registerSchema.safeParse({ ...validInput, name: 'J' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Name must be at least 2 characters',
      );
    }
  });

  it('rejects an invalid email', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      password: 'short',
      confirmPassword: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects when passwords do not match', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      confirmPassword: 'different123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmPasswordIssue = result.error.issues.find(
        (issue) => issue.path[0] === 'confirmPassword',
      );
      expect(confirmPasswordIssue?.message).toBe('Passwords do not match');
    }
  });

  it('rejects an empty confirmPassword', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      confirmPassword: '',
    });
    expect(result.success).toBe(false);
  });
});

import * as z from 'zod/mini';

export const registerSchema = z
  .object({
    name: z
      .string()
      .check(z.trim(), z.minLength(2, 'Name must be at least 2 characters')),
    email: z.email('Enter a valid email').check(z.trim()),
    password: z
      .string()
      .check(z.minLength(8, 'Password must be at least 8 characters')),
    confirmPassword: z
      .string()
      .check(z.minLength(1, 'Please confirm your password')),
  })
  .check(
    z.refine((data) => data.password === data.confirmPassword, {
      error: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  );

export type RegisterInput = z.infer<typeof registerSchema>;

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email').trim(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

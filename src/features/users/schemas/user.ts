import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

import { z } from 'zod';

export const userRoleSchema = z.enum(['admin', 'user']);

export const authPermissionSchema = z.enum([
  'dashboard.view:user',
  'dashboard.view:admin',
  'article.read:any',
  'article.create:any',
  'article.update:own',
  'article.publish:own',
  'article.publish:any',
]);

export const authUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  role: userRoleSchema,
  permissions: z.array(authPermissionSchema),
});

export const loginInputSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(1),
});

import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type Pagination = z.infer<typeof paginationSchema>;

export const apiErrorSchema = z.object({
  error: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export function paginatedResponseSchema<T extends z.ZodTypeAny>(item: T) {
  return z.object({
    data: z.array(item),
    page: z.number().int().nonnegative(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  });
}

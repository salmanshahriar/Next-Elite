import { env } from '@/libs/env';
import { ofetch, type FetchOptions } from 'ofetch';
import type { z } from 'zod';

const baseURL = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const apiClient = ofetch.create({
  baseURL: `${baseURL}/api`,
  retry: 1,
  retryDelay: 250,
  credentials: 'include',
  onRequestError({ error }) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[apiClient] request error:', error.message);
    }
  },
});

export type ApiOptions<T> = FetchOptions<'json'> & {
  schema?: z.ZodType<T>;
};

export async function apiFetch<T>(
  url: string,
  options: ApiOptions<T> = {},
): Promise<T> {
  const { schema, ...rest } = options;
  const data = await apiClient<unknown>(url, rest);
  return schema ? schema.parse(data) : (data as T);
}

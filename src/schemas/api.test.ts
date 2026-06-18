import { describe, expect, it } from 'vitest';

import { z } from 'zod';

import {
  apiErrorSchema,
  paginatedResponseSchema,
  paginationSchema,
} from './api';

describe('api schemas', () => {
  describe('paginationSchema', () => {
    it('uses defaults when no values provided', () => {
      const result = paginationSchema.parse({});
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(20);
    });

    it('coerces string values to numbers', () => {
      const result = paginationSchema.parse({
        page: '3',
        pageSize: '50',
      });
      expect(result.page).toBe(3);
      expect(result.pageSize).toBe(50);
    });

    it('rejects non-positive page', () => {
      expect(() => paginationSchema.parse({ page: 0 })).toThrow();
      expect(() => paginationSchema.parse({ page: -1 })).toThrow();
    });

    it('rejects pageSize exceeding max of 100', () => {
      expect(() => paginationSchema.parse({ pageSize: 101 })).toThrow();
    });

    it('rejects non-integer page', () => {
      expect(() => paginationSchema.parse({ page: 1.5 })).toThrow();
    });

    it('accepts partial input with defaults', () => {
      const result = paginationSchema.parse({ page: 5 });
      expect(result.page).toBe(5);
      expect(result.pageSize).toBe(20);
    });
  });

  describe('apiErrorSchema', () => {
    it('accepts a valid error object', () => {
      const result = apiErrorSchema.safeParse({
        error: 'Something went wrong',
      });
      expect(result.success).toBe(true);
    });

    it('accepts error with optional details', () => {
      const result = apiErrorSchema.safeParse({
        error: 'Validation failed',
        details: { field: 'email' },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing error field', () => {
      const result = apiErrorSchema.safeParse({ details: 'test' });
      expect(result.success).toBe(false);
    });

    it('rejects non-string error', () => {
      const result = apiErrorSchema.safeParse({ error: 500 });
      expect(result.success).toBe(false);
    });
  });

  describe('paginatedResponseSchema', () => {
    const itemSchema = z.object({ id: z.string() });

    it('accepts a valid paginated response', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [{ id: '1' }, { id: '2' }],
        page: 1,
        pageSize: 20,
        total: 2,
      });
      expect(result.success).toBe(true);
    });

    it('accepts an empty data array', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [],
        page: 1,
        pageSize: 20,
        total: 0,
      });
      expect(result.success).toBe(true);
    });

    it('rejects negative page', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [],
        page: -1,
        pageSize: 20,
        total: 0,
      });
      expect(result.success).toBe(false);
    });

    it('rejects non-positive pageSize', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [],
        page: 1,
        pageSize: 0,
        total: 0,
      });
      expect(result.success).toBe(false);
    });

    it('rejects negative total', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [],
        page: 1,
        pageSize: 20,
        total: -1,
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid item in data array', () => {
      const schema = paginatedResponseSchema(itemSchema);
      const result = schema.safeParse({
        data: [{ id: 123 }],
        page: 1,
        pageSize: 20,
        total: 1,
      });
      expect(result.success).toBe(false);
    });
  });
});

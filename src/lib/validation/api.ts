import { NextResponse } from 'next/server';
import type { z } from 'zod';

export async function validateJsonBody<TSchema extends z.ZodTypeAny>(
  request: Request,
  schema: TSchema,
) {
  const payload = await request.json();
  return schema.safeParse(payload);
}

export function createValidationErrorResponse(
  issues: z.ZodIssue[],
  status = 400,
) {
  return NextResponse.json(
    {
      error: 'Validation failed',
      issues: issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    },
    { status },
  );
}

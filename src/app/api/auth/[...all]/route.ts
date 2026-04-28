import { createAuth } from '@/features/auth/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

const auth = createAuth();

const unavailable = async () =>
  Response.json(
    {
      error:
        'Auth is not configured. Set BETTER_AUTH_SECRET and BETTER_AUTH_URL.',
    },
    { status: 503 },
  );

const handlers = auth ? toNextJsHandler(auth) : null;

export const GET = handlers?.GET ?? unavailable;
export const POST = handlers?.POST ?? unavailable;

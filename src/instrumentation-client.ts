import type { captureRouterTransitionStart } from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

let captureTransition: typeof captureRouterTransitionStart | undefined;

if (dsn && process.env.NODE_ENV === 'production') {
  void import('@sentry/nextjs').then((Sentry) => {
    Sentry.init({ dsn, tracesSampleRate: 0.1 });
    captureTransition = Sentry.captureRouterTransitionStart;
  });
}

export const onRouterTransitionStart: typeof captureRouterTransitionStart = (
  ...args
) => captureTransition?.(...args);
